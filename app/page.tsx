import { ModeToggle } from "@/components/theme-toggle";
import { PageLayout } from "@/layout";
import Link from "next/link";

export default async function Home() {
  return (
    <PageLayout>
      <h1>Learn Next.js</h1>
      <Link href="/formations" className="text-indigo-500 underline">
        Plan de formation
      </Link>
      <ModeToggle />
    </PageLayout>
  );
}
