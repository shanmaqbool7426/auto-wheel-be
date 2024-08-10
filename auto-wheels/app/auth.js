

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";

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
  ],
  secret: '739d95146513d67502b0ba4776a5cae8',

  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@example.com")
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  } 
}

export default NextAuth(authOptions)