import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/sign-in/:path*",
    "/sign-up/:path*",
    "/panel/:path*",
    "/api/:path*",
    "/trpc/:path*",
    "/__clerk/:path*",
  ],
};