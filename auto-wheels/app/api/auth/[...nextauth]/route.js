
import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: '1090899538284-74f4i841j0ascsgk84i743bpriebu7d5.apps.googleusercontent.com',
        clientSecret: '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',
        authorization: {
            params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code",
            },
        },
    }),
    FacebookProvider({
      clientId: '3674373226209921',
      clientSecret: '3cfafde1642c14d2f16721e243c63fad'
    }),
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD
    //     }
    //   },
    //   from: process.env.EMAIL_FROM
    // }),
    // Credentials({
    //   name: "Credentials",
    //   credentials: {
    //     phone: {},
    //     password: {},
    //   },
    //   async authorize(credentials) {
    //     const res = await axios.post<LoginResponse>(
    //       process.env.API_BASE_URL + "api/v1/auth/login",
    //       credentials,
    //       {
    //         headers: {
    //           Accept: "application/json",
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );
    //     if (res.status === 200) {
    //       const { name, id, phone, role, picture } = res.data.user;
    //       const user = {
    //         id,
    //         name,
    //         phone,
    //         role,
    //         picture,
    //         token: res.data.token,
    //       };
    //       return user; // User interface we declared in next-auth.d.ts
    //     } else throw new Error("Login failed");
    //   },
    // })
  ],
  secret: '739d95146513d67502b0ba4776a5cae8',
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id = account.providerAccountId;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.userId = token.id;
      session.user.accessToken = token.accessToken;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to `/dashboard` after sign-in
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/dashboard`;
      }
      return baseUrl;
    }
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
