import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import type { AstroCookies } from 'astro';

export interface Project {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  impact: string[];
  technologies: string[];
  category: string;
  icon: string;
  demo_url: string | null;
  repo_url: string | null;
  preview_image: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  published: boolean;
  reading_time: number;
  created_at: string;
  updated_at: string;
}

/** SSR client for authenticated sessions (anon key + cookie-based auth) */
export function createSupabaseClient(request: Request, cookies: AstroCookies) {
  return createServerClient(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get('Cookie') ?? '');
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookies.set(name, value, options as Parameters<AstroCookies['set']>[2]);
          });
        },
      },
    }
  );
}

/** Admin client using service role key — server-side only */
export function createSupabaseAdmin() {
  return createClient(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_SERVICE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

/**
 * Returns a query builder scoped to the `portfolio` schema.
 * Use this for all data operations (projects, posts, etc.).
 * Auth operations (supabase.auth.*) stay on the base client.
 *
 * @example
 * const supabase = createSupabaseClient(Astro.request, Astro.cookies);
 * const { data } = await db(supabase).from('projects').select('*');
 */
export function db(client: ReturnType<typeof createSupabaseClient> | ReturnType<typeof createSupabaseAdmin>) {
  return client.schema('portfolio');
}

/** Estimate reading time in minutes */
export function estimateReadingTime(text: string): number {
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

/** Generate a URL-safe slug from a title */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
