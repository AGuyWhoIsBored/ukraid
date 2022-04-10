import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signIn } from 'next-auth/react';
import * as db from "../../../server/db"

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "BobJohnson123" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        if(credentials === undefined) {
          return null;
        } else if (credentials.username == "john" && credentials.password == "password") {
          return {
            id: 1,
            username: "John",
            email: "johndoe@email.com"
          };
        }
        const userProfile = await db.checkUser(credentials.username)
        
        // Return null if user data could not be retrieved
        if(userProfile == null) {
          return null;
        }
        return userProfile;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if(token) {
        session.id = token.id;
      }
      return session
    },
    async jwt({ token, user }) {
      if(user) {
        token.id = user.id
      }
      return token
    }
  },
  pages: {
    newUser: '/auth/register',
    signIn: '/auth/login'
  },
  theme: {
    colorScheme: "light",
    brandColor: "00b757",
  }

})