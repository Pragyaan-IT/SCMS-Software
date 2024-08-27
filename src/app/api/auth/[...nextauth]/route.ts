import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import bcrypt from "bcrypt";
import { db } from "@/db";
import { admins, students, teachers } from "@/db/schema";
import { eq } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
  // @ts-ignore
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      id: "student",
      name: "Credentials",
      credentials: {
        registration_id: { label: "registration_id", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.registration_id || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const student = await db.select()
          .from(students)
          .where(eq(students.registration_id, credentials.registration_id.toString()))

        if (!student) {
          throw new Error("Invalid credentials");
        }

        if (student && student[0]?.password === credentials.password) {
          return { id: student[0].registration_id, userType: "student" };
        }
        return null;

      },
    }),
    CredentialsProvider({
      id: "teacher",
      name: "Credentials",
      credentials: {
        teacher_id: { label: "teacher_id", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.teacher_id || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const teacher = await db.select()
          .from(teachers)
          .where(eq(teachers.teacher_id, credentials.teacher_id.toString()))

        if (!teacher) {
          throw new Error("Invalid credentials");
        }

        if (teacher && teacher[0]?.password === credentials.password) {
          return { id: teacher[0].id, userType: "teacher" };
        }
        return null;
      },
    }),
    CredentialsProvider({
      id: "admin",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const admin = await db.select()
          .from(admins)
          .where(eq(admins.email, credentials.email.toString()))

        if (!admin) {
          throw new Error("Invalid credentials");
        }

        if (admin && admin[0]?.password === credentials.password) {
          return { id: admin[0].email, userType: "admin" };
        }
        return null;
      },
    })
  ],
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.userType;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
