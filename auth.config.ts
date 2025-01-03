import type { NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnHome = nextUrl.pathname.startsWith('/notebook');
      if (isOnHome) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/notebook', nextUrl));
      }
      return true;
    },
  },
  providers: [GitHub], // Add providers with an empty array for now
} satisfies NextAuthConfig;