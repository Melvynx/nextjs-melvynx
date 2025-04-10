import { PageLayout } from "@/components/layout";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { UpdateTitleForm } from "@app/(formations-layout)/courses/edit-title";
import { SelectStar } from "@app/(formations-layout)/courses/select-star";
import { Banknote, X } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { unauthorized } from "next/navigation";
import { ReviewForm } from "./review-form";
import { deleteReviewAction, updateReviewAction } from "./review.action";

export default async function Home() {
  const user = await getUser();

  if (!user) unauthorized();

  const reviews = await prisma.review.findMany({
    where: {
      userId: user?.id,
    },
  });

  const isOffLimit = reviews.length >= user.limit.reviewLimit;

  const changeStar = async (reviewId: string, star: number) => {
    "use server";

    await new Promise((r) => setTimeout(r, 1000));

    await updateReviewAction({
      reviewId: reviewId,
      star,
    });

    revalidatePath("/");
  };

  const changeName = async (reviewId: string, name: string) => {
    "use server";

    await new Promise((r) => setTimeout(r, 1000));

    await updateReviewAction({
      reviewId: reviewId,
      name,
    });

    revalidatePath("/");
  };

  return (
    <PageLayout>
      <Card>
        <CardHeader>
          <CardTitle>Share review link</CardTitle>
        </CardHeader>
        <CardContent>
          {isOffLimit ? (
            <Alert>
              <Banknote />
              <div className="flex flex-col gap-4">
                <AlertTitle>
                  You're review limit of {user.limit.reviewLimit} has been
                  reached
                </AlertTitle>
                <Link
                  className={buttonVariants({ size: "sm" })}
                  href="/auth/plan"
                >
                  Upgrade
                </Link>
              </div>
            </Alert>
          ) : (
            <Input value={`http://localhost:3000/post-review/${user?.id}`} />
          )}
        </CardContent>
      </Card>
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <Card key={review.id} className="relative">
            <div className="absolute right-4 top-4">
              <form>
                <Button
                  formAction={async () => {
                    "use server";

                    await deleteReviewAction({ reviewId: review.id });

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
        <ReviewForm userId={user?.id ?? ""} />
      </Card>
    </PageLayout>
  );
}
