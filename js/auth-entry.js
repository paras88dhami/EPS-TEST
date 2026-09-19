import {
  getUser,
  login,
  logout,
  handleAuthCallback,
  acceptInvite
} from '@netlify/identity';

const LOGIN_PAGE = '/login.html';
const CALLBACK_HASH = /(?:^|&)(?:invite_token|confirmation_token|recovery_token)=/;

function safeRedirectTarget() {
  const target = new URLSearchParams(window.location.search).get('redirect');

  if (!target) return '/index.html';

  try {
    const url = new URL(target, window.location.origin);
    const allowedPages = ['/index.html', '/test.html', '/result.html'];

    if (url.origin !== window.location.origin || !allowedPages.includes(url.pathname)) {
      return '/index.html';
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return '/index.html';
  }
}

function redirectToLogin() {
  const hashValue = window.location.hash.slice(1);
  const callbackHash = CALLBACK_HASH.test(hashValue) ? window.location.hash : '';
  const destination =
    window.location.pathname +
    window.location.search +
    (callbackHash ? '' : window.location.hash);

  window.location.replace(
    `${LOGIN_PAGE}?redirect=${encodeURIComponent(destination)}${callbackHash}`
  );
}

async function protectPage() {
  try {
    const user = await getUser();

    if (!user) {
      redirectToLogin();
      return null;
    }

    document.documentElement.classList.add('authenticated');
    return user;
  } catch (error) {
    console.error('Authentication check failed:', error);
    window.location.replace(LOGIN_PAGE);
    return null;
  }
}

async function signIn(email, password) {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail || !password) {
    throw new Error('Please enter your email and password.');
  }

  return await login(cleanEmail, password);
}

async function signOut() {
  try {
    await logout();
  } finally {
    window.location.replace(LOGIN_PAGE);
  }
}

async function checkExistingSession() {
  return await getUser();
}

async function processAuthCallback() {
  return await handleAuthCallback();
}

async function completeInvitation(token, password) {
  if (!token) {
    throw new Error('The invitation token is missing.');
  }

  if (!password || password.length < 6) {
    throw new Error('Please create a password with at least 6 characters.');
  }

  return await acceptInvite(token, password);
}

window.epsAuth = {
  protectPage,
  signIn,
  signOut,
  checkExistingSession,
  processAuthCallback,
  completeInvitation,
  safeRedirectTarget
};
