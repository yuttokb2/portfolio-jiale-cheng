import type { APIRoute } from 'astro';
import { createSupabaseClient } from '../../../lib/supabase';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const supabase = createSupabaseClient(request, cookies);
  await supabase.auth.signOut();
  return redirect('/admin/login');
};
