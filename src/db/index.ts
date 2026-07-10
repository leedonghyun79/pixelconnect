import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Vercel이나 Cloudflare Pages 등 서버리스 환경에서는 
// process.env.DATABASE_URL을 통해 환경변수를 가져옵니다.
const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });
