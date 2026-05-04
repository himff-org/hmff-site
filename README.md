# Hawaii Mobile Food Foundation — site

Astro 5 + Tailwind v4 static site for `hawaiimobilefoodfoundation.org`. Hosted on GitHub Pages.

## Local dev

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # outputs to ./dist
npm run preview      # serves the built site
```

## Environment (optional)

Create `.env` for production form/donate wiring:

```env
PUBLIC_FORMSPREE_VENDOR=https://formspree.io/f/<id>
PUBLIC_FORMSPREE_DONOR=https://formspree.io/f/<id>
PUBLIC_STRIPE_DONATE_URL=https://donate.stripe.com/<id>
```

Without these, forms fall back to `mailto:hello@hawaiimobilefoodfoundation.org` and the Donate button anchors to `#support`.

## Deploy

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on push to `main`. Make sure:

1. Repo Settings → Pages → Source = **GitHub Actions**
2. Custom domain set to `hawaiimobilefoodfoundation.org`, "Enforce HTTPS" enabled after DNS propagates
3. DNS at registrar:
   - apex `A` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - apex `AAAA` → `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `www` `CNAME` → `himff-org.github.io`

`public/CNAME` is shipped with every build, so don't remove it.

## Content

Programs and vendor voices live in `src/content/programs/*.md` and `src/content/voices/*.md`. Edit those frontmatter fields rather than hardcoded copy.

## Verification screenshots

```bash
npm run dev   # in another terminal
node scripts/screenshot.mjs   # writes to /tmp/hmff-screens
```
