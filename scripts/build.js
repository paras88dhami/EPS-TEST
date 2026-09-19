import { build } from 'esbuild';
import { cp, mkdir } from 'node:fs/promises';

// Publish only site artifacts; keep dependencies and server sources outside dist.
await mkdir('dist/js', { recursive: true });
for (const path of ['index.html', 'login.html', 'test.html', 'result.html', 'css', 'assets', 'data']) {
  await cp(path, `dist/${path}`, { recursive: true });
}
for (const file of ['sets.js', 'test.js', 'result.js', 'tts.js', 'login.js']) {
  await cp(`js/${file}`, `dist/js/${file}`);
}
await build({ entryPoints: ['js/auth-entry.js'], bundle: true, format: 'iife', outfile: 'dist/js/auth-bundle.js' });
