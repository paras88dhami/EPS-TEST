(() => {
  const button = document.getElementById('googleButton');
  const message = document.getElementById('message');
  function showError(text) {
    message.textContent = text;
    message.className = 'auth-message auth-error';
  }
  button.addEventListener('click', async () => {
    button.disabled = true;
    message.className = 'auth-message';
    message.textContent = 'Opening Google…';
    try { await window.epsAuth.continueWithGoogle(); }
    catch (error) { showError(error.message || 'Unable to open Google. Please try again.'); button.disabled = false; }
  });
  (async () => {
    try {
      if (!window.epsAuth) throw new Error('Unable to load access services. Please refresh.');
      const callback = await window.epsAuth.processAuthCallback();
      const user = await window.epsAuth.getCurrentUser();
      if (user) { location.replace(window.epsAuth.destination()); return; }
      if (callback?.type === 'oauth') throw new Error('Access could not be verified. Please contact your administrator.');
      message.textContent = callback?.type === 'invitation-notice'
        ? 'Continue with your invited Google account to access the practice tests.'
        : 'Continue with your invited Google account.';
    } catch (error) { showError(error.message || 'Unable to check access. Please try again.'); }
    button.disabled = !window.epsAuth;
  })();
})();
