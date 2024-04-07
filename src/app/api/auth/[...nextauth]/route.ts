import { addImage } from "@/services/addData/services";
import { login, loginWithGoogle } from "@/services/auth/services";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import {
  checkId,
  checkImage,
  checkImageName,
  checkOrderConfirm,
  checkOrderCount,
} from "@/services/checkDataSession/services";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const data: any = await login({ email });
        if (data) {
          const passwordConfirm = await compare(password, data.password);
          if (passwordConfirm) {
            return data;
          }
          return null;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user, session, trigger }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.username = user.username;
        token.role = user.role;
        token.id = user.id;
      }
      if (account?.provider === "google") {
        const data = {
          username: user.name,
          email: user.email,
          type: "google",
        };
        await loginWithGoogle(data, (result: any) => {
          token.email = result.user.email;
          token.username = result.user.username;
          token.role = result.user.role;
          token.id = result.user.id;
        });
      }
      if (trigger === "update") {
        if (session?.user?.image?.length > 0) {
          addImage(
            session.user.email,
            session.user.image,
            session.user.imageName
          );
        }
        return { ...token, ...session?.user };
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.image =
        (await checkImage(token.email)) || token.picture || ""; // Menggunakan token.picture sebagai cadangan jika tidak ada gambar yang ditemukan
      session.user.imageName = (await checkImageName(token.email)) || "";
      session.user.id = (await checkId(token.email)) || token.id || ""; // Menggunakan token.id sebagai cadangan jika tidak ada id yang ditemukan
      const orderCount = (await checkOrderCount(token.email)) || 0; // Menetapkan default value untuk orderCount
      const orderConfirm = (await checkOrderConfirm(token.email)) || 0; // Menetapkan default value untuk orderConfirm
      session.user.order = orderCount;
      session.user.orderConfirm = orderConfirm;
      if ("id" in token) {
        session.user.id = token.id;
      }
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("username" in token) {
        session.user.username = token.username;
      }
      if ("imageName" in token) {
        session.user.imageName = token.imageName;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      if ("order" in token) {
        session.user.order = orderCount || token.order;
      }
      if ("orderConfirm" in token) {
        session.user.orderConfirm = orderConfirm || token.orderConfirm;
      }
      const accessToken = jwt.sign(token, process.env.NEXTAUTH_SECRET || "", {
        algorithm: "HS256",
      });
      session.accessToken = accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
