import { NextRequest, NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes
const publicRoutes = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

// Middleware function
export default clerkMiddleware(async (auth, request: NextRequest) => {
  // Extract the URL from the NextRequest object
  const url = request.nextUrl;

  // Skip processing for static assets and other non-application requests
  if (url.pathname.startsWith('/_next/static/')) {
    return NextResponse.next();
  }

  // Log for debugging purposes
  //console.log(`Request URL: ${url.pathname}`);
  //console.log(`Public Route Match: ${publicRoutes(request)}`);

  // Check if the URL matches a public route
  if (publicRoutes(request)) {
    return NextResponse.next();
  }

  // For protected routes, check authentication
  const { userId } = await auth();

  if (!userId) {
    // If the user is not authenticated, redirect them to the sign-in page
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Allow the request to proceed if authenticated
  return NextResponse.next();
});
