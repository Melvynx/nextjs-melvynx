import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PageLayout } from "@/layout";
import { prisma } from "@/lib/prisma";
import { UpdateTitleForm } from "@app/(formations-layout)/courses/edit-title";
import { SelectStar } from "@app/(formations-layout)/courses/select-star";
import { X } from "lucide-react";
import { revalidatePath } from "next/cache";
import { ReviewForm } from "./review-form";

export default async function Home() {
  const reviews = await prisma.review.findMany();

  const changeStar = async (reviewId: string, star: number) => {
    "use server";

    await new Promise((r) => setTimeout(r, 1000));

    await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        star: star,
      },
    });

    revalidatePath("/");
  };

  const changeName = async (reviewId: string, name: string) => {
    "use server";

    await new Promise((r) => setTimeout(r, 1000));

    await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        name,
      },
    });

    revalidatePath("/");
  };

  return (
    <PageLayout>
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <Card key={review.id} className="relative">
            <div className="absolute right-4 top-4">
              <form>
                <Button
                  formAction={async () => {
                    "use server";

                    await prisma.review.delete({
                      where: {
                        id: review.id,
                      },
                    });

                    revalidatePath("/");
                  }}
                  size="sm"
                  variant="outline"
                >
                  <X />
                </Button>
              </form>
            </div>
            <CardHeader>
              <SelectStar
                onStarChange={changeStar.bind(null, review.id)}
                star={review.star}
              />
              <UpdateTitleForm
                onTitleChange={changeName.bind(null, review.id)}
                className="text-lg font-bold"
              >
                {review.name}
              </UpdateTitleForm>
            </CardHeader>
            <CardContent>
              <p>{review.review}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="px-4">
        <ReviewForm />
      </Card>
    </PageLayout>
  );
}
