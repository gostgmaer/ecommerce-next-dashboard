import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/github";
import { setCookie } from 'cookies-next';
import NextAuth from "next-auth";
import {
  baseurl,
  githubClient,
  githubSecret,
  googleClient,
  googleSecret,
  secret,
} from "@/config/setting";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        const res = await fetch(baseurl + `/user/auth/login`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        try {
          const user = await res.json();

          if (res.ok && user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          /////console.log("Error:", error);
          throw new Error(error);
        }
      },
    }),
    GitHubProvider({
      clientId: githubClient,
      clientSecret: githubSecret,
    }),
    GoogleProvider({
      clientId: googleClient,
      clientSecret: googleSecret,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // ...add more providers here
  ],

  secret: secret,
  pages: {
    signIn: "/auth/login",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60
  },
  events: {
    signOut: async (message) => {
      console.log("User has been signed out:", message);
      // You can add additional logic here if needed
    },
  },

  callbacks: {


    async signIn({ user, account, profile, email, credentials }) {

      // const { account, profile } = user

      if (account.provider === "github") {
        try {
          // Check if user exists via your backend
          const response = await fetch(`${baseurl}/user/auth/checkUser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: profile.email,
              email: profile.email,
            }),
          });

          let userData = await response.json();

          if (userData["statusCode"] == "404") {
            // Create a new user via your backend
            const createUserResponse = await fetch(
              `${baseurl}/user/auth/social-register`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  socialID: user["id"],
                  email: profile.email,
                  // name: profile.name,
                  profilePicture: user.image,
                  username: profile.email,
                  firstName: profile["login"]
                }),
              }
            );

            userData = await createUserResponse.json();
            user['accessToken'] = userData["accessToken"];
            user['refreshToken'] = userData["refreshToken"];
            user['id_token'] = userData["id_token"];
            user['token_type'] = userData["token_type"];
          }else{
            user['accessToken'] = userData["accessToken"];
            user['refreshToken'] = userData["refreshToken"];
            user['id_token'] = userData["id_token"];
            user['token_type'] = userData["token_type"];
          
          }
          return true;
          // Attach tokens returned by the backend to the session
         
        } catch (error) {
          console.error("Error during GitHub sign-in:", error);
          return false;
        }
      }

      if (user && user?.["accessToken"]) {
        // Store tokens in cookies
        setCookie('accessToken', user["accessToken"], {
          maxAge: 60 * 60 * 24, // 1 day
        });
        setCookie('idToken', user["id_token"], {
          maxAge: 60 * 60 * 24, // 1 day
        });
        setCookie('refreshToken', user["refreshToken"], {
          maxAge: 60 * 60 * 24, // 1 day
        });
      }


      return true; // Continue with other providers if any
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return baseUrl;
      return baseUrl;
    },
    async session({ session, token, user }) {
      session["refreshToken"] = token.refreshToken;
      session["id_token"] = token.id_token;
      session["token_type"] = token.token_type;
      session["accessToken"] = token.accessToken;

      const currentTime = Math.floor(Date.now() / 1000);
      if (token.exp && token.exp < currentTime) {
        return null; // Invalidate session if token has expired
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser, session, trigger = "signIn" }) {


      if (user) {
        token.accessToken = user["accessToken"];
        token.refreshToken = user["refreshToken"];
        token.id_token = user["id_token"];
        token.token_type = user["token_type"];
      }
      return token;
    },
  },
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: "", // Hex color code #33FF5D
    logo: "/vercel.svg", // Absolute URL to image
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
}

// @ts-ignore
export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };