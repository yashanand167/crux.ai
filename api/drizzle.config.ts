import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import ENV from './src/validators/env.validator';

export default defineConfig({
  out: './drizzle',
  schema: './src/models/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: ENV.DATABASE_URL,
  },
});
