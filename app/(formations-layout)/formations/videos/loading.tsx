import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  return (
    <div>
      <header className="border-b flex items-center gap-2 -mx-4 px-4 pb-2 mb-4">
        <Skeleton className="w-24 h-10"></Skeleton>
      </header>
      <Skeleton className="w-24 h-24"></Skeleton>
    </div>
  );
}
