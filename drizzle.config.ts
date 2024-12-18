import { Config, defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './utils/schema.tsx',
  out: './drizzle',
  dbCredentials: {
    url: `${process.env.NEXT_PUBLIC_DATABASE_URL}`,
  },
}) satisfies Config;
