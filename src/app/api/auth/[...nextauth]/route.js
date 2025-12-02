import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },

      async authorize({ email, password }) {
        const user = await prisma.user.findUnique({
          where: { email },
          include: { avatar: true }, // جلب صورة البروفايل
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,          // ADMIN / USER
          avatar: user.avatar || null,
        };
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      // تسجيل دخول جديد
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.avatar = user.avatar;
      }

      // لو مفيش avatar في token → جبناه من DB
      if (!token.avatar) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id },
          include: { avatar: true },
        });

        token.avatar = dbUser?.avatar || null;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.avatar = token.avatar;
      return session;
    }
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
