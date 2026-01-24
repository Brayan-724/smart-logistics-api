import { defineConfig } from 'drizzle-kit';

function throws(error: Error | string): never {
  throw error instanceof Error ? error : new Error(error)
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/database/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? throws("No database url specified"),
  },
});

