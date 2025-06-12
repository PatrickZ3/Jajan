import { Config } from 'drizzle-kit';

export default {
  schema: './database/db.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'expo',
} satisfies Config;
