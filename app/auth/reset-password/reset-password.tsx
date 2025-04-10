"use client";

import { Button } from "@/components/ui/button";
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
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  async function onSubmit(formData: FormData) {
    const password = formData.get("password") as string;

    if (!token) {
      toast.error("invalid token");
      return;
    }

    await authClient.resetPassword(
      {
        newPassword: password,
        token,
      },
      {
        onSuccess: () => {
          router.push("/auth/sign");
          toast.success("Password Reset ! Please sign in.");
        },
        onError: (error) => {
          toast.error(error.error.message);
        },
      }
    );
  }
  // 8AWKa8AhxhFfe8QXZlONv8KC
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>{token}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" action={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input type="password" id="password" name="password"></Input>
          </div>
          <Button type="submit">Reset Password</Button>
        </form>
      </CardContent>
    </Card>
  );
}
