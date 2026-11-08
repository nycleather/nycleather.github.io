# NYC Leather Repair — website preview

Website preview for NYC Leather Repair. Draft for review, not a final launched site.

The page is a storefront sign: a mustard board with a black frame, “NYC” in serif, and “LEATHER REPAIR” in block letters. Address, phone, and directions sit under the sign. Services use the black-and-cream board. Shop photographs are not included.

## GitHub Pages at the site root

This build is for the free user site `https://nycleather.github.io/`. Published files belong at the repository root, not in a subfolder. `index.html` sits next to `_next/`. The root `.nojekyll` file is what stops Jekyll from hiding `_next/`.

```bash
npm install
npm run build
npm test
```

`out/` is the static export and is not committed. The committed root HTML and `_next/` are the approved export. Copy `out/` back to the root only when replacing that export, and keep `CNAME` and `.nojekyll`.

To build for a subpath instead, set `NEXT_PUBLIC_BASE_PATH` (no trailing slash) and run `npm run build` again. Leave it unset for this site.

## Custom domain prepared, not live

Canonical domain: `leatherstudio.nyc`, and only that name, in the root `CNAME` file. `www` is not included. `nycleatherrepair.com` is not part of this site.

Nothing here changes public DNS. The custom domain is not live. Point DNS at GitHub only after this file is on `main` and Settings → Pages shows `leatherstudio.nyc`. The owner confirms branch `main`, folder `/`, and that custom domain. `PUT /repos/{owner}/{repo}/pages` can set it, and it requires a repository admin. The verification TXT value is not in the Pages API. The owner copies it from profile Settings → Pages → Add a domain.

TXT host, added with the other records only after that claim:

`_github-pages-challenge-nycleather.leatherstudio.nyc`

Apex `A` records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.

Apex `AAAA` records: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

Or one `ALIAS` or `ANAME` to `nycleather.github.io`. No wildcard. Enforce HTTPS for the custom domain only after GitHub issues the certificate.

## Run locally

```bash
npm install
npm run dev
```

Open the local address Next.js prints. With the default empty base path, the page is at `/`.

## Add a photograph

1. Put the file in `public/photos/` (jpg, png, or webp).
2. In `src/content/site.ts`, set that slot’s `src` to the public path, for example `src: "/photos/storefront.jpg"`.

Until `src` is set, the frame says “Photo to be added.”

## What this concept leaves out

No booking form, hours, prices, reviews, or social links for the shop. Call `212-265-2108` and the directions link are the only shop actions. The preview, “Draft for review”, and `noindex` labels stay as they are.
