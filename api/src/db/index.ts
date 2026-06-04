import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import ENV from "../validators/env.validator";

const sql = neon(ENV.DATABASE_URL);
const db = drizzle({ client: sql });

export { db };
