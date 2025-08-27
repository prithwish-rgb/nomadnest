import { z } from "zod";

export const itinerarySchema = z.object({
  destination: z.string().min(1, "Destination is required").max(100, "Destination too long"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  duration: z.string().min(1, "Duration is required"),
  interests: z.array(z.string()).min(1, "At least one interest is required"),
});

export const validateItineraryInput = (data: unknown) => {
  try {
    return { success: true, data: itinerarySchema.parse(data) };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors };
    }
    return { success: false, errors: [{ message: "Validation failed" }] };
  }
};

export const validateDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // First, ensure chronological order between start and end dates
  if (end < start) {
    return { valid: false, message: "End date cannot be before start date" };
  }

  // Then, validate that the start date is not in the past
  if (start < today) {
    return { valid: false, message: "Start date cannot be in the past" };
  }

  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 30) {
    return { valid: false, message: "Trip duration cannot exceed 30 days" };
  }

  return { valid: true };
};