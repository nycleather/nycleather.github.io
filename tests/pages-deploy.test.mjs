import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(join(root, path), "utf8");

test("root Pages files and canonical CNAME", () => {
  assert.equal(read("CNAME").trim(), "leatherstudio.nyc");
  assert.equal(statSync(join(root, ".nojekyll")).isFile(), true);
  assert.equal(statSync(join(root, "_next")).isDirectory(), true);
  const home = read("index.html");
  assert.match(home, /noindex, nofollow/);
  assert.match(home, /Website preview/);
  assert.match(home, /Draft for review/);
  assert.match(home, /Photo to be added/);
  assert.equal(/bryce|grok/i.test(home), false);
  assert.equal(home.includes("nycleatherrepair.com"), false);
  const css = home.match(/href="(\/_next\/static\/css\/[^"]+\.css)"/);
  assert.ok(css);
  assert.equal(statSync(join(root, css[1].slice(1))).isFile(), true);
  const readme = read("README.md");
  assert.match(readme, /185\.199\.108\.153/);
  assert.match(readme, /2606:50c0:8000::153/);
  assert.match(readme, /_github-pages-challenge-nycleather\.leatherstudio\.nyc/);
  assert.match(readme, /not live/);
});
