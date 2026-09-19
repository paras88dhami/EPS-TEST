import { getUser } from '@netlify/identity';

const PUBLIC_PATHS = new Set(['/login', '/login.html', '/css/app.css', '/css/auth.css', '/assets/favicon.svg', '/js/auth-bundle.js', '/js/login.js']);
const PAGE_PATHS = new Set(['/', '/index', '/index.html', '/test', '/test.html', '/result', '/result.html']);

export default async function privateAccess(request, context) {
  const url = new URL(request.url);
  if (PUBLIC_PATHS.has(url.pathname) || url.pathname.startsWith('/.netlify/identity/')) return;
  let user;
  try { user = await getUser(); }
  catch { return new Response('Access verification unavailable. Try again.', { status: 503, headers: { 'Cache-Control': 'no-store' } }); }

  if (url.pathname === '/auth/session') {
    return Response.json({ user: user ? { id: user.id } : null }, { status: user ? 200 : 401, headers: { 'Cache-Control': 'private, no-store' } });
  }
  if (!user) {
    if (PAGE_PATHS.has(url.pathname)) {
      // Rewriting retains the browser's URL hash, which servers cannot read.
      // The public access page processes OAuth before any further navigation.
      const response = await context.rewrite(new URL('/login.html', url));
      const secured = new Response(response.body, response);
      secured.headers.set('Cache-Control', 'private, no-store');
      return secured;
    }
    return new Response('Unauthorized', { status: 401, headers: { 'Cache-Control': 'no-store' } });
  }
  const response = await context.next();
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}

export const config = { path: '/*' };
