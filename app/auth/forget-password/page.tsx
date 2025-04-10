"use client";

import { SubmitButton } from "@/components/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignUpPage() {
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    const email = formData.get("email");
    console.log({ email });
    await authClient.forgetPassword(
      {
        email: String(email),
        redirectTo: "/auth/reset-password",
      },
      {
        onSuccess: () => {
          router.push(`/auth/verify?email=${email}`);
          router.refresh();
        },
        onError: (error) => {
          toast.error(error.error.message);
        },
      }
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Enter your email and password to sign in to your account. If you've
          forgotten your password, you can reset it using the link below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" action={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" id="email"></Input>
          </div>
          <SubmitButton type="submit">Reset Password</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
