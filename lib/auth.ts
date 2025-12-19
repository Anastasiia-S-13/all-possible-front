//lib/auth.ts
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
};
