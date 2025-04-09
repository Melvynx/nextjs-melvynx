import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-10 w-full"></Skeleton>
        <Skeleton className="h-8 w-full"></Skeleton>
      </CardHeader>

      <CardFooter>
        <Skeleton className="h-8 w-16"></Skeleton>
      </CardFooter>
    </Card>
  );
}
