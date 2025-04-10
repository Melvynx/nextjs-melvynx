import { PageLayout } from "@/components/layout";
import { PropsWithChildren } from "react";

export default function Layout(props: PropsWithChildren) {
  return <PageLayout>{props.children}</PageLayout>;
}
