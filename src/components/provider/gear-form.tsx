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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(gearFormSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
      brand: defaultValues?.brand ?? "",
      pricePerDay: defaultValues?.pricePerDay ? Number(defaultValues.pricePerDay) : undefined,
      categoryId: defaultValues?.categoryId ?? "",
      stock: defaultValues?.stock ?? 1,
      imagesText: defaultValues?.images?.join("\n") ?? "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl space-y-4 rounded-xl border border-slate-200 bg-white p-6"
    >
      <Input label="Gear name" placeholder="Trek Mountain Bike" error={errors.name?.message} {...register("name")} />

      <Textarea
        label="Description"
        placeholder="Describe the gear's condition, features, and best use case..."
        error={errors.description?.message}
        {...register("description")}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input label="Brand (optional)" placeholder="Trek" error={errors.brand?.message} {...register("brand")} />
        <Select label="Category" error={errors.categoryId?.message} {...register("categoryId")}>
          <option value="">{categoriesLoading ? "Loading..." : "Select category"}</option>
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
        <Input type="number" min={0} label="Stock quantity" error={errors.stock?.message} {...register("stock")} />
      </div>

      <Textarea
        label="Image URLs (one per line)"
        placeholder={"https://example.com/photo1.jpg\nhttps://example.com/photo2.jpg"}
        error={errors.imagesText?.message}
        {...register("imagesText")}
      />
      <p className="-mt-2 text-xs text-slate-400">
        Paste direct links to images. First link becomes the cover photo.
      </p>

      <Button type="submit" isLoading={isSubmitting}>
        {submitLabel}
      </Button>
    </form>
  );
}
