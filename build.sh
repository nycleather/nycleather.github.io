#!/bin/sh
set -eu
cd "$(dirname "$0")"
rm -rf dist
mkdir -p dist/fonts dist/media/photos dist/media/videos
cp index.html styles.css player.js icon.svg 404.html CNAME .nojekyll dist/
cp fonts/*.woff2 fonts/LICENSE-barlow.txt fonts/LICENSE-libre-baskerville.txt dist/fonts/
cp media/photos/* dist/media/photos/
cp media/videos/* dist/media/videos/
