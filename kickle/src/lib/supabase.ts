import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types';

// ─── Browser client (for React components) ────────────────────────────────────
export const createBrowserClient = () =>
  createClientComponentClient<Database>();

// ─── Server client (for API routes) ──────────────────────────────────────────
export const createServerClient = () =>
  createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
