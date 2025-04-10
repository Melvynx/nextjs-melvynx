import { prisma } from "@/lib/prisma";
import { SafeError } from "@/lib/safe-action-client";
import { route } from "@/lib/zod-route-client";
import { z } from "zod";

const Schema = z.object({
  name: z.string(),
  review: z.string(),
});

export const POST = route.body(Schema).handler(async (req, { body: input }) => {
  await new Promise((r) => setTimeout(r, 1000));

  if (input.name === "méchant") {
    throw new SafeError("Invalid name");
  }

  const newReview = await prisma.review.create({
    data: {
      review: input.review,
      name: input.name,
      star: 5,
    },
  });

  return {
    review: newReview,
  };
});
