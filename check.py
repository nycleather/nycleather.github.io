#!/usr/bin/env python3
"""Check the built static site and print payload sizes."""

import gzip
import re
import sys
from pathlib import Path

root = Path(__file__).resolve().parent
dist = root / "dist"
html = (dist / "index.html").read_text()
css = (dist / "styles.css").read_text()
player = (dist / "player.js").read_text()
page404 = (dist / "404.html").read_text()
errors = []


def fail(message):
    errors.append(message)


required = [
    "NYC",
    "Leather Repair",
    "205 West 57th Street",
    "New York, NY",
    "Between 7th Avenue and Broadway",
    "Near Carnegie Hall",
    "Jorge Bacuilima",
    "Resoling, heels, stretching, and full restorations. Bring the pair you can't replace.",
    "Zippers, hardware, straps, cleaning and conditioning.",
    "Shoe shines, sneaker and suede cleaning, conditioning, and dyeing for shoes and bags.",
    "Boot zippers, briefcases, and sports gear like baseball glove restringing.",
    "Monday to Friday, 7:30 AM to 6:30 PM",
    "Saturday, 10 AM to 5 PM",
    "Sole shaping",
    "Sole finishing",
    "The Studio",
    "Owner and craftsman",
    "Repairing all things leather on West 57th Street.",
    "Role TBD",
    "Bryce Villanueva",
    "Friend of the Studio &amp; Webmaster",
    "Unpaid intern, by choice.",
    "tel:+12122652108",
    "212-265-2108",
    'Designed by <a href="https://mechaturtles.com" rel="noopener">mechaturtles.com</a>',
    "205+West+57th+Street",
    'rel="canonical" href="https://leatherstudio.nyc/"',
    "Workshop interior at NYC Leather Repair",
    "Hands cutting a piece of material beside a shoe",
    "A worker holding a shoe to a finishing machine",
    'data-src="/media/videos/sole-trimming.mp4"',
    'data-src="/media/videos/sole-finishing.mp4"',
]
for text in required:
    if text not in html:
        fail(f"index.html missing {text}")

for banned in ("Website preview", "Draft for review", "noindex", "nofollow", "Photo to be added", "\u2014", "Sunday", "$"):
    if banned in html:
        fail(f"index.html still contains {banned}")
if "<video" in html.lower():
    fail("video element is in the initial HTML")
if re.search(r'<script(?![^>]+src="/player\.js")', html):
    fail("unexpected script in index.html")
if html.count('src="/player.js"') != 1:
    fail("player.js should be included once")
if re.search(r"grok", html, re.I):
    fail("unexpected credit in index.html")
if html.count("Team Member") != 2 or html.count(">Placeholder<") != 2:
    fail("expected two placeholder team cards")
if "nycleatherrepair.com" in html:
    fail("old domain appeared in index.html")

if (dist / "CNAME").read_text().strip() != "leatherstudio.nyc":
    fail("CNAME is not leatherstudio.nyc")
if not (dist / ".nojekyll").is_file():
    fail("missing .nojekyll")
if "noindex, nofollow" not in page404:
    fail("404 is missing noindex")
if "video.src" not in player or "data-src" not in player:
    fail("player.js does not assign data-src on click")
if "autoplay" in player or "preload" in html.lower() and ".mp4" in html.split("preload", 1)[-1][:80]:
    pass
if re.search(r"\.mp4", html) and not re.search(r'data-src="/media/videos/[^"]+\.mp4"', html):
    fail("mp4 reference is not a data-src")
for match in re.finditer(r'(?<![\w-])(?:src|href)="([^"]+\.mp4)"', html):
    fail(f"mp4 is fetchable from {match.group(0)}")

lazy_images = re.findall(r"<img\b[^>]*>", html)
if len(lazy_images) != 5:
    fail(f"expected 5 images, found {len(lazy_images)}")
for tag in lazy_images:
    if "loading=\"lazy\"" not in tag:
        fail(f"image is not lazy: {tag[:80]}")
    if not re.search(r'width="\d+"', tag) or not re.search(r'height="\d+"', tag):
        fail("image missing width or height")

photos = [
    "media/photos/workshop-800.webp",
    "media/photos/workshop-1600.webp",
    "media/photos/hands-cutting-800.webp",
    "media/photos/hands-cutting-1600.webp",
    "media/photos/finishing-machine-800.webp",
    "media/photos/finishing-machine-1600.webp",
    "media/videos/sole-trimming.webp",
    "media/videos/sole-finishing.webp",
    "media/videos/sole-trimming.mp4",
    "media/videos/sole-finishing.mp4",
]
for relative in photos:
    path = dist / relative
    if not path.is_file():
        fail(f"missing {relative}")
        continue
    size = path.stat().st_size
    limit = 1_600_000 if path.suffix == ".mp4" else 180_000
    if size > limit:
        fail(f"{relative} is {size} bytes, over {limit}")

refs = []
for document in (html, css, page404, player):
    refs.extend(re.findall(r'(?:href|src|url)\((?:"|\')?(/[^"\')\s]+)', document))
    refs.extend(re.findall(r'(?:href|src)="(/[^"]+)"', document))

seen = []
raw = gzip_total = 0
for ref in refs:
    path = ref.split("?", 1)[0]
    if path in seen or path.endswith("/") or path.startswith("http"):
        continue
    seen.append(path)
    file_path = dist / path.lstrip("/")
    if not file_path.is_file():
        fail(f"missing asset {path}")
        continue
    if path.endswith(".mp4"):
        continue
    data = file_path.read_bytes()
    if 'loading="lazy"' in html and path.startswith("/media/"):
        continue
    raw += len(data)
    gzip_total += len(gzip.compress(data, 9))

html_bytes = html.encode()
raw += len(html_bytes)
gzip_total += len(gzip.compress(html_bytes, 9))
if raw > 200_000:
    fail(f"initial raw bytes {raw} exceed 200000")

print(f"initial_requests={len([p for p in seen if not p.startswith('/media/')]) + 1}")
print(f"initial_raw_bytes={raw}")
print(f"initial_gzip_bytes={gzip_total}")
print(f"photo_bytes={sum((dist / p).stat().st_size for p in photos if p.endswith('.webp') and '/photos/' in p)}")
print(f"poster_bytes={sum((dist / p).stat().st_size for p in photos if p.endswith('.webp') and '/videos/' in p)}")
print(f"video_bytes={sum((dist / p).stat().st_size for p in photos if p.endswith('.mp4'))}")

if errors:
    print("\n".join(errors), file=sys.stderr)
    sys.exit(1)
