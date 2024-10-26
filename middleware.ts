import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

// const isProtectedRoute = createRouteMatcher(['/admin', '/teacher', '/student', '/parent'])
const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

console.log('The matchers', matchers);

export default clerkMiddleware((auth, req) => {
  // if (isProtectedRoute(req)) await auth.protect()

  const { sessionClaims } = auth();

  // if (!sessionClaims) {
  //   console.log('No session claims found. User may not be authenticated.');
  //   return NextResponse.redirect(new URL('/', req.url)); // Redirect to login or similar
  // }

  console.log('The claims', sessionClaims)

  const role = (sessionClaims?.metadata as { role?: string })?.role;

  console.log('The role', role)

  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req) && !allowedRoles.includes(role!)) {
      return NextResponse.redirect(new URL(`/${role}`, req.url))
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};