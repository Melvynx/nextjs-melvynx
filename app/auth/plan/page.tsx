import { SubmitButton } from "@/components/submit-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/auth-server";
import { getServerUrl } from "@/lib/server-url";
import { stripe } from "@/lib/stripe";
import { UserPlan } from "@prisma/client";
import { redirect, unauthorized } from "next/navigation";

export default async function AuthPage() {
  const user = await getUser();

  if (!user) {
    return unauthorized();
  }

  const plan = user.plan;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current plan : {plan}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <Card className="px-4 bg-background">
            <h3 className="text-lg font-semibold">Free Plan</h3>
            <p className="text-sm text-muted-foreground">$0 / month</p>
            <ul className="mt-2 space-y-2 text-sm">
              <li>• Up to 3 reviews</li>
              <li>• Basic features</li>
            </ul>
          </Card>

          <Card className="px-4 bg-background">
            <h3 className="text-lg font-semibold">Pro Plan</h3>
            <p className="text-sm text-muted-foreground">$99 / month</p>
            <ul className="mt-2 space-y-2 text-sm">
              <li>• Unlimited reviews (up to 999)</li>
              <li>• All premium features</li>
            </ul>
            <form>
              <SubmitButton
                formAction={async () => {
                  "use server";

                  const stripeCheckout = await stripe.checkout.sessions.create({
                    mode: "payment",
                    payment_method_types: ["card"],
                    line_items: [
                      {
                        price: process.env.STRIPE_PRO_PRICE_ID,
                        quantity: 1,
                      },
                    ],
                    metadata: {
                      plan: UserPlan.PRO,
                    },
                    success_url: `${getServerUrl()}/auth/plan?success=true`,
                    cancel_url: `${getServerUrl()}/auth/plan?canceled=true`,
                    customer: user.stripeCustomerId,
                  });

                  if (!stripeCheckout.url) {
                    throw new Error("HO, not possible");
                  }

                  redirect(stripeCheckout.url);
                }}
              >
                Upgrade plan
              </SubmitButton>
            </form>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
