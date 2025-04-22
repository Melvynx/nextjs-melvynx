import { PageLayout } from "@/components/layout";
import { ModeToggle } from "@/components/theme-toggle";
import { getUser } from "@/lib/auth-server";
import Link from "next/link";

export default async function Home() {
  // Pré-requis

  const user = await getUser();

  return (
    <PageLayout>
      <h1>Learn Next.js</h1>
      <Link href="/formations" className="text-indigo-500 underline">
        Plan de formation
      </Link>
      <ModeToggle />
      {user ? (
        <div>
          <p>Bonjour {user.name}</p>
        </div>
      ) : (
        <p>Please login</p>
      )}
    </PageLayout>
  );
}
