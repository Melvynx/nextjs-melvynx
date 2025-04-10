"use server";

import { prisma } from "@/lib/prisma";
import { actionUser, SafeError } from "@/lib/safe-action-client";
import { z } from "zod";
import { ReviewFormSchema } from "./review.schema";

export const addReviewSafeAction = actionUser
  .schema(ReviewFormSchema)
  .action(async ({ parsedInput: input, ctx }) => {
    if (input.name === "méchant") {
      throw new SafeError("Invalid name");
    }

    const newReview = await prisma.review.create({
      data: {
        review: input.review,
        name: input.name,
        star: 5,
        userId: ctx.user.id,
      },
    });

    return newReview;
  });

export const updateReviewAction = actionUser
  .schema(
    z.object({
      star: z.number().optional(),
      name: z.string().optional(),
      reviewId: z.string(),
    })
  )
  .action(async ({ parsedInput: input, ctx }) => {
    console.log({ input, ctx });

    await prisma.review.update({
      where: {
        id: input.reviewId,
        userId: ctx.user.id,
      },
      data: {
        star: input.star,
        name: input.name,
      },
    });
  });

export const deleteReviewAction = actionUser
  .schema(
    z.object({
      reviewId: z.string(),
    })
  )
  .action(async ({ parsedInput: input, ctx }) => {
    await prisma.review.delete({
      where: {
        id: input.reviewId,
        userId: ctx.user.id,
      },
    });
  });
