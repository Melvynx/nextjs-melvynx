import { SubmitButton } from "@/components/submit-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { getUser } from "@/lib/auth-server";
import { Check, Edit } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect, unauthorized } from "next/navigation";

export default async function AuthPage() {
  const user = await getUser();

  if (!user) {
    return unauthorized();
  }

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0">
        <CardTitle>User Profile</CardTitle>
        <div className="flex-1"></div>
        <Link className="flex items-center gap-2 text-sm" href="/auth/edit">
          <Edit className="size-3 text-muted-foreground" /> Edit
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Name</span>
            <span>{user.name}</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Email</span>
              {user.emailVerified ? (
                <Check className="size-3" />
              ) : (
                <form>
                  <SubmitButton
                    className="h-6"
                    formAction={async () => {
                      "use server";

                      await auth.api.sendVerificationEmail({
                        headers: await headers(),
                        body: {
                          email: user.email,
                          callbackURL: "/auth",
                        },
                      });
                      redirect(`/auth/verify?email=${user.email}`);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Verify
                  </SubmitButton>
                </form>
              )}
            </div>
            <span>{user.email}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
