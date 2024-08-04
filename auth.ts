import NextAuth from "next-auth";
import Kakao from "next-auth/providers/kakao";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Kakao],
  callbacks: {
    signIn: async ({ user, account }) => {
      if (!account) return false;
      if (account.access_token) user.accessToken = account.access_token;

      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;

      return session;
    },
  },
});
