"use client";

import { GearForm } from "@/components/provider/gear-form";
import { useGearDetail, useUpdateGear } from "@/lib/api/gear";
import { GearFormSchemaValues } from "@/lib/schemas/gear.schema";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditGearPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: gear, isLoading } = useGearDetail(params.id);
  const updateGear = useUpdateGear();

  const handleSubmit = async (values: GearFormSchemaValues) => {
    try {
      await updateGear.mutateAsync({
        id: params.id,
        payload: {
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
        },
      });
      toast.success("Gear updated!");
      router.push("/dashboard/provider/gear");
    } catch (err: unknown) {
      const e = err as { message?: string };
      toast.error(e.message || "Failed to update gear");
    }
  };

  if (isLoading) return <Skeleton className="h-96 max-w-2xl" />;
  if (!gear) return <p className="text-slate-500">Gear not found.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Edit Gear</h1>
      <p className="mt-1 text-slate-500">Update details for {gear.name}.</p>
      <div className="mt-6">
        <GearForm
          defaultValues={gear}
          onSubmit={handleSubmit}
          isSubmitting={updateGear.isPending}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}
