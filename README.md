# EPS-TOPIK Practice

Static EPS practice exams with invite-only Netlify Identity and Google OAuth.
The exam scripts, question data, timer, result calculation, and Korean TTS are unchanged.

## Netlify setup (required before use)

1. Enable Identity under Project configuration > Identity.
2. Set Registration preferences to **Invite only**. Do not enable open registration.
3. Under Registration > External providers, enable **Google**. Configure provider credentials if the dashboard requires them.
4. Invite each authorized user's exact Google account email under Identity > Users.
5. Deploy from Git using `npm run build`, publish directory `dist`, and Node 22.
   Deploy the project including `netlify/edge-functions`, not just a drag-and-drop static folder.
6. Test with a fresh invited Google account and a different, uninvited Google account in separate private browser sessions.

Users open the site and select **Continue with Google** using their invited account.
Invitation URLs display the same Google access page; no invitation password is created.
Netlify enforces invite eligibility when the OAuth account registers. Existing password users
may require provider/account linking; verify with a test account before migrating students.
Do not enable open registration to work around an account-linking or invitation error.

Google OAuth replaces the site's password UI. Existing Identity credentials are not deleted
or disabled by this code; account/provider settings remain under administrator control.
Google may ask users to authenticate to Google itself.

## Build and checks

```sh
npm ci
npm test
npm run build
```

The build creates `dist/js/auth-bundle.js` from `js/auth-entry.js` and copies only site assets
to `dist`. `node_modules`, tests, source configuration, and Edge Function code are not published.
The committed legacy bundle was removed. Dependencies are pinned and the lockfile is retained.
Unit tests mock the provider/runtime; they do not prove a live Google or Netlify exchange.
Use an HTTPS Netlify deployment for the end-to-end checks.

## Access boundary

`netlify/edge-functions/private-access.js` checks Netlify Identity on every protected request.
Only the access page, its dependencies, and Identity endpoints are public. Unauthenticated
HTML requests receive the access page via a rewrite, preserving callback URL fragments.
Unauthenticated JSON, images, exam scripts, and other private paths return 401.
Authenticated content is marked `private, no-store`. The `/auth/session` endpoint verifies
membership before application scripts initialize; a client storage flag never grants access.

`/data/sets.json` is protected **on a Netlify deployment with the Edge Function active**.
A plain static file server, GitHub Pages, or uploading only `dist` without the Edge Function
does not provide this protection. Previously downloaded files cannot be recalled, and an
authorized student can still copy content. Previously public deployment URLs must also be
considered when protecting an existing question bank.

Identity is the account authority. Invite-only registration is a required dashboard setting.
Removing an account/role is not a guarantee of instant revocation of every already-issued
session token. Test provider revocation behavior before relying on immediate lockout.

## Live acceptance checklist

- With no session, `/`, `/index.html`, `/test.html`, and `/result.html` show private access.
- `/data/sets.json`, a question JSON and a question image return 401 with no session.
- An invited Google account completes OAuth; an uninvited account is refused.
- OAuth return fragments are processed before navigation and removed from the URL.
- A requested test destination survives the provider round trip.
- Refreshing a protected page works with a valid session.
- Logout blocks subsequent protected requests; failed logout displays an error.
- A cancelled/invalid callback displays a retryable error without a redirect loop.

## References

- https://docs.netlify.com/security/secure-access-to-sites/identity/registration-login/
- https://docs.netlify.com/manage/security/secure-access-to-sites/identity/use-identity-in-functions/
