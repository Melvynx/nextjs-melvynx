import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function NotFound() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>404</CardTitle>
        <CardDescription>Lesson not found.</CardDescription>
      </CardHeader>

      <CardFooter>
        <Link href={`/formations`}>Back to /formations</Link>
      </CardFooter>
    </Card>
  );
}
