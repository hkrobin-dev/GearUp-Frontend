import { z } from "zod";

export const gearFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  brand: z.string().optional(),
  pricePerDay: z.coerce.number().positive("Price must be greater than 0"),
  categoryId: z.string().min(1, "Please select a category"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  imagesText: z.string().optional(),
});
export type GearFormSchemaValues = z.infer<typeof gearFormSchema>;
