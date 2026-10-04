# TASK-021 Search Discovery Configuration

The user approved search discovery through Naver/Google on2026-09-19. TASK-021 implementation was committed as46a869f and is included in remote main61b564e, confirmed by read-only Git checks on2026-10-01. Earlier Git-wait entries are historical; remote commit presence alone does not establish current live deployment, ownership verification or indexing. Existing production origin and redirects are preserved: `https://www.seungjong.co.kr`.

## Implemented behavior

- Root `metadataBase` uses the fixed production origin in `site.url`, never a request/preview host. Each public page defines its own `alternates.canonical`: Home, About, Business, Products and Contact. Root layout deliberately defines no canonical, so404 does not inherit Home's canonical. Home's serialized canonical has no trailing slash; its root URL resolves to `/`.
- Typed App Router `robots.ts` serves `text/plain` and allows public crawling with `User-Agent: *` / `Allow: /`, plus the absolute production sitemap address. No crawler-specific exclusion is added for Google or Naver.
- `sitemap.ts` serves XML containing exactly the five current public canonical URLs. It has no dates, priorities, frequency estimates, images or unpublished Careers entry.404 and unknown paths are excluded.
- Existing titles/descriptions, company facts, body markup, approved design,23 product combinations and eight registration records are unchanged. TASK-021 added no structured data, verification token, photo, OG image, favicon or dependency. TASK-022 separately adds the two user-issued ownership tags below.

## Environment and unpublished-route policy

The repository has no private page/API route. Careers has not been implemented and remains404/noindex, as do unknown paths. Public assets remain crawlable for rendering. Robots directives request crawler behavior; they are **not access control** and must not be used to protect private information. Future private functionality requires a separate authorization design.

When `VERCEL_ENV=preview`, robots returns `Disallow: /` without a sitemap advertisement. This adds a crawler-request guard while leaving Vercel's existing `X-Robots-Tag: noindex` untouched. No global `index:true` metadata or response-header override is introduced. Preview unit tests exercise that branch; production/default-local builds serve the public policy. The fixed canonical/sitemap host never changes to a preview URL. A sitemap URL is only a discovery hint, not permission to index.

Vercel documents preview noindex at the platform level, with a custom-domain preview exception. This task changes no provider settings and does not claim to have audited a private preview deployment or custom preview domain. If one is introduced, its actual noindex response must be checked separately. Environment-dependent static metadata routes use the environment at build time; do not promote/reuse a preview build as a production build without rebuilding for the proper environment.

## Local validation and rollout

Tests check production/preview robots branches; HTTP200 and content types for active pages/robots/sitemap; exact unique canonical and XML URL lists; XML namespace and absence of invented fields;404/noindex and canonical absence on missing/Careers paths. Existing accessibility/navigation/data tests remain in the full verification pipeline. Affected unit2/build/E2E6 and final npm run verify passed: lint, strict typecheck,11 unit/component tests, build and58 E2E. Four Home screenshots are byte-identical to TASK-020 captures; five pages’ Header/main/Footer markup remains identical. See tasks/current.md and the handoff report for logs and paths.

TASK-021 Git commit/push is complete as recorded above. TASK-022 is committed as93fda87. For TASK-023, the Git reviewer handles the newly authorized commit/push. Main push may trigger Vercel production deployment. No manual deployment, DNS/provider write or account connection was performed here. After deployment, verify the five canonical tags, `https://www.seungjong.co.kr/robots.txt`, `https://www.seungjong.co.kr/sitemap.xml`, and404 noindex against the live site. Local success alone does not establish live rollout.

## Account status — 2026-10-04

2026-10-04 update: the user reports Naver/Google ownership verification and sitemap submission complete. Google Home indexing is supported by the supplied screenshot according to the orchestration handoff; Naver indexing is user-reported. This development task did not access the accounts or independently inspect that screenshot. Neither evidence establishes search ranking or indexing of every public page. No account writes were performed by this developer. Earlier pending-action records below are historical TASK-022 checkpoints.

Search permission, canonical hints and sitemap availability do not guarantee inclusion, timing or ranking. Real exterior photography remains explicitly deferred; it is not a prerequisite for these settings.

## Official sources checked — 2026-09-19

- [Next.js metadataBase and alternates](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase): root metadata base and relative canonical resolution. Current docs display16.3.5; installed16.3.4 supports the implemented APIs and passes local checks.
- [Next.js robots metadata route](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots): typed crawler rules and sitemap field.
- [Next.js sitemap metadata route](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap): typed absolute URL list; optional fields are omitted when unsupported by evidence.
- [Vercel environment variables](https://vercel.com/docs/environment-variables/system-environment-variables#vercel_env): production/preview/development environment values.
- [Vercel preview indexing](https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines): default preview noindex and custom-domain exception.
- [Naver sitemap submission](https://searchadvisor.naver.com/guide/request-feed): owner-side sitemap follow-up.
- [Google ownership verification](https://support.google.com/webmasters/answer/9008080) and [sitemap submission](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap): account verification and sitemap processing follow-up.

## TASK-022 Ownership tags — 2026-10-01

The user authorized applying these exact public verification values via the existing root Next.js metadata:

- `google-site-verification`: `S8yu772XYDACYU5LqC2FIEfCNCAH0vZvzd8T9U3E398` via `verification.google`.
- `naver-site-verification`: `ebdacd70e565bef921b3b6e0aa2bd246ba9fc28e` via `verification.other`.

These are intentionally public ownership meta values supplied by the user, not API credentials. No separate verification file, dependency or UI change is needed. Existing self-canonical, robots/sitemap,404 noindex and Preview policy remain unchanged. The metadata E2E checks the raw Home HTTP response and a JavaScript-disabled browser, requiring each exact tag once in `<head>`. Production rollout and account confirmation/submission are distinct follow-up steps; no account click, sitemap submission or external setting change was performed by the development task.

Sources checked before implementation: installed `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md` (verification section), metadata tag generation in `node_modules/next/dist/lib/metadata/metadata.js`, and [official Next.js verification metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#verification). The Next.js-managed AGENTS block was checked against `node_modules/next/dist/server/lib/generate-agent-files.js` and preserved unchanged.

Local validation completed: affected build and metadata E2E8 passed; full `npm run verify` exited 0 with lint, strict typecheck,18 unit/component tests, production build and88 E2E passing. Logs and extracted server head: `/home/shlee/Workspace/ai/01.codex/task-022-review/`. No UI JSX/style changes or new screenshots; responsive/navigation/keyboard checks remain in the passing full suite. No runtime source beyond the root verification metadata changed. The preceding pending rollout/account checkpoint is historical; TASK-022 is committed as93fda87 and the current account evidence is recorded above.

## TASK-023 Open Graph copy

Only the five public page modules define `openGraph.title` and `openGraph.description`. Each reuses local constants for its existing title/description; internal-page OG titles include the existing company suffix from the resolved document title. Root layout defines no Open Graph defaults, so missing/Careers routes inherit no Home OG. No optional OG URL/type/site-name, image, favicon, explicit Twitter configuration, structured data, UI or dependency is added. Next may automatically derive Twitter title/description/card from Open Graph; this framework behavior is not separately configured.

Installed Next metadata guide: `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md`, openGraph and Merging sections. [Official Next metadata reference](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#opengraph) confirms these fields and shallow segment merging. Tests require exact single tags in raw HTTP head plus a JavaScript-disabled browser, and no OG/canonical with noindex for404/Careers. Existing discovery and ownership tests remain.

TASK-023 validation: affected build/metadata E2E10 and full `npm run verify` passed (lint, strict typecheck,18 unit/component tests, build,90 E2E). Logs, built-head tag extraction and source-invariance evidence are in `/home/shlee/Workspace/ai/01.codex/task-023-review/`. No JSX/CSS change; no new screenshots required. The installed `node_modules/next/dist/lib/metadata/resolve-metadata.js` confirms automatic Twitter fallback; built head contains the two requested OG tags plus three framework-generated Twitter tags, without an image. TASK-023 commit/push and live OG verification are complete at9032abf according to the orchestration completion handoff. No new account actions are required by this implementation.

## TASK-024 Company identity clarification

User reports visibility for `승종 금형` but not `주식회사 승종`, `승종 안성` or `승종`; these are user observations, not an independently audited ranking baseline. Only proposal1 was approved: use the formal name in Home title/OG title, and the exact approved Anseong introduction sentence in Home meta/OG description and existing visible Home/About introduction paragraphs. Keep the product follow-up in Home description. See product.md and tasks/current.md for exact before/after wording. This does not establish ranking changes or guarantee exposure for any query. No Smart Place/SNS/structured data/search-account action is included. Ownership tags, canonical,robots,sitemap,404 and Preview policy remain unchanged.

Local TASK-024 validation passed: affected unit2/build/E2E58; full verify lint/typecheck/unit18/build/E2E90. Raw HTTP title/description and OG checks use exact approved Home text; all other pages retain their prior metadata expectations. Home/About visual inspection at320/390/1280 found no clipping or horizontal overflow. Evidence: `/home/shlee/Workspace/ai/01.codex/task-024-review/`. Git publication/live copy confirmation remain pending; search rankings were not remeasured.
