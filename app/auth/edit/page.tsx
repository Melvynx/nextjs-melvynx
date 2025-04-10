import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/auth-server";
import { unauthorized } from "next/navigation";
import { AccountForm } from "./account-form";

export default async function AuthPage() {
  const user = await getUser();

  if (!user) {
    return unauthorized();
  }

  return (
    <Card>
      <CardHeader className="">
        <CardTitle>Edit Account</CardTitle>
      </CardHeader>
      <CardContent>
        <AccountForm defaultValues={{ name: user.name, image: user.image }} />
      </CardContent>
    </Card>
  );
}
