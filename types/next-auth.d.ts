// types/next-auth.d.ts
import NextAuth from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string; // Add custom properties here
      created_at: string;
    }  & DefaultSession["user"]
  }

  interface User {
    id: string;
    name: string;
    email: string;
    created_at: string;
    // Include any other custom properties you want
  }
}
