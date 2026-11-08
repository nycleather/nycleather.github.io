# NYC Leather Repair

Public page for NYC Leather Repair. `index.html` and `styles.css` are the source. `player.js` only starts a video after a click. `sh build.sh` copies the page, fonts, `media/`, `icon.svg`, `404.html`, `CNAME`, and `.nojekyll` into `dist/`. `dist/` is not committed.

The canonical URL is `https://leatherstudio.nyc/`. This repository does not change DNS, and it does not show that an HTTPS certificate is active.

```bash
sh build.sh
python3 check.py
```

Pull requests run that check only. A push to `main` is what uploads `dist/` and deploys GitHub Pages.

## Pages setting

The repository currently publishes from the `main` branch at `/`. These root files keep that working. To let the Pages workflow be the publisher, an owner changes Settings → Pages → Build and deployment → Source to **GitHub Actions**, then re-runs the failed Pages workflow if the first one ran before the switch.

`https://nycleather.github.io/` remains the default host. `leatherstudio.nyc` is not live. The root `CNAME` file is only that name, for the current branch publishing. A GitHub Actions deploy ignores `CNAME`; after the source is GitHub Actions, the owner sets the custom domain to `leatherstudio.nyc` in Pages settings. `PUT /repos/{owner}/{repo}/pages` can do that and requires an admin. This token cannot. Do not point DNS at GitHub until that custom domain is set.

Apex `A` records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.

Apex `AAAA` records: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

Or one `ALIAS` or `ANAME` to `nycleather.github.io`. No wildcard. The verification TXT host is `_github-pages-challenge-nycleather.leatherstudio.nyc`. The owner copies the value from profile Settings → Pages → Add a domain. Enforce HTTPS for the custom domain after the certificate exists. `nycleatherrepair.com` is not part of this site.

## Shop media

Three photographs: `workshop`, `hands-cutting`, and `finishing-machine`. Two reviewed clips, `sole-trimming` and `sole-finishing`, with WebP posters. The later preferred clip and the black-shoe photograph are not in this repository.
