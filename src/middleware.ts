import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware: protects /account/* and redirects logged-in users from auth pages.
 * 
 * NOTE: @supabase/auth-helpers-nextjs@0.15 bundles @supabase/ssr and only exports
 * createBrowserClient and createServerClient. The middleware environment (Edge)
 * requires special cookie handling. Rather than attempting to call the auth API
 * from the middleware Edge runtime (which may cause issues with some Supabase
 * URL configurations), we rely on the presence of the sb-access-token cookie
 * as a heuristic to determine if the user is logged in.
 * 
 * The actual server components will do a proper session validation.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check for a Supabase session cookie (set by the browser after login)
  const hasSession = req.cookies.getAll().some(
    (c) => c.name.includes('auth-token') || c.name.includes('access-token') || c.name.startsWith('sb-')
  );

  // Protect /account routes
  if (pathname.startsWith('/account')) {
    if (!hasSession) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/login';
      redirectUrl.searchParams.set('redirectedFrom', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Redirect logged-in users away from auth pages
  if (hasSession && (pathname === '/login' || pathname === '/signup')) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/account';
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
