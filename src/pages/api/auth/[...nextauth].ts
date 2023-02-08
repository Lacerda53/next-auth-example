import NextAuth, { AuthOptions } from "next-auth";

const authOptions: AuthOptions = {
  providers: [
    {
      id: "orulo",
      name: "Orulo",
      type: "oauth",
      version: "2.0",
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      issuer: process.env.API_URL,
      authorization: {
        url: `${process.env.API_URL}/oauth/authorize`,
        params: {
          redirect_uri: process.env.CALLBACK_LOGIN,
          scope: "basic_info",
        },
      },
      token: `${process.env.API_URL}/oauth/token`,
      userinfo: `${process.env.API_URL}/api/v2/me`,
      profile(profile) {
        return {
          ...profile,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: token.user,
        accessToken: token.accessToken,
      };
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
