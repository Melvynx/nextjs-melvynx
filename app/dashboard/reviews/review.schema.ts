import { z } from "zod";

export const ReviewFormSchema = z.object({
  name: z.string().min(2).max(50),
  review: z.string().min(10).max(500),
});
