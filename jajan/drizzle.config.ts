import { Config } from 'drizzle-kit';

export default {
  schema: './database/db.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'expo',
  dbCredentials: {
    url: './jajan.db',
  },
} satisfies Config;
