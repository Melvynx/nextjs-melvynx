import { UserPlan } from "@prisma/client";

export const LIMITATIONS: Record<UserPlan, { reviewLimit: number }> = {
  FREE: {
    reviewLimit: 3,
  },
  PRO: {
    reviewLimit: 999,
  },
};
