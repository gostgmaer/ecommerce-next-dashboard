import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { secret } from './config/setting';

export async function middleware(req) {
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;

  const isProtectedRoute =
    pathname.startsWith('/dashboard') ||
    pathname === '/checkout' ||
    pathname.startsWith('/order');

  const isAuthRoute = pathname.startsWith('/auth');

  // Redirect unauthenticated users from protected pages
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}



export const config = {
  matcher: [
    '/dashboard/:path*',
    '/checkout',
    '/order/:path*',
    '/auth/:path*',
  ],
};
