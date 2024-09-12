import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import GitHub from "next-auth/providers/github"
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { User } from './app/lib/definitions';
import { sql } from '@vercel/postgres';

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}


export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        GitHub,
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email({ message: "Not an email" }), password: z.string().min(6, { message: "Password must be at least 6 characters long" }) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) return user;
                }
                console.log('Invalid credentials');
                return null;
            },
        })],
});