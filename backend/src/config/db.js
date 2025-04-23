import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();


if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error(`
    Missing Supabase credentials. Please:
    1. For local dev: Create .env file
    2. For production: Set Vercel env vars
    Received:
    - URL: ${process.env.SUPABASE_URL || 'undefined'}
    - KEY: ${process.env.SUPABASE_KEY || 'undefined'}
  `);
}

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);