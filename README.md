# Portfolio (static Next.js) — Renako

This project is a static Next.js portfolio that:
- Reads the featured project section from a remote README (raw) and lists projects.
- Supports dark/light theme with persistence.
- Provides framer-motion animations.
- Provides a simple i18n system (PT/EN) with JSON files and automatic language detection.
- Exportable with `next export` to run on GitHub Pages.

How to run locally
1. Install dependencies:
   npm install

2. Run in development:
   npm run dev
   Open http://localhost:3000

How to build & export for GitHub Pages
1. (Optional) Set NEXT_PUBLIC_BASE_PATH to "/me" if publishing under https://<user>.github.io/me
2. Build and export:
   npm run export
   The static site will be in the `out/` folder.

3. Deploy:
   - Use `npm run deploy` (requires gh-pages package and write permission), or
   - Push `out/` to the gh-pages branch manually, or use the included GitHub Actions workflow.

Notes
- There are no server API routes — parsing happens on the client for refreshs, so the exported site works on GitHub Pages.
- If raw.githubusercontent.com becomes blocked by CORS, consider using the GitHub API with a token (requires serverless or a different hosting).