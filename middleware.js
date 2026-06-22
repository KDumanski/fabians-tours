import { auth } from '@/auth';

// Protect everything under /admin except the login page itself. Unauthenticated (or
// non-allowlisted) visitors are redirected to /admin/login. The signIn callback in
// auth.js is the real gate — this just keeps the dashboard UI behind a session.
export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLogin = pathname.startsWith('/admin/login');
  const signedIn = !!req.auth?.user && req.auth?.isAdmin;

  if (pathname.startsWith('/admin') && !isLogin && !signedIn) {
    const url = new URL('/admin/login', req.nextUrl.origin);
    return Response.redirect(url);
  }
  return undefined;
});

export const config = {
  // Run only on admin routes (and skip Next internals / static files).
  matcher: ['/admin/:path*'],
};
