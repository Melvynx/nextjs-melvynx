"use server";

import { prisma } from "@/lib/prisma";
import { actionClient, SafeError } from "@/lib/safe-action-client";
import { ReviewFormSchema } from "./review.schema";

export const addReviewSafeAction = actionClient
  .schema(ReviewFormSchema)
  .action(async ({ parsedInput: input }) => {
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

    return newReview;
  });
