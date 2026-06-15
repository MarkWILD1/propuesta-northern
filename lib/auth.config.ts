import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isLoginPage = pathname === "/admin/login";
      const isAdminRoute = pathname.startsWith("/admin");

      if (!isAdminRoute) {
        return true;
      }

      if (!auth && !isLoginPage) {
        return false;
      }

      if (auth && isLoginPage) {
        return Response.redirect(new URL("/admin", request.nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.adminId = user.id;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.adminId as string;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
