import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import { VIDEOS } from "./data";

export const metadata: Metadata = {
  title: "Plan de formation",
  description: "Blabla",
};

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Plan de formation</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {VIDEOS.map((video) => (
          <Link
            href={`/formations/videos/${video.id}`}
            key={video.id}
            className="text-indigo-500 underline"
          >
            {video.title}
          </Link>
        ))}
        <Link
          href={`/formations/videos/404`}
          className="text-indigo-500 underline"
        >
          404
        </Link>
      </CardContent>
    </Card>
  );
}
