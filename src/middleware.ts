import { defineMiddleware } from 'astro:middleware';
import { createSupabaseClient } from './lib/supabase';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const host = context.request.headers.get('host') || '';

  // Redirect blog.jialecheng.es to /blog/
  const isBlogSubdomain =
    host === 'blog.jialecheng.es' ||
    (host.startsWith('blog.') && !host.startsWith('blog.localhost'));

  if (isBlogSubdomain && !pathname.startsWith('/blog')) {
    const slug = pathname.replace(/^\/+/, '');
    const target = slug ? `/blog/${slug}` : '/blog/';
    return context.redirect(target, 301);
  }

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    try {
      const supabase = createSupabaseClient(context.request, context.cookies);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return context.redirect('/admin/login');
      }

      context.locals.user = { id: user.id, email: user.email };
    } catch {
      return context.redirect('/admin/login');
    }
  }

  return next();
});
