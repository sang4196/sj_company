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

TASK-021 Git commit/push is complete as recorded above. For TASK-022, the Git reviewer handles the newly authorized commit/push. Main push may trigger Vercel production deployment. No manual deployment, DNS/provider write or account connection was performed here. After deployment, verify the five canonical tags, `https://www.seungjong.co.kr/robots.txt`, `https://www.seungjong.co.kr/sitemap.xml`, and404 noindex against the live site. Local success alone does not establish live rollout.

## Account follow-up — not executed

1. The authorized owner signs into Naver Search Advisor and Google Search Console, checks whether an existing verified property already covers the site, and uses the confirmed HTTPS www address where applicable.
2. For TASK-022 the user has supplied both exact public HTML verification values. After Git review/push and confirmation that the live Home head serves them, the user clicks verification in the corresponding Naver/Google account. DNS verification is not used in this task. Applying a tag does not establish that the account verification has succeeded.
3. Once the deployment is live and ownership is verified, submit `https://www.seungjong.co.kr/sitemap.xml` in the appropriate service. Check fetch/processing and indexing reports afterward; no submission or crawl request was made in this task.

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

Local validation completed: affected build and metadata E2E8 passed; full `npm run verify` exited 0 with lint, strict typecheck,18 unit/component tests, production build and88 E2E passing. Logs and extracted server head: `/home/shlee/Workspace/ai/01.codex/task-022-review/`. No UI JSX/style changes or new screenshots; responsive/navigation/keyboard checks remain in the passing full suite. No runtime source beyond the root verification metadata changed. Git review/push, live tag confirmation and owner account actions remain pending.
