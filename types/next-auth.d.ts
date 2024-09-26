// types/next-auth.d.ts

import NextAuth from "next-auth";

// Extend the default User type with created_at
declare module "next-auth" {
  interface User {
    created_at?: string;
    name?: string;
  }
}

// Extend JWT to include created_at
declare module "next-auth/jwt" {
  interface JWT {
    created_at?: string;
  }
}
