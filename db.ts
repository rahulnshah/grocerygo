// lib/db.ts
import { createClient } from '@vercel/postgres';

const client = createClient({
  connectionString: process.env.DATABASE_URL,
});

export default client;