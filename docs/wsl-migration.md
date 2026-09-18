# WSL migration — 2026-09-18

The user authorized moving this project from Windows to WSL Ubuntu. The active checkout is `/home/shlee/Workspace/ai/01.codex/sj_company`; Orca uses the Ubuntu WSL runtime. The original Windows tree is retained at `D:\Workspace\ai\01.codex.windows-backup-20260918\sj_company` for rollback, not ongoing work.

Node 22.23.2 is installed under the Linux user home. Windows node_modules and build caches were not copied. package-lock.json now contains the previously missing platform optional dependencies; versions of existing locked packages and package.json were preserved. Linux dependencies were installed and the entire `npm run verify` passed: ESLint, TypeScript, 8 unit/component tests, production build, and 20 Desktop/Mobile Chromium E2E tests.

Run `npm run dev` from this directory to start development. Keep verification on Playwright's existing port 3100. Existing jsdom navigation warnings were non-failing. No application code, commits, or pushes were made.
