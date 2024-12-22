import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import GitHub from "next-auth/providers/github"
import { z } from 'zod';
import { User } from './app/lib/definitions';
import { getUser } from './app/lib/data';
import { createUser } from './app/lib/actions';
import bcrypt from "bcrypt";
export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        GitHub,
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z.object({ email: z.string().email({ message: "Not an email" }), password: z.string().min(6, { message: "Password must be at least 6 characters long" }) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user: User = await getUser(email);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password!);

                    if (passwordsMatch) {
                        console.log('Credentials are valid', user);
                        return{
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            created_at: user.created_at,
                        };
                    }
                }
                console.log('Invalid credentials');
                return null;
            },
        })],
    callbacks: {
        async jwt({ token, user}) {
            console.log('jwt callback - trying to access email');
            console.log("Inside jwt call back" , user);
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
                    id: existingUser.id,
                    name: existingUser.name,
                    created_at: existingUser.created_at,
                };
            }
            else {
                console.log('User object does not have an email property');
            }
            return token;
        },
        async session({ session, token, user }) {
            console.log('session callback - trying to access email', token);
            return {
                ...session,
                user: {
                    id: token.id as string,
                    name: token.name as string,
                    created_at: token.created_at as string
                }
            };
        }
    },
    session: {
        strategy: "jwt"
    },
    experimental: { enableWebAuthn: true },
});