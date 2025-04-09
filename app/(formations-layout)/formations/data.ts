export interface Lesson {
  id: string;
  title: string;
  description: string;
}

export interface Video {
  id: string;
  title: string;
  lessons: Lesson[];
}

export const VIDEOS: Video[] = [
  {
    id: "video-1",
    title: "Fundamentals",
    lessons: [
      {
        id: "video-1-lesson-1",
        title: "Introduction to Next.js",
        description: "Overview of Next.js and its core features",
      },
      {
        id: "video-1-lesson-2",
        title: "Setting up a Next.js project",
        description:
          "Step-by-step guide to create your first Next.js application",
      },
    ],
  },
  {
    id: "video-2",
    title: "Server Component + Prisma",
    lessons: [
      {
        id: "video-2-lesson-1",
        title: "Module 1",
        description:
          "Page Router vs App Router architecture, Server Components vs Client Components, Data Fetching patterns, File-based routing system, Built-in API routes and server actions",
      },
      {
        id: "video-2-lesson-2",
        title: "Working with Prisma",
        description: "Database integration with Prisma ORM",
      },
    ],
  },
  {
    id: "video-3",
    title: "Server Function + Mutation",
    lessons: [
      {
        id: "video-3-lesson-1",
        title: "Server Actions",
        description: "Implementing server-side functions in Next.js",
      },
      {
        id: "video-3-lesson-2",
        title: "Data Mutations",
        description: "Handling data changes and form submissions",
      },
    ],
  },
];
