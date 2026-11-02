# Cadence (v3.0) — Cycle, Intimacy & Body Literacy PWA

Designed for `https://github.com/builtbysai/cadence` and `https://builtbysai.com/cadence/`.

## Deploying to GitHub Pages (`builtbysai/cadence`)
All asset paths (`./styles.css`, `./app.js`, `./manifest.json`, `./sw.js`, `./icon.svg`) use relative subpath-safe references so the app runs cleanly at `https://builtbysai.com/cadence/` with zero build step required:

```bash
unzip cadence_pwa_bundle.zip
cd cadence_pwa
git init
git remote add origin https://github.com/builtbysai/cadence.git
git checkout -b main
git add .
git commit -m "Release Cadence v3.0 PWA"
git push -u origin main --force
```

Then enable **GitHub Pages** on the `main` branch (root `/`) in your repository settings.
