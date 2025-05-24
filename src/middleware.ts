import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Create the i18n middleware
const i18nMiddleware = createMiddleware(routing);

// Public pages that don't require authentication
const publicPages = ['/login'];

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;
  
  // Handle i18n first
  const response = i18nMiddleware(request);
  
  // Find the locale from the pathname
  const locale = routing.locales.find(locale => pathname.startsWith(`/${locale}/`)) || 'en';
  
  // Check if the page is not public and there's no token
  const isPublicPage = publicPages.some(page => pathname.includes(page));
  if (!isPublicPage && !token) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If we have a token and user tries to access login page, redirect to dashboard
  if (token && isPublicPage) {
    const dashboardUrl = new URL(`/${locale}/dashboard`, request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return response;
}

export const config = {
  // Match all pathnames except for public files and API routes
  matcher: ['/', '/((?!api|_next|.*\\..*).*)']};