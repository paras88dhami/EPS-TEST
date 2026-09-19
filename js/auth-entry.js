import { getUser, getSettings, oauthLogin, logout, handleAuthCallback } from '@netlify/identity';

const DESTINATION_KEY = 'eps.oauth.destination';

function safeDestination(value) {
  try {
    const url = new URL(value || '/index.html', location.origin);
    if (url.origin === location.origin && ['/', '/index', '/index.html', '/test', '/test.html', '/result', '/result.html'].includes(url.pathname)) {
      return url.pathname + url.search;
    }
  } catch {}
  return '/index.html';
}

function destination() {
  const requested = new URLSearchParams(location.search).get('redirect');
  if (requested) return safeDestination(requested);
  try {
    const saved = sessionStorage.getItem(DESTINATION_KEY);
    if (saved) return safeDestination(saved);
  } catch {}
  return safeDestination(location.pathname + location.search);
}

async function getCurrentUser() {
  // Let the SDK restore/refresh its session, then verify it at the server boundary.
  await getUser();
  const response = await fetch('/auth/session', { cache: 'no-store', credentials: 'same-origin' });
  if (response.status === 401) return null;
  if (!response.ok) throw new Error('Unable to check access. Please try again.');
  return (await response.json()).user;
}

async function processAuthCallback() {
  const params = new URLSearchParams(location.hash.slice(1));
  if (!location.hash) return null;
  if (params.has('error') || params.has('error_description')) {
    history.replaceState(null, '', location.pathname + location.search);
    throw new Error('Google access was not completed. Use your invited Google account and try again.');
  }
  if (params.has('access_token')) {
    try { return await handleAuthCallback(); }
    finally { history.replaceState(null, '', location.pathname + location.search); }
  }
  // Invitations authorize the email in Identity. Google proves ownership;
  // never exchange a legacy invitation/recovery token for a password session.
  if (['invite_token', 'confirmation_token', 'recovery_token', 'email_change_token'].some(key => params.has(key))) {
    history.replaceState(null, '', location.pathname + location.search);
    return { type: 'invitation-notice' };
  }
  return null;
}

async function protectPage() {
  try {
    await processAuthCallback();
    const user = await getCurrentUser();
    if (user) {
      document.documentElement.classList.add('authenticated');
      return user;
    }
  } catch {}
  location.replace('/login.html?redirect=' + encodeURIComponent(safeDestination(location.pathname + location.search)));
  return null;
}

async function continueWithGoogle() {
  const settings = await getSettings();
  if (!settings.providers.google) throw new Error('Google access is not available yet. Please contact the administrator.');
  try { sessionStorage.setItem(DESTINATION_KEY, destination()); } catch {}
  try { oauthLogin('google'); }
  catch (error) {
    // Version 2.0.0 throws this sentinel after assigning the provider URL.
    if (error.message !== 'Redirecting to OAuth provider') throw error;
  }
}

async function signOut() {
  try {
    await logout();
    try { sessionStorage.removeItem(DESTINATION_KEY); } catch {}
    location.replace('/login.html');
  } catch {
    alert('Unable to log out. Please check your connection and try again.');
  }
}

window.epsAuth = { protectPage, getCurrentUser, processAuthCallback, continueWithGoogle, signOut, destination };
