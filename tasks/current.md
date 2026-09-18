# TASK-015: Official Logo Header Integration

## Status

Implementation and local validation complete. 사용자 화면 승인 상태: **미확인**.

## Scope and Plan

Preserve the existing project and TASK-014 assets/evidence. Initial Git status is clean; TASK-014 is already recorded in HEAD `e2a42f4`, with no uncommitted intake changes. Capture the current production Header, add the official PNG beside `(주)승종` inside the existing Home link, verify responsive layout and keyboard behavior, then review before/after screenshots and run the complete verification pipeline.

Use the unchanged 171 × 167 PNG with proportional CSS sizing, no enlargement beyond native size, recoloring, cropping, background removal, or regeneration. Empty image alt avoids duplicating the adjacent company name; retain the Home link accessible name. Keep the Header as a Server Component and retain the existing navigation client boundary and dependencies.

## Out of Scope

Public IP UI, product images/specifications, Home exterior Hero, body copy, Footer, broad color/type changes, domain/SEO/deployment, Git staging/commit/push/rebase/reset/clean, and stopping or restarting user-owned servers. Do not start TASK-016.

## Acceptance Criteria

- [x] Official PNG loads correctly beside the visible company name; identity still navigates Home.
- [x] 320px and 390px keep identity/phone/menu on one row without overlap or horizontal overflow.
- [x] 768px and 1280px show usable horizontal English navigation with current-page indication.
- [x] Logo colors, background, shape, and 171:167 ratio remain intact at an appropriate Header size.
- [x] Phone link, touch targets, focus-visible, menu toggle/Escape/focus return/route dismissal, document-flow expansion, and skip-link/next Tab have no regression.
- [x] Approved mobile Home introduction CSS spacing remains unchanged.
- [x] Full `npm run verify` passes without deleted or skipped tests.
- [x] Desktop/Mobile before/after screenshots are directly reviewed and paths recorded.
- [x] User visual approval is explicitly recorded as 미확인.

## Validation

- Full `npm run verify` passed: lint, strict typecheck, 8 unit/component tests, production build, and 28 Desktop/Mobile Chromium E2E tests (20 existing + 8 Header viewport cases). No tests deleted, skipped, or weakened. Existing no-image assertions are scoped to page bodies and remain valid unchanged.
- First verification stopped at typecheck because the new Playwright test used an unsupported `getByRole` option. Replaced it with an `aria-current` selector; standalone typecheck passed, then the entire verification pipeline passed. Existing non-failing jsdom navigation and NO_COLOR/FORCE_COLOR warnings remain.
- PNG successfully decoded as 171 × 167 in the browser; rendered width 36px, proportional height approximately 35.16px. Next Image uses `unoptimized` to serve the exact approved PNG without format/color transformation. Both asset SHA-256 values still match TASK-014 evidence. Empty alt prevents repetition beside the visible name; existing `(주)승종 홈` link name and keyboard Home navigation passed.
- 320/390: identity, phone, and toggle share a centered row without overlap/overflow. Existing tests confirm 44px minimum phone/toggle targets. Focus-visible on both controls, menu document-flow expansion, Escape/focus return, toggle and route dismissal all pass.
- 768/1280: all five English navigation links occupy one horizontal row, with correct current-page indication and visible phone number. At 768–1023 only navigation gaps/link padding change; font sizes remain unchanged.
- Existing skip-link → main focus → next main control tests pass on all routes, including 404 recovery. Header remains a Server Component; navigation client boundary and dependencies are unchanged.
- Directly reviewed all four before/after viewport screenshots and both mobile menu-open pairs. No clipping, overlap, or distortion observed. Pixel comparison of the closed-menu screenshots below the Header is identical at all four widths (viewport height 844px). Mobile Header remains 69px high; desktop Header remains 77px high. Approved Home spacing CSS is unchanged.
- E2E used only Playwright-managed `http://127.0.0.1:3100`, with server reuse disabled; Playwright cleaned up that server. Both ports were free initially; no user-owned server was stopped or restarted.
- Review server: agent-started production preview (`npm run start -- --hostname 127.0.0.1 --port 3000`) remains running at `http://127.0.0.1:3000/`. This serves the verified build, without development hot reload.
- User Desktop/Mobile visual approval: **미확인**. Technical review does not constitute user approval. TASK-016 has not been started.

## Screenshot Review

Files are outside the repository so later Playwright runs do not remove the review evidence. All paths below are absolute. Before/after closed-menu screenshots use the same viewport and Desktop Chromium context; the automated viewport cases also pass in Mobile Chromium. After menu-open screenshots show the keyboard focus outline (before used pointer activation).

| Viewport | Before | After |
| --- | --- | --- |
| 320 × 844 | `/home/shlee/Workspace/ai/01.codex/task-015-review/before-320.png` | `/home/shlee/Workspace/ai/01.codex/task-015-review/after-320.png` |
| 390 × 844 | `/home/shlee/Workspace/ai/01.codex/task-015-review/before-390.png` | `/home/shlee/Workspace/ai/01.codex/task-015-review/after-390.png` |
| 768 × 844 | `/home/shlee/Workspace/ai/01.codex/task-015-review/before-768.png` | `/home/shlee/Workspace/ai/01.codex/task-015-review/after-768.png` |
| 1280 × 844 | `/home/shlee/Workspace/ai/01.codex/task-015-review/before-1280.png` | `/home/shlee/Workspace/ai/01.codex/task-015-review/after-1280.png` |
| 320 menu open | `/home/shlee/Workspace/ai/01.codex/task-015-review/before-320-menu.png` | `/home/shlee/Workspace/ai/01.codex/task-015-review/after-320-menu.png` |
| 390 menu open | `/home/shlee/Workspace/ai/01.codex/task-015-review/before-390-menu.png` | `/home/shlee/Workspace/ai/01.codex/task-015-review/after-390-menu.png` |

## Git and Review Handoff

Initial working tree was clean: TASK-014 was already committed in `e2a42f4`. Its original JPG, PNG, and evidence record remain unchanged. TASK-015 modifies Header/CSS, product/design/content and task documentation, and adds `tests/e2e/header-brand.spec.ts`; no other app content or navigation logic changes. `git diff --check` passes. No staging, commit, push, rebase, reset, or clean performed.

Suggested commit message: `feat: integrate official logo into site header`.

User review: check logo size and company-name balance, desktop navigation/current-page indication, the mobile identity/phone/menu row, menu expansion, and keyboard focus. Approval remains 미확인.

---

# TASK-014: Brand and IP Evidence Intake

## Status

Complete

## Scope and Plan

Preserve the supplied logo JPG, convert it losslessly to PNG without redesign, inspect all five supplied PDFs page by page, and synchronize asset/evidence and user approval records. No Header or public IP UI changes. Source PDFs remain outside public assets.

## Acceptance Criteria

- [x] Original logo preserved; PNG has matching dimensions, decoded pixels, colors, and background.
- [x] Each PDF page mapped to exact registration title, number, date, and recorded holder where visible; duplicates and related/basic designs distinguished.
- [x] Missing ownership evidence and publication wording remain explicitly unresolved.
- [x] Product, inventory, design, and approval records reflect the supplied handoff without invented specifications or claims.
- [x] npm run verify passes; Git status and diff reported.


## Validation and Findings

- `npm run verify` passed: ESLint, strict typecheck, 8 unit/component tests, production build, and 20 Desktop/Mobile Chromium E2E tests. Existing non-failing jsdom navigation and NO_COLOR/FORCE_COLOR warnings remain.
- Original JPG copy is byte-identical to the supplied file. PNG is 171 × 167 RGB with no alpha and identical decoded pixels; both assets visually inspected.
- All 19 source PDF pages visually inspected: 3 distinct patents, 10 distinct designs, 4 repeated certificates, 2 blank pages. Exact fields, source hashes, and page mapping: `docs/brand-ip-evidence.md`.
- Two patent and six design certificates explicitly name 주식회사 승종. One patent and four designs refer to missing registration-details pages; ownership remains unresolved. Current registry validity was not checked.
- Source PDFs remain outside the repository/public assets. No private certificate scans are published. No new dependencies, app code, CSS, or tests changed.
- UI screenshots/approval are not applicable to this asset-and-document task: Header integration is pending, and there is no rendered page change. Existing 404 approval is synchronized from the user handoff, not newly inferred.
- Playwright's 3100 server was cleaned up; no listener on 3000 or 3100 after verification. No user server was stopped.
- `git diff --check` passed. Five existing Markdown files modified; one evidence Markdown file and two image assets added. No staging, commit, or push.

## Next Task

Prepare the logo Header integration and Desktop/Mobile previews as a separate task. Product dimensions and real exterior photo remain pending; do not advance to their UI without the required input.

---

# WSL migration — 2026-09-18

Complete: user-authorized environment migration to WSL Ubuntu. Git history and working files preserved; missing cross-platform optional dependencies added to the lockfile without changing existing package versions. `npm run verify` passed (lint, typecheck, 8 unit/component tests, build, 20 E2E tests). See `docs/wsl-migration.md` for the new path and run instructions. No product code changes, commit, or push.

---
# TASK-013: Development & E2E Server Separation

## Status

Complete

## Context

Keep the user's development server available while verifying a separate production server. Initial Git working tree and index are clean. Existing project dev server: PID 23424, parent 23832 (`next dev`), port 3000, HTTP 200; owned by the user and must remain running. Port 3100 is free.

## Scope

Playwright server address/lifecycle, README usage, and user-owned server safety rules. Preserve prior task records below.

## Out of Scope

App/UI/content, dependencies, deployment, Git writes, or stopping/restarting user processes.

## Acceptance Criteria

- [x] Production E2E uses 127.0.0.1:3100 without reusing existing servers.
- [x] The same development process and page remain available before, during, and after full verification.
- [x] Development and production outputs remain isolated using installed Next.js behavior.
- [x] Playwright cleans up its production server after verification.
- [x] Existing tests pass without weakened assertions; README and safety rules are updated.

## Validation

- `npm run verify` passed: lint, typecheck, 8 unit/component tests, fresh production build, and 20 Desktop/Mobile Chromium E2E tests. Existing jsdom navigation and NO_COLOR/FORCE_COLOR warnings remain non-failing.
- Repeated HTTP requests during verification returned 200 from development PID 23424. At 2026-09-18 19:54:53 KST both development and production returned 200; production PID 22180 ran `next start --hostname 127.0.0.1 --port 3100` under Playwright.
- After verification, port 3000 still belonged to PID 23424; browser navigation returned 200, Home h1 `(주)승종`, and visible main content. Port 3100 had no listener. No user process was stopped or restarted.
- Installed Next.js 16.3.4 `server/config.js` appends `dev` to the output path for development; `build/index.js` preserves `dev` during production cleanup. Outputs are `.next/dev` and `.next`. No extra isolation setting or output deletion was needed; the installed configuration no longer exposes an `isolatedDevBuild` option.
- Tests use relative paths and the configured 3100 baseURL, with no 3000 dependency. A separate run without the user's development server was not attempted, since it would require disrupting that server; Playwright starts its own production server independently.
- Only configuration, README, user-owned server instructions, and this record changed. AGENTS.md's Next.js managed block was absent and no block was generated or removed during this task. Existing user instructions were preserved.

---

# TASK-012: Page Metadata & Not-found Experience

## Current Status

Complete

## Current Context and Scope

Audit rendered metadata for all five active routes; fill missing page-specific descriptions and Home title; provide a native App Router not-found screen and keyboard recovery links. Next.js package range is ^16.3.4; lockfile and installed version are 16.3.4.

TASK-011 mobile Home spacing is now approved by the user. This approval does not cover the whole website or deployment. Existing TASK-008–010 changes are preserved.

## Current Out of Scope

Page bodies, header/navigation/focus investigation, spacing, branding, dependencies, domain/canonical/metadataBase/sitemap/robots policy, deployment and Git writes.

## Current Acceptance Criteria

- [x] Production titles and descriptions distinguish the five pages and contain only confirmed facts.
- [x] A missing route shows clear guidance and real Home/Contact recovery links with one shared shell.
- [x] Keyboard skip-link and recovery, mobile layout, and current-navigation state work on the 404 screen.
- [x] HTTP status and robots output are observed, not assumed.
- [x] Existing regressions and final npm run verify pass; Desktop/Mobile screenshots reviewed.

## Current Validation and Follow-up

- Follow-up: production `/task-012-does-not-exist` was directly inspected in Chromium: title `페이지를 찾을 수 없습니다 | (주)승종`, description `입력한 주소를 확인하거나 홈으로 이동해 주세요.`, HTTP 404. Added exact-value and single-tag assertions to the existing not-found E2E; focused Desktop/Mobile tests passed (4 tests). Full `npm run verify` rerun passed lint, typecheck, 8 unit/component tests, fresh production build, and all 20 E2E tests including the new assertions. Existing non-failing jsdom navigation and NO_COLOR/FORCE_COLOR warnings remained.
- Installed Next.js 16.3.4 source confirms `start-server.js` calls `ensureAgentRulesForDev` only for development when `agentRules !== false`; agent detection and a missing/outdated managed block trigger `generate-agent-files.js`. It preserves text outside managed markers and appends/updates its block. AGENTS.md currently has no managed block; this follow-up neither adds nor removes it. Keeping the block or separately opting out via configuration is a human decision; no configuration change is made.
- No listener existed on port 3000 at the start of this follow-up. Only the production server launched for this inspection was stopped before rebuilding; no user development server was stopped. Server separation remains a separate environment decision.
- `npm run verify` passed: lint, typecheck, 8 unit/component tests, production build, and all 20 Desktop/Mobile Chromium E2E tests.
- Production `/task-012-does-not-exist` returned HTTP 404 and native Next.js `noindex` robots metadata. Its expected document 404 console message is allowed only for this missing route; unexpected console/page errors still fail.
- All five production page titles/descriptions, single title/description tags, and `html lang="ko"` were verified in both browser projects.
- Keyboard Tab to skip link, Enter to main, Tab to Home recovery link, Enter to Home, and Contact recovery were verified; no active normal-page navigation item or duplicate shell landmarks appeared on the missing route.
- Reviewed full-page screenshots: `test-results/metadata-not-found-missing-ea831-ecovery-in-the-shared-shell-Desktop-Chromium/not-found.png` (1280 x 720 viewport) and `test-results/metadata-not-found-missing-ea831-ecovery-in-the-shared-shell-Mobile-Chromium/not-found.png` (412 x 839 viewport). No overlap, clipping, or horizontal overflow observed.
- Non-failing output: Vitest `Not implemented: navigation to another Document`; Playwright/Next `The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.` No warning suppression or configuration changes made.
- Existing page bodies, CSS, header/navigation, Home spacing, and skip-link implementation were not changed by TASK-012.
- Domain, hosting/public release, indexing/robots policy, canonical URLs, sitemap and share assets require later decisions. 404 screen visual approval: confirmed by the user-provided 2026-09-18 handoff; approval excludes whole-site design and deployment.

---

# Previous Record — TASK-011: Mobile Home Introduction Spacing

## Status

Complete

## Context

User review approved reducing excessive vertical whitespace around the Home introduction on mobile. Preserve the completed mobile header and TASK-010 skip-link behavior.

## Scope

- Measure the current production layout at the requested viewports.
- Reduce only the mobile Home introduction's excessive top and bottom space.
- Preserve typography, content order, boundaries, responsive menu flow, and desktop layout.
- Diagnose the reported apparent double navigation highlight without changing its styling.
- Capture and compare production screenshots and measurements before and after the change.

## Out of Scope

- Header/menu design or behavior, Footer, inner-page spacing, content, typography, branding, imagery, dependencies, or breakpoint changes
- Navigation highlight restyling unless a separate reproducible state defect is reported
- Git staging, commit, push, merge, rebase, reset, or clean

## Acceptance Criteria

- [x] The actual sources of excessive spacing are identified from computed layout data.
- [x] Mobile Home introduction top and bottom spacing are reduced with a Home-specific selector.
- [x] Company content and typography remain unchanged and unclipped.
- [x] Header/menu design and in-flow expansion remain unchanged.
- [x] TASK-010 skip-link focus and next-Tab behavior remain correct.
- [x] 320px and 390px have no overlap or horizontal overflow.
- [x] 768px and desktop Home remain unchanged.
- [x] Other page body layouts remain unchanged.
- [x] Navigation highlight behavior is diagnosed and reported separately.
- [x] `npm run verify` passes.
- [x] Requested before/after screenshots and measurements are captured and reviewed.

## Validation

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run test:run`
- [x] `npm run build`
- [x] `npm run test:e2e`
- [x] `npm run verify`
- [x] Production screenshot and measurement review

## Notes

- User approved this mobile Home spacing change before TASK-012; approval excludes whole-site design and public deployment.
- The first full verification run had one intermittent pre-existing responsive-focus assertion failure; the focused rerun passed, and the subsequent complete `npm run verify` passed all 16 E2E tests.
- Navigation diagnosis found exactly one `aria-current="page"` link. A second gray row appears only while that link is hovered and clears when the pointer leaves.
