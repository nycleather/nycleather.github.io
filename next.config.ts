import type { NextConfig } from "next";

// Empty by default so the site is served from the root of a user
// GitHub Pages site (https://nycleather.github.io/). Set
// NEXT_PUBLIC_BASE_PATH when the site must live under a subpath.
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
