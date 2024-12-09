// utils/dbConfig.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  }, // Adjust SSL settings if needed
});

export const db = drizzle(pool, { schema });
