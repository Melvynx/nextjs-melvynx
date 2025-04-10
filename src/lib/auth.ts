import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { resend } from "./resend";
import { stripe } from "./stripe";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const stripeCustomer = await stripe.customers.create({
            email: user.email,
            name: user.name,
          });

          const stripeCustomerId = stripeCustomer.id;

          if (!stripeCustomerId) {
            return;
          }

          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              stripeCustomerId,
            },
          });
        },
      },
    },
  },
  user: {
    additionalFields: {
      plan: {
        type: "string",
        nullable: true,
      },
      stripeCustomerId: {
        type: "string",
        nullable: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
        from: "noreply@resend.codelynx.dev",
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
        from: "noreply@resend.codelynx.dev",
      });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
