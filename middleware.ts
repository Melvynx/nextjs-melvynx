import { getUser } from "@/lib/auth-server";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Optional
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const user = await getUser();

    if (!user) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
};
