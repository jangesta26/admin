// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('isAuthenticated');

  // If the user is not authenticated and trying to access the root URL, redirect to the sign-in page
  if (!isAuthenticated && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}

// Apply middleware to the root URL and other routes as needed
export const config = {
  matcher: ['/', '/dashboard/:path*'], // Apply middleware to the root and all admin routes
};
