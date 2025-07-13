// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import FacebookProvider from "next-auth/providers/facebook"
// import TwitterProvider from "next-auth/providers/twitter"
// import CredentialsProvider from "next-auth/providers/credentials"
// import bcrypt from "bcryptjs"
// import { getUserByEmail, createUser } from "./db"

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         console.log('Authorize attempt:', credentials?.email)

//         if (!credentials?.email || !credentials?.password) {
//           console.log('Missing credentials')
//           return null
//         }

//         try {
//           const user = await getUserByEmail(credentials.email)

//           if (!user) {
//             console.log('User not found')
//             return null
//           }

//           // Check if user has a password (not a social login user)
//           if (!user.password) {
//             console.log('User has no password (social login user)')
//             return null
//           }

//           const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

//           if (!isPasswordValid) {
//             console.log('Invalid password')
//             return null
//           }

//           console.log('Login successful for user:', user.id)
//           return {
//             id: user.id,
//             email: user.email,
//             name: user.name,
//           }
//         } catch (error) {
//           console.error("Auth error:", error)
//           return null
//         }
//       },
//     }),

//     // Social providers (optional)
//     ...(process.env.GOOGLE_CLIENT_ID ? [GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     })] : []),

//     ...(process.env.FACEBOOK_CLIENT_ID ? [FacebookProvider({
//       clientId: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//     })] : []),

//     ...(process.env.TWITTER_CLIENT_ID ? [TwitterProvider({
//       clientId: process.env.TWITTER_CLIENT_ID,
//       clientSecret: process.env.TWITTER_CLIENT_SECRET,
//       version: "2.0",
//     })] : []),
//   ],

//   callbacks: {
//     async signIn({ user, account, profile }) {
//       console.log('SignIn callback:', { provider: account?.provider, email: user?.email })
      
//       if (account?.provider === "google" || account?.provider === "facebook" || account?.provider === "twitter") {
//         try {
//           const existingUser = await getUserByEmail(user.email)

//           if (!existingUser) {
//             console.log('Creating new social user')
//             await createUser({
//               email: user.email,
//               name: user.name,
//               provider: account.provider,
//               providerId: account.providerAccountId,
//               // No password for social users
//             })
//           }
//           return true
//         } catch (error) {
//           console.error("Social sign-in error:", error)
//           return false
//         }
//       }
//       return true
//     },

//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id
//       }
//       return token
//     },

//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id
//       }
//       return session
//     },
//   },

//   pages: {
//     signIn: "/auth/signin",
//     signUp: "/auth/signup",
//   },

//   session: {
//     strategy: "jwt",
//   },

//   secret: process.env.NEXTAUTH_SECRET,
//   debug: process.env.NODE_ENV === 'development', // Enable debug in development
// }

// export default NextAuth(authOptions)




import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail, createUser, connectToDatabase } from "./db";
// import { connectToDB } from "@/utils/database"; // replace path if needed

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log('Authorize attempt:', credentials?.email);

        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials');
          return null;
        }

        try {
          const user = await getUserByEmail(credentials.email);

          if (!user) {
            console.log('User not found');
            return null;
          }

          // Check if user has a password (not a social login user)
          if (!user.password) {
            console.log('User has no password (social login user)');
            return null;
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordValid) {
            console.log('Invalid password');
            return null;
          }

          console.log('Login successful for user:', user.id);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),

    ...(process.env.GOOGLE_CLIENT_ID ? [GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })] : []),

    ...(process.env.FACEBOOK_CLIENT_ID ? [FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    })] : []),

    ...(process.env.TWITTER_CLIENT_ID ? [TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    })] : []),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('SignIn callback:', { provider: account?.provider, email: user?.email });

      try {
        await connectToDatabase();

        let dbUser = await getUserByEmail(user.email);

        if (!dbUser) {
          console.log('Creating new social user');

          dbUser = await createUser({
            email: user.email,
            name: user.name,
            image: user.image,
            provider: account.provider,
            providerId: account.providerAccountId,
          });
        }

        user.id = dbUser._id?.toString(); // ✅ Set user.id for token & session

        console.log('SignIn callback user object:', user);
        return true;

      } catch (error) {
        console.error("Social sign-in error:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);
