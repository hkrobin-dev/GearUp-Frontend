"use client";

import { GearForm } from "@/components/provider/gear-form";
import { useAddGear } from "@/lib/api/gear";
import { GearFormSchemaValues } from "@/lib/schemas/gear.schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddGearPage() {
  const router = useRouter();
  const addGear = useAddGear();

  const handleSubmit = async (values: GearFormSchemaValues) => {
    try {
      await addGear.mutateAsync({
        name: values.name,
        description: values.description,
        brand: values.brand,
        pricePerDay: values.pricePerDay,
        categoryId: values.categoryId,
        stock: values.stock,
        images: (values.imagesText ?? "")
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      });

      toast.success("Gear added to your inventory!");
      router.push("/dashboard/provider/gear");
    } catch (err: unknown) {
      const e = err as { message?: string };
      toast.error(e.message || "Failed to add gear");
    }
  };

  return (
    <div className="min-h-screen  py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Add New Gear
          </h1>

          <p className="mt-2 text-slate-500">
            List a new item in your rental inventory.
          </p>
        </div>

        <GearForm
          onSubmit={handleSubmit}
          isSubmitting={addGear.isPending}
          submitLabel="Add Gear"
        />
      </div>
    </div>
  );
}