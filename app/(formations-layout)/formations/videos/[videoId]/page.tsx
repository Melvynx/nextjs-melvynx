import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import { VIDEOS } from "../../data";

export async function generateStaticParams() {
  const videos = VIDEOS;

  const result = videos.map((video) => ({
    videoId: video.id,
  }));

  return result;
}

type PageProps = {
  params: Promise<{ videoId: string }>;
};

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const params = await props.params;

  const video = VIDEOS.find((video) => video.id === params.videoId);

  return {
    title: `Video • ${video?.title}`,
  };
};

export default async function Page(props: PageProps) {
  const params = await props.params;

  const video = VIDEOS.find((video) => video.id === params.videoId);

  if (!video) {
    // TODO Changer
    return <p>invalid video</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{video.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ul className="list-disc list-inside">
          {video?.lessons.map((lesson) => (
            <li key={lesson.title}>
              <Link
                href={`/formations/videos/${video.id}/lessons/${lesson.id}`}
              >
                {lesson.title}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link href="/formations">Back</Link>
      </CardFooter>
    </Card>
  );
}
