Project notes for uploading to GitHub

What to commit
- App source under `src/`
- Config files: `package.json`, `tsconfig.json`, `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`, `index.html`, and Supabase SQL under `supabase/`
- `.env.example` only (never the real `.env`)

What NOT to commit (already ignored via .gitignore)
- `node_modules/`, `dist/`, `.vite/`, OS/editor files, logs

Setup steps
1) git init
2) git add .
3) git commit -m "init"
4) git branch -M main
5) git remote add origin https://github.com/<your-account>/<repo>.git
6) git push -u origin main

If you saw errors uploading via browser UI
- Browser upload has a 100-file cap and 25 MB per-file limit; use git CLI instead.
- Ensure `node_modules/` and `dist/` are excluded (this repo already ignores them).

