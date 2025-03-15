import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import GitHub from "next-auth/providers/github"
import { z } from 'zod';
import { User } from './app/lib/definitions';
import { getUser } from './app/lib/data';
import { createUser } from './app/lib/actions';
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt"
import { Session, DefaultSession } from "next-auth"

// Define return types
type AuthorizeReturn = {
    id: string;
    name: string;
    email: string;
    created_at: string;
} | null;

type JWTCallback = JWT & {
    id?: string;
    created_at?: string | undefined;
};

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id?: string;
            name?: string | null;
            email?: string | null;
            created_at?: string | undefined;
        } & DefaultSession["user"];
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        GitHub,
        Credentials({
            async authorize(credentials): Promise<AuthorizeReturn> {
                const parsedCredentials = z.object({ 
                    email: z.string().email({ message: "Not an email" }), 
                    password: z.string().min(6, { message: "Password must be at least 6 characters long" }) 
                }).safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user: User = await getUser(email);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password!);

                    if (passwordsMatch) {
                        return {
                            id: user.id!.toString(),
                            name: user.name!,
                            email: user.email!,
                            created_at: user.createdAt!.toISOString(),
                        };
                    }
                }
                return null;
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }): Promise<JWTCallback> {
            if (user && user.email && user.name) {
                const email = user.email;
                // Check if a user with this email already exists
                let existingUser: User = await getUser(email);

                if (!existingUser) {
                    // Insert the user in the DB like you would submit a form
                    // User does not exist, insert them into the database
                    const formData = new FormData();
                    formData.set('name', user.name);
                    formData.set('email', user.email);
                    formData.set('password', "examplePassword");
                    const result = await createUser({}, formData);

                    // Handle result of createUser, you can log or throw errors if needed
                    if (result?.errors) {
                        console.log(result.errors);
                        throw new Error(result.message);
                    }

                    existingUser = await getUser(email);
                }
                // return all the stuff for the session for that same user
                return {
                    ...token,
                    id: existingUser.id?.toString(),
                    created_at: existingUser.createdAt?.toISOString(),
                };
            }
            return token;
        },
        async session({ session, token }): Promise<Session> {
            return {
                ...session,
                user: {
                    id: (token as JWTCallback).id,
                    name: token.name,
                    created_at: token.created_at as string | undefined
                },
                expires: session.expires
            };
        }
    },
    session: {
        strategy: "jwt"
    },
});