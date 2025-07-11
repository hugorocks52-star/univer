import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/about",
  "/catalogs",
  "/univercat.pdf",
  "/contact",
  "/api/contact",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) {
    return;
  }

  const { sessionClaims } = await auth.protect();

  const userRole = sessionClaims?.["role"];
  const isAdminRoute = req.nextUrl.pathname.startsWith("/panel");

  console.log("JWT Claims:", sessionClaims);

  if (isAdminRoute && userRole !== "admin") {
    return new Response("Forbidden: Admin access only.", { status: 403 });
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
