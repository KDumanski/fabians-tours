import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { isAllowed } from '@/lib/allowlist';

// Auth.js (NextAuth v5) — Google sign-in restricted to the admin allowlist.
// Required env (see DEPLOY-VERCEL.md):
//   AUTH_SECRET            (any long random string; `npx auth secret` generates one)
//   AUTH_GOOGLE_ID         (Google OAuth client ID)
//   AUTH_GOOGLE_SECRET     (Google OAuth client secret)
// On Vercel, AUTH_URL is inferred; locally it defaults to http://localhost:3000.
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    // Hard gate: reject anyone not on the allowlist at sign-in time.
    async signIn({ user }) {
      return isAllowed(user?.email);
    },
    // Carry the allowed flag onto the session for cheap server-side checks.
    async session({ session }) {
      session.isAdmin = isAllowed(session.user?.email);
      return session;
    },
  },
});
