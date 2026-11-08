#!/usr/bin/env python3
"""Check the built static site and print first-load sizes."""

import gzip
import re
import sys
from pathlib import Path

root = Path(__file__).resolve().parent
dist = root / "dist"
required = [
    "Website preview",
    "Draft for review",
    "NYC",
    "Leather Repair",
    "205 West 57th Street",
    "New York, NY",
    "Between 7th Avenue and Broadway",
    "Near Carnegie Hall",
    "Jorge Bacuilima",
    "Shoe repair &amp; restoration",
    "Resoling",
    "Heel replacement",
    "Cleaning &amp; polishing",
    "Dyeing &amp; stretching",
    "Handbag &amp; luggage repair",
    "Leather care",
    "Photo to be added",
    "Storefront",
    "Workshop",
    "At the bench",
    "Call the shop to ask about hours.",
    "tel:+12122652108",
    "212-265-2108",
    "205+West+57th+Street",
    "noindex, nofollow",
]

errors = []


def fail(message):
    errors.append(message)


html = (dist / "index.html").read_text()
for text in required:
    if text not in html:
        fail(f"index.html missing {text}")
if html.count("Photo to be added") != 3:
    fail("expected 3 photo placeholders")
if "<script" in html.lower():
    fail("index.html includes a script")
if "nycleatherrepair.com" in html or "leatherstudio.nyc" in html:
    fail("homepage should not claim a domain in the document")
if re.search(r"bryce|grok", html, re.I):
    fail("unexpected credit in index.html")

cname = (dist / "CNAME").read_text().strip()
if cname != "leatherstudio.nyc":
    fail(f"CNAME is {cname!r}")
if not (dist / ".nojekyll").is_file():
    fail("missing .nojekyll")

page404 = (dist / "404.html").read_text()
if "noindex, nofollow" not in page404:
    fail("404 is missing noindex")

js = [path for path in dist.rglob("*") if path.suffix == ".js"]
if js:
    fail(f"javascript in dist: {js}")

refs = []
for document in (html, (dist / "styles.css").read_text(), page404):
    refs.extend(re.findall(r'(?:href|src|url)\((?:"|\')?(/[^"\')\s]+)', document))
    refs.extend(re.findall(r'(?:href|src)="(/[^"]+)"', document))

seen = []
raw = gzip_total = 0
for ref in refs:
    path = ref.split("?", 1)[0]
    if path in seen or path.endswith("/"):
        continue
    seen.append(path)
    file_path = dist / path.lstrip("/")
    if not file_path.is_file():
        fail(f"missing asset {path}")
        continue
    data = file_path.read_bytes()
    raw += len(data)
    gzip_total += len(gzip.compress(data, 9))

html_bytes = (dist / "index.html").read_bytes()
raw += len(html_bytes)
gzip_total += len(gzip.compress(html_bytes, 9))

if raw > 200_000:
    fail(f"first-load raw bytes {raw} exceed 200000")

print(f"requests={len(seen) + 1}")
print(f"raw_bytes={raw}")
print(f"gzip_bytes={gzip_total}")
print(f"js_files={len(js)}")

if errors:
    print("\n".join(errors), file=sys.stderr)
    sys.exit(1)
