import { UserPlan } from "@prisma/client";
import { headers } from "next/headers";
import { auth } from "./auth"; // path to your Better Auth server instance
import { LIMITATIONS } from "./auth-plan";
import { unauthorized } from "next/navigation";

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  return session;
};

export const getUser = async () => {
  const session = await getSession();

  const user = session?.user;

  if (!user) {
    return undefined;
  }

  const limit = LIMITATIONS[user.plan as UserPlan];
  return { ...user, limit };
};

export const getRequiredUser = async () => {
  const user = await getUser();

  if (!user) {
    unauthorized();
  }

  return user;
};
