import { PageLayout } from "@/layout";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function Layout(props: PropsWithChildren) {
  return (
    <PageLayout>
      <header className="border-b -mx-4 px-4 pb-2">
        <Link href="/formations" className="font-bold">
          /formations
        </Link>
      </header>
      {props.children}
    </PageLayout>
  );
}
