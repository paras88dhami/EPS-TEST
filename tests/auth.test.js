import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const browserSource = (await readFile('js/auth-entry.js', 'utf8')).replace(/^import .*;\n/, '');
const edgeSource = (await readFile('netlify/edge-functions/private-access.js', 'utf8'))
  .replace(/^import .*;\n/, '').replace('export default async function', 'async function').replace('export const config', 'const config') + '\nglobalThis.handler = privateAccess;';

function browser(path, authenticated = false) {
  const calls = [];
  const parsed = new URL(path, 'https://example.com');
  const location = { origin: parsed.origin, pathname: parsed.pathname, search: parsed.search, hash: parsed.hash, replace: value => calls.push(['redirect', value]) };
  const saved = new Map();
  const sandbox = {
    URL, URLSearchParams, location, window: {},
    document: { documentElement: { classList: { add: value => calls.push(['visible', value]) } } },
    history: { replaceState: () => { location.hash = ''; calls.push(['clean']); } },
    sessionStorage: { getItem: key => saved.get(key), setItem: (key, value) => saved.set(key, value), removeItem: key => saved.delete(key) },
    getUser: async () => { calls.push(['session']); },
    getSettings: async () => ({ providers: { google: true } }),
    oauthLogin: provider => { calls.push(['oauth', provider]); throw new Error('Redirecting to OAuth provider'); },
    logout: async () => { calls.push(['logout']); },
    handleAuthCallback: async () => { calls.push(['callback', location.hash]); authenticated = true; return { type: 'oauth' }; },
    fetch: async () => ({ status: authenticated ? 200 : 401, ok: authenticated, json: async () => ({ user: { id: 'member' } }) }),
    alert: value => calls.push(['alert', value])
  };
  vm.runInNewContext(browserSource, sandbox);
  return { auth: sandbox.window.epsAuth, calls, sandbox };
}

for (const page of ['index', 'test', 'result']) {
  test(`${page}: browser gate denies an absent session`, async () => {
    const { auth, calls } = browser(`/${page}.html?set=set-001`);
    assert.equal(await auth.protectPage(), null);
    assert.equal(calls.some(([type]) => type === 'visible'), false);
    assert.match(calls.at(-1)[1], /^\/login.html\?redirect=/);
  });
  test(`${page}: existing session permits initialization`, async () => {
    const { auth, calls } = browser(`/${page}.html`, true);
    assert.equal((await auth.protectPage()).id, 'member');
    assert.equal(calls.at(-1)[0], 'visible');
  });
}

test('OAuth token is processed before session check, then removed', async () => {
  const { auth, calls } = browser('/index.html#access_token=test-token');
  await auth.protectPage();
  assert.deepEqual(calls.map(item => item[0]), ['callback', 'clean', 'session', 'visible']);
});
test('provider error is cleaned and can be retried without a redirect loop', async () => {
  const { auth, calls, sandbox } = browser('/login.html#error=access_denied');
  await assert.rejects(auth.processAuthCallback(), /not completed/);
  assert.equal(sandbox.location.hash, '');
  assert.equal(calls.some(([type]) => type === 'redirect'), false);
  await auth.continueWithGoogle();
  assert.deepEqual(calls.at(-1), ['oauth', 'google']);
});
test('legacy invite token never activates an account', async () => {
  const { auth, calls } = browser('/login.html#invite_token=example');
  assert.equal((await auth.processAuthCallback()).type, 'invitation-notice');
  assert.deepEqual(calls, [['clean']]);
});
test('external redirect targets are rejected', () => {
  for (const target of ['https://evil.example', '//evil.example', '/data/sets.json', 'javascript:alert(1)']) {
    assert.equal(browser('/login.html?redirect=' + encodeURIComponent(target)).auth.destination(), '/index.html');
  }
});
test('intended test is retained across OAuth return to root', async () => {
  const { auth, sandbox } = browser('/test.html?set=set-002');
  await auth.continueWithGoogle();
  sandbox.location.pathname = '/'; sandbox.location.search = '';
  assert.equal(auth.destination(), '/test.html?set=set-002');
});
test('logout ends session before navigating', async () => {
  const { auth, calls } = browser('/index.html', true);
  await auth.signOut();
  assert.deepEqual(calls, [['logout'], ['redirect', '/login.html']]);
});

function edge(user, fail = false) {
  const sandbox = { URL, Response, getUser: async () => { if (fail) throw new Error('offline'); return user; } };
  vm.runInNewContext(edgeSource, sandbox);
  return sandbox.handler;
}
test('edge denies data, images, scripts and unknown paths without serving them', async () => {
  for (const path of ['/data/sets.json', '/data/set-001/reading.json', '/assets/questions/set-001/q01.webp', '/js/test.js', '/private']) {
    const response = await edge(null)(new Request('https://example.com' + path), { next: () => assert.fail('must not serve protected file') });
    assert.equal(response.status, 401);
  }
});
test('edge serves public access shell for all protected page aliases', async () => {
  for (const path of ['/', '/index', '/index.html', '/test', '/test.html', '/result', '/result.html']) {
    const response = await edge(null)(new Request('https://example.com' + path), {
      rewrite: async url => { assert.equal(url.pathname, '/login.html'); return new Response('access page'); }
    });
    assert.equal(await response.text(), 'access page');
    assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
  }
});
test('edge allows verified users and prevents caching protected content', async () => {
  const response = await edge({ id: 'member' })(new Request('https://example.com/data/sets.json'), { next: async () => new Response('questions') });
  assert.equal(await response.text(), 'questions');
  assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
});
test('edge fails closed on verification errors', async () => {
  assert.equal((await edge(null, true)(new Request('https://example.com/data/sets.json'), {})).status, 503);
});
test('public access dependencies and Identity endpoints remain reachable', async () => {
  for (const path of ['/login.html', '/js/login.js', '/js/auth-bundle.js', '/css/auth.css', '/.netlify/identity/authorize']) {
    assert.equal(await edge(null, true)(new Request('https://example.com' + path), {}), undefined);
  }
});
test('session endpoint only returns server-verified membership', async () => {
  assert.equal((await edge(null)(new Request('https://example.com/auth/session'), {})).status, 401);
  const response = await edge({ id: 'member' })(new Request('https://example.com/auth/session'), {});
  assert.deepEqual(await response.json(), { user: { id: 'member' } });
});
