#!/bin/sh
set -eu
cd "$(dirname "$0")"
rm -rf dist
mkdir -p dist/fonts
cp index.html styles.css icon.svg 404.html CNAME .nojekyll dist/
cp fonts/*.woff2 fonts/LICENSE-barlow.txt fonts/LICENSE-libre-baskerville.txt dist/fonts/
