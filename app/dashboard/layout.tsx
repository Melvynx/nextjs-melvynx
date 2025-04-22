import { PageLayout } from "@/components/layout";
import { getRequiredUser } from "@/lib/auth-server";
import type { ReactNode } from "react";

export default async function RouteLayout(props: { children: ReactNode }) {
  await getRequiredUser();

  return (
    <PageLayout>
      <div className="flex flex-col gap-4">{props.children}</div>
    </PageLayout>
  );
}
