import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRequiredUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function RoutePage() {
  // 1. Toujours vérifier que l'utilisateur est connecté
  const user = await getRequiredUser();

  // 2. Toujours filtrer (where) les données en fonction de l'utilisateur
  const reviews = await prisma.review.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: user.id,
    },
  });

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>Your overview and analytics</CardDescription>
      </CardHeader>

      <Link href="/dashboard/secret">Secret</Link>

      <CardContent>
        {reviews.map((review) => (
          <p key={review.id}>{review.review}</p>
        ))}
      </CardContent>
    </Card>
  );
}
