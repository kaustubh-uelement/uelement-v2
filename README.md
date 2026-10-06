# UElement Website (Next.js + Cloudflare Pages + R2)

This project is a static-exported Next.js site deployed on Cloudflare Pages, with image assets served from an R2 bucket.

## Current architecture

- App domain: `https://uelement.co`
- Image bucket: `uelement-images` (R2)
- Optional image domain: `https://images.uelement.co`
- Next.js output mode: `output: 'export'`
- Pages Function route: `/images/*` via `functions/images/[[path]].js`

The app code uses paths like `/images/...`. Those requests are handled by the Cloudflare Pages Function and fetched from R2.

## What was changed in code

- Hardened image function: [`functions/images/[[path]].js`](/home/satrajit/Documents/Development/uelement-website-next/functions/images/[[path]].js)
  - Handles both R2 key styles:
    - `landing/hero.webp`
    - `images/landing/hero.webp`
  - Adds long-lived cache headers.
  - Adds permissive CORS header for cross-domain image embedding.
- Fixed relative image paths in [`components/resources/KnowledgeHub.jsx`](/home/satrajit/Documents/Development/uelement-website-next/components/resources/KnowledgeHub.jsx)
  - Changed `images/...` to `/images/...` so nested routes do not break.
- Updated Wrangler config in [`wrangler.toml`](/home/satrajit/Documents/Development/uelement-website-next/wrangler.toml)
  - Added `compatibility_date`.
  - Added `preview_bucket_name`.

## Required Cloudflare settings

## 1) Pages project

- Framework build command: `npm run build`
- Build output directory: `out`
- Deploy using Wrangler or Git integration.
- If using Direct Upload from dashboard drag-and-drop, `functions/` is not compiled.

In Pages project settings:

- Go to `Settings -> Functions -> R2 bucket bindings`
- Add binding:
  - Variable name: `IMAGE_BUCKET`
  - Bucket: `uelement-images`

## 2) R2 bucket

- Bucket `uelement-images` must have all required files.
- Object keys are case-sensitive.
- Recommended key structure for this codebase:
  - `landing/...`
  - `global/...`
  - `service/...`
  - `resources/...`
  - `company/...`
- Supported fallback in code also allows `images/landing/...` style keys.

## 3) DNS and custom domains

- `uelement.co` should point to your Cloudflare Pages project.
- `images.uelement.co` should be attached as a custom domain on bucket `uelement-images`.
- Verify `images.uelement.co` custom domain status:
  - Ownership: `active`
  - SSL: `active`

## 4) Cache/CORS (recommended)

- R2 custom domain can return CORS based on bucket CORS policy.
- Add a bucket CORS rule for `GET`, `HEAD` with origin `https://uelement.co`.
- Purge cache after changing CORS or image contents.

## Deployment steps

1. Install dependencies

```bash
npm install
```

2. Build static output

```bash
npm run build
```

3. Deploy Pages output (with Functions)

```bash
npm run deploy
```

`npm run deploy` runs:

```bash
npm run build && wrangler pages deploy out
```

Run this command from repo root so Wrangler uploads `out/` and includes `functions/`.

## Image troubleshooting checklist

Use this exact sequence:

1. Check if an image exists via main domain function route:
   - `https://uelement.co/images/landing/hero_bg1.webp`
2. Check if image exists via R2 custom domain:
   - `https://images.uelement.co/landing/hero_bg1.webp`
3. If #2 works but #1 fails:
   - Missing/incorrect Pages R2 binding `IMAGE_BUCKET`
   - Function not deployed (often due dashboard drag-and-drop upload)
4. If both fail:
   - Object key missing or wrong case/path in R2
5. If only some pages fail:
   - Look for relative image paths like `images/...` (without leading `/`)
6. Purge Cloudflare cache and retest.

## Optional pattern: serve directly from `images.uelement.co`

If you want to bypass `/images/*` function routing entirely, you can switch URLs in code to absolute URLs:

- From: `/images/landing/hero_bg1.webp`
- To: `https://images.uelement.co/landing/hero_bg1.webp`

If you do this, keep CORS and cache headers configured on the R2 custom domain.

## Guidelines for adding new images

1. Keep file names lowercase and kebab/underscore only.
2. Avoid spaces in file names.
3. Upload with stable folder layout (`landing/`, `resources/`, etc.).
4. Prefer modern formats (`.webp`, optimized `.png`, `.svg` when vector).
5. After replacing existing objects, purge cache.

## Useful Cloudflare references

- Pages Functions get started:
  - https://developers.cloudflare.com/pages/functions/get-started/
- Pages Functions routing:
  - https://developers.cloudflare.com/pages/functions/routing/
- Pages Direct Upload behavior (`functions/` caveat):
  - https://developers.cloudflare.com/pages/get-started/direct-upload/
- R2 CORS configuration:
  - https://developers.cloudflare.com/r2/buckets/cors/
