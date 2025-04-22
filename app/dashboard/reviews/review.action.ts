"use server";

import { LIMITATIONS } from "@/lib/auth-plan";
import { getUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { actionClient, actionUser, SafeError } from "@/lib/safe-action-client";
import { UserPlan } from "@prisma/client";
import { z } from "zod";
import { ReviewFormSchema } from "./review.schema";

export const addReviewSafeAction = actionClient
  .schema(ReviewFormSchema.extend({ userId: z.string() }))
  .action(async ({ parsedInput: input }) => {
    if (input.name === "méchant") {
      throw new SafeError("Invalid name");
    }

    const userPlan = await prisma.user.findUnique({
      where: { id: input.userId },
      select: { plan: true },
    });

    if (!userPlan) {
      throw new SafeError("No user find");
    }

    const limit = LIMITATIONS[userPlan.plan as UserPlan];

    const currentReviewCount = await prisma.review.count({
      where: { userId: input.userId },
    });

    if (currentReviewCount >= limit.reviewLimit) {
      throw new SafeError(
        "Impossible to add more review. Ask owner to increase limitation"
      );
    }

    const newReview = await prisma.review.create({
      data: {
        review: input.review,
        name: input.name,
        star: 5,
        userId: input.userId,
      },
    });

    return newReview;
  });

export const updateReviewAction = actionClient
  .schema(
    z.object({
      star: z.number().optional(),
      name: z.string().optional(),
      reviewId: z.string(),
      // ⚠️ Ne jamais passé le userId en paramètre
      // → Toujours vérifier avec les cookies !
    })
  )
  .action(async ({ parsedInput: input }) => {
    // 1. Toujours récupérer l'utilisateur
    const user = await getUser();

    // 2. Toujours vérifier que l'utilisateur est valide
    if (!user) {
      throw new SafeError("Invalid user");
    }

    // 3. Toujours filtrer les données en fonction de l'utilisateur
    await prisma.review.update({
      where: {
        id: input.reviewId,
        userId: user.id,
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
