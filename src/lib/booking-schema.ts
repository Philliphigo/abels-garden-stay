import { z } from "zod";

const dateStr = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date");

export const MAX_GUESTS = 12;
export const MAX_ROOMS = 6;

export const bookingSchema = z
  .object({
    fullName: z.string().trim().min(2, "Please enter your name").max(100),
    phone: z
      .string()
      .trim()
      .min(7, "Please enter a valid phone number")
      .max(20, "Please enter a valid phone number")
      .regex(/^[+\d\s()-]+$/, "Please enter a valid phone number"),
    email: z
      .string()
      .trim()
      .max(255)
      .email("Please enter a valid email")
      .optional()
      .or(z.literal("")),
    guests: z.number().int().min(1).max(MAX_GUESTS),
    rooms: z.number().int().min(1).max(MAX_ROOMS),
    checkIn: dateStr,
    checkOut: dateStr,
    message: z.string().trim().max(1000, "Message is too long").optional().or(z.literal("")),
  })
  .refine((d) => d.checkOut > d.checkIn, {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
  });

export type BookingInput = z.infer<typeof bookingSchema>;
