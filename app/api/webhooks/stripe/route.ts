import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { UserPlan } from "@prisma/client";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: NextRequest) => {
  const headerList = await headers();

  const sig = headerList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "no sig" }, { status: 400 });
  }

  let event: Stripe.Event | undefined | null = undefined;

  try {
    const body = await request.text();
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET ?? ""
    );
  } catch {
    return NextResponse.json({ error: "Osef" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const object = event.data.object;
      const customerId =
        typeof object.customer === "string"
          ? object.customer
          : object.customer?.id;

      const PLAN = object.metadata?.plan;

      if (!PLAN) {
        return NextResponse.json({ error: true }, { status: 400 });
      }

      console.log({ priceId: PLAN });

      const user = await prisma.user.findFirst({
        where: {
          stripeCustomerId: customerId,
        },
      });

      if (!user) {
        return NextResponse.json({ error: true }, { status: 400 });
      }

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          plan: PLAN as UserPlan,
        },
      });

      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
  }

  return NextResponse.json({ ok: true });
};
