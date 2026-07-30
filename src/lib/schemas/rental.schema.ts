import { z } from "zod";

export const rentalDateSchema = z
  .object({
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  })
  .refine((data) => new Date(data.startDate) >= new Date(new Date().toDateString()), {
    message: "Start date cannot be in the past",
    path: ["startDate"],
  });

export type RentalDateFormValues = z.infer<typeof rentalDateSchema>;
