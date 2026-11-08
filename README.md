# NYC Leather Repair — website preview

Website preview for NYC Leather Repair. Draft for review, not a final launched site.

The page is a storefront sign: a mustard board with a black frame, “NYC” in serif, and “LEATHER REPAIR” in block letters. Address, phone, and directions sit under the sign. Services use the black-and-cream board. Shop photographs are not included.

## GitHub Pages at the site root

This build is for the free user site, `https://nycleather.github.io/`, with no custom domain.

Published files belong at the repository root, not in a subfolder. `index.html` sits next to `_next/`. The empty root `.nojekyll` file turns Jekyll off so Pages serves `_next/`.

```bash
npm ci
npm run build
npm test
```

`out/` is the static export and is not committed. The committed root HTML and `_next/` are the approved export. Copy the contents of `out/` back to the repository root only when replacing that export, and keep `.nojekyll`. Do not commit `node_modules`, `.next`, or `out/`.

Leave `NEXT_PUBLIC_BASE_PATH` unset. The export uses root paths for `https://nycleather.github.io/`.

Do not add a `CNAME` file. Do not set a custom domain or DNS records in this repository. `leatherstudio.nyc` is a separate pending domain and is not configured here.

## Run locally

```bash
npm ci
npm run dev
```

Open the local address Next.js prints. With the default empty base path, the page is at `/`.

To review the committed export instead, serve the repository root:

```bash
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173/`.

## Add a photograph

1. Put the file in `public/photos/` (jpg, png, or webp).
2. In `src/content/site.ts`, set that slot’s `src` to the public path, for example `src: "/photos/storefront.jpg"`.

Until `src` is set, the frame says “Photo to be added.”

## What this concept leaves out

No booking form, hours, prices, reviews, or social links for the shop. Call `212-265-2108` and the directions link are the only shop actions. The preview, “Draft for review”, and `noindex` labels stay as they are.
