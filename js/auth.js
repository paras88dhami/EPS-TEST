(() => {
  const LOGIN_PAGE = 'login.html';
  const IDENTITY_HASH = /(?:^|&)(?:invite_token|confirmation_token|recovery_token)=/;

  function getUser() {
    if (!window.netlifyIdentity) {
      return null;
    }

    return window.netlifyIdentity.currentUser();
  }

  function redirectToLogin() {
    const currentPage =
      window.location.pathname.split('/').pop() || 'index.html';
    const hashValue = window.location.hash.slice(1);
    const identityHash = IDENTITY_HASH.test(hashValue)
      ? window.location.hash
      : '';
    const destination =
      currentPage +
      window.location.search +
      (identityHash ? '' : window.location.hash);

    window.location.replace(
      `${LOGIN_PAGE}?redirect=${encodeURIComponent(destination)}${identityHash}`
    );
  }

  function protectPage() {
    if (!window.netlifyIdentity) {
      console.error('Netlify Identity failed to load.');
      redirectToLogin();
      return false;
    }

    window.netlifyIdentity.init();

    if (!getUser()) {
      redirectToLogin();
      return false;
    }

    document.documentElement.classList.add('authenticated');
    return true;
  }

  function logout() {
    if (!window.netlifyIdentity) {
      window.location.replace(LOGIN_PAGE);
      return;
    }

    window.netlifyIdentity.logout().then(() => {
      window.location.replace(LOGIN_PAGE);
    });
  }

  window.epsAuth = {
    getUser,
    protectPage,
    logout
  };
})();
