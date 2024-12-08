import { Config, defineConfig } from 'drizzle-kit';

// export default defineConfig({
//   dialect: 'postgresql',
//   schema: './src/schema.ts',
//   out: './drizzle',
//   dbCredentials: {
//     connectionString: process.env.DATABASE_URL!,
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } as any, // Use cautiously, ensure runtime support
// }) satisfies Config;

export default defineConfig({
  dialect: 'postgresql',
  schema: './utils/schema.tsx',
  out: './drizzle',
  dbCredentials: {
    url: `${process.env.NEXT_PUBLIC_DATABASE_URL}`,
  },
}) satisfies Config;
