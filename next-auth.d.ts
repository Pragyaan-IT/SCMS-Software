import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: userTypes;
    };
  }

  interface User {
    id: string;
    userType: userTypes;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: userTypes;
  }
}
