"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { gearFormSchema } from "@/lib/schemas/gear.schema";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/lib/api/gear";
import { GearItem } from "@/types";
import { useState } from "react";

type FormInput = z.input<typeof gearFormSchema>;
type FormOutput = z.output<typeof gearFormSchema>;

export function GearForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = "Save Gear",
}: {
  defaultValues?: Partial<GearItem>;
  onSubmit: (values: FormOutput) => void;
  isSubmitting: boolean;
  submitLabel?: string;
}) {
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(gearFormSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
      brand: defaultValues?.brand ?? "",
      pricePerDay: defaultValues?.pricePerDay
        ? Number(defaultValues.pricePerDay)
        : undefined,
      categoryId: defaultValues?.categoryId ?? "",
      stock: defaultValues?.stock ?? 1,
      imagesText: defaultValues?.images?.join("\n") ?? "",
    },
  });

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET!);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();

    setValue("imagesText", data.secure_url);

    setUploading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
mx-auto
w-full
max-w-3xl
space-y-6
rounded-3xl
border
border-slate-200
bg-white
p-8
shadow-xl
"
    >
      <Input
        label="Gear name"
        placeholder="Trek Mountain Bike"
        error={errors.name?.message}
        {...register("name")}
      />

      <Textarea
        label="Description"
        placeholder="Describe the gear's condition, features, and best use case..."
        error={errors.description?.message}
        {...register("description")}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Brand (optional)"
          placeholder="Trek"
          error={errors.brand?.message}
          {...register("brand")}
        />
        <Select
          label="Category"
          error={errors.categoryId?.message}
          {...register("categoryId")}
        >
          <option value="">
            {categoriesLoading ? "Loading..." : "Select category"}
          </option>
          {categories?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          step="0.01"
          min={0}
          label="Price per day ($)"
          error={errors.pricePerDay?.message}
          {...register("pricePerDay")}
        />
        <Input
          type="number"
          min={0}
          label="Stock quantity"
          error={errors.stock?.message}
          {...register("stock")}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Gear Image</label>

        <Input type="file" accept="image/*" onChange={uploadImage} />

        {uploading && <p className="text-sm text-blue-500">Uploading...</p>}

        <input type="hidden" {...register("imagesText")} />

        {errors.imagesText && (
          <p className="text-sm text-red-500">{errors.imagesText.message}</p>
        )}
      </div>
      <p className="-mt-2 text-xs text-slate-400">
        Paste direct links to images. First link becomes the cover photo.
      </p>

      <Button type="submit" isLoading={isSubmitting}>
        {submitLabel}
      </Button>
    </form>
  );
}
