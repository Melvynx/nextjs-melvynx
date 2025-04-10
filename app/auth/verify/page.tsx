import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function AuthPage(props: {
  searchParams: Promise<Record<string, string>>;
}) {
  const searchParams = await props.searchParams;
  const email = searchParams.email;
  return (
    <Card>
      <CardHeader className="">
        <CardTitle>Important : check your e-mail</CardTitle>
        {email ? (
          <CardDescription>We sent an email to {email}</CardDescription>
        ) : null}
      </CardHeader>
    </Card>
  );
}
