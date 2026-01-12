/** @type {import('next').NextConfig} */
/*
  Configure Next.js to produce a fully static export (next export).
  When publishing to GitHub Pages under a repo path (e.g. /me),
  set NEXT_PUBLIC_BASE_PATH secret to "/me" in repository secrets.
*/
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  output: "export", // required for static export (next export)
  basePath: basePath || undefined,
  assetPrefix: assetPrefix || undefined,
};

module.exports = nextConfig;