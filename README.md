# sj_company

Company website project prepared with a minimal Codex development harness.

## Requirements

- Node.js 22
- npm

## Commands

- `npm run dev`: start the development server
- `npm run lint`: run ESLint
- `npm run typecheck`: run TypeScript without emitting files
- `npm run test`: run Vitest in watch mode
- `npm run test:run`: run Vitest once
- `npm run build`: create a production build
- `npm run test:e2e`: run Playwright against an existing production build
- `npm run verify`: run the complete quality gate

## Development and verification servers

- View the site with `npm run dev` at `http://localhost:3000`.
- Run `npm run verify` for lint → typecheck → component tests → production build → E2E. The development server may remain running and is not required for verification.
- Playwright starts the production build at `http://127.0.0.1:3100` using `npm run start -- --hostname 127.0.0.1 --port 3100`, then stops that server. It never reuses an existing server. `npm run start` keeps its normal default behavior.
- If port 3000 or 3100 is occupied, identify and report the process; do not arbitrarily stop or restart another person's server. Agents clean up only processes they started.
- Installed Next.js 16.3.4 isolates development output in `.next/dev` and production output in `.next` by default. No additional `isolatedDevBuild` setting is needed; do not delete the running development server's output.

Confirmed product requirements and remaining decisions are recorded in `docs/product.md`.
