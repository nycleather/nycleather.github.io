import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(join(root, path), "utf8");

test("root Pages files stay on the github.io host", () => {
  assert.throws(() => statSync(join(root, "CNAME")), /ENOENT/);
  assert.equal(statSync(join(root, ".nojekyll")).isFile(), true);
  assert.equal(statSync(join(root, "_next")).isDirectory(), true);
  const home = read("index.html");
  assert.match(home, /noindex, nofollow/);
  assert.match(home, /Website preview/);
  assert.match(home, /Draft for review/);
  assert.match(home, /Photo to be added/);
  assert.equal(/bryce|grok/i.test(home), false);
  assert.equal(home.includes("leatherstudio.nyc"), false);
  assert.equal(home.includes("nycleatherrepair.com"), false);
  const css = home.match(/href="(\/_next\/static\/css\/[^"]+\.css)"/);
  assert.ok(css);
  assert.equal(statSync(join(root, css[1].slice(1))).isFile(), true);
  const readme = read("README.md");
  assert.match(readme, /https:\/\/nycleather\.github\.io\//);
  assert.match(readme, /Do not add a `CNAME` file/);
  assert.equal(readme.includes("185.199."), false);
  assert.equal(readme.includes("_github-pages-challenge-"), false);
});
