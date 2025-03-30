import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("jwttoken")?.value;

  if (token && path === "/") return NextResponse.next();
  if (!token && path === "/")
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  if (token && path !== "/")
    return NextResponse.redirect(new URL("/", request.url));
  if (!token && path !== "/") return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup"],
};
