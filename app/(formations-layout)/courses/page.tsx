import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import { UpdateTitleForm } from "./edit-title";
import { SelectStar } from "./select-star";

// Server Components
export default async function Page() {
  const userAgentList = userAgent({
    headers: await headers(),
  });

  const reviews = await prisma.review.findMany();

  // Server Function
  const setReviewStar = async (reviewId: string, star: number) => {
    "use server";

    await new Promise((r) => setTimeout(r, 1000));

    await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        star,
      },
    });

    revalidatePath("/courses");
  };

  const setReviewName = async (reviewId: string, name: string) => {
    "use server";

    await new Promise((r) => setTimeout(r, 1000));

    if (name === "error") {
      revalidatePath("/courses");
      return;
    }

    await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        name: name,
      },
    });

    revalidatePath("/courses");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Courses !</CardTitle>
        <CardDescription>{userAgentList.browser.name}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <SelectStar
                setNewStar={setReviewStar.bind(null, review.id)}
                star={review.star}
              />
              <UpdateTitleForm
                className="text-lg font-bold"
                setTitle={setReviewName.bind(null, review.id)}
              >
                {review.name}
              </UpdateTitleForm>
            </CardHeader>
            <CardContent>
              <p>{review.review}</p>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
