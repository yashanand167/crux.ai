import { z } from 'zod';

export const ENV = z.object({
    PORT: z.coerce.number(),
    DATABASE_URL: z.url(),
    REDIS_URL: z.url(),
    GITHUB_TOKEN: z.string(),
    
})

export default ENV.parse(process.env);