import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token");
  const isAuth = Boolean(token);

  // Define paths that are restricted for authenticated users
  const restrictedPathsForAuthUsers = [
    "/login",
    "/register",
    "/forgot-password",
  ];

  // Define paths that are restricted for unauthenticated users
  const restrictedPathsForUnAuthUsers = ["/dashboard", "/dashboard/:path*"];

  // Check if the user is trying to access restricted paths for authenticated users
  if (
    isAuth &&
    restrictedPathsForAuthUsers.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Check if the user is trying to access restricted paths for unauthenticated users
  if (
    !isAuth &&
    restrictedPathsForUnAuthUsers.some((path) =>
      request.nextUrl.pathname.startsWith(path)
    )
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "redirectTo",
      request.nextUrl.pathname + request.nextUrl.search
    );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Configuration for matching paths
export const config = {
  matcher: [
    "/login",
    "/register",
    "/forgot-password",
    "/about/:path*",
    "/dashboard/:path*",
  ],
};
