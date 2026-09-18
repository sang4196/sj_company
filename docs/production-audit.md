# TASK-020 Production Site Audit — 2026-09-19

Read-only observations at2026-09-19 01:04–01:06 KST (2026-09-18 16:04–16:06 UTC). Initial repository: `e79c7acc5098860fe32a645e9b00933dbab8da50`, clean. The user confirmed Vercel deployment/domain connection; the presented TASK-018 screen is approved and the company exterior photograph is explicitly deferred. This audit does not expand approval to every historical internal-page review or resolve missing product/holder evidence.

## Public address and responses

| Requested address | Observed response chain |
| --- | --- |
| http://www.seungjong.co.kr/ |308 → https://www.seungjong.co.kr/ →200|
| http://seungjong.co.kr/ |308 → https://seungjong.co.kr/ →308 → https://www.seungjong.co.kr/ →200|
| https://seungjong.co.kr/ |308 → https://www.seungjong.co.kr/ →200|
| https://www.seungjong.co.kr/ |200|

Final observed production host: [www.seungjong.co.kr](https://www.seungjong.co.kr/). This records the current redirect configuration; it does not invent a new host preference. Normal certificate validation succeeded. Responses identify `server: Vercel` and HTTPS HSTS `max-age=63072000`. DNS/registrar/provider settings were not changed or inspected through a control panel.

`/`, `/about`, `/business`, `/products`, `/contact` all return200 HTML. `/task-020-missing` returns404 with the shared recovery page and `noindex` meta. Nine referenced JS/CSS resources and the logo return200. The171×167 PNG matches the repository byte-for-byte (SHA256 `1f4f1eaecf14281e6d6c09ea71c8957705b97b78cd1bf49fbf82a821ea257d51`). Browser page errors and unexpected400+ responses: none.

## Deployed version evidence and push impact

[GitHub commit status](https://api.github.com/repos/sang4196/sj_company/commits/e79c7acc5098860fe32a645e9b00933dbab8da50/status) reports Vercel success. [Production deployment6527761815](https://api.github.com/repos/sang4196/sj_company/deployments/6527761815) is created by `vercel[bot]` for exactly that SHA at2026-09-18 15:42:51 UTC; its success status at15:42:52 links to `https://sj-company-72fd5dvv9-shlee4.vercel.app`. Earlier2ac18df/f3d2711 commits also have Vercel Production records.

For all five public pages, the complete Header/main/Footer HTML exactly matches the local current-main production build. Five live JS chunks match local bytes despite different filenames; the navigation chunk includes the TASK-019 focusout/getClientRects/hasFocus fix and has SHA256 `cb20bd62f1f05da464d6cfddc3e36799eb88bd1fa5feb4a858dbe400bfc0ae08`. The live800→767→768 focus transition also passes. These provide strong evidence that the public site serves current-main behavior/content. Not every framework/CSS bundle is byte-identical between hosting environments, and public HTML exposes no authoritative commit-SHA attestation for the custom-domain alias.

GitHub/Vercel integration and commit-linked Production deployments are confirmed. The private automatic-deploy/ignore-build settings were not opened, so their exact current values are unverified. Given successive main commits with Production deployments, a future main push **may trigger a production build/deployment, including documentation-only pushes**. Git handoff must account for that effect; this audit performs no push, deploy, provider change or external write.

## Metadata and unresolved policy

All five pages expose the expected distinct Korean titles/descriptions and `lang=ko`. No canonical link or page robots meta is emitted for active pages; no X-Robots-Tag was observed. `/robots.txt` and `/sitemap.xml` return the site's404 HTML rather than policy/XML documents. This does not establish the owner's search-visibility policy or prove that a search engine has indexed the site. Search-console state, crawl history and actual search inclusion were not inspected.

Search/indexing policy, sitemap scope and explicit canonical metadata remain future decisions. The existing www redirect is observed configuration and is preserved. `/favicon.ico` also returns404; the application references no favicon asset, and the audited browser loads did not report a failed favicon request. An approved favicon is an optional future asset, not grounds to regenerate the logo here.

## Browser and visual inspection

A read-only Chromium probe visited each of the five routes and404 at320/390/768/1280 (24 views). All24 screenshots were directly inspected. No horizontal/document/text/table clipping detected. Header/mobile controls, responsive product tables/diagrams, eight registration records, footer and contact paths remain readable.

On every view: skip-link → main → next main link; Header telephone href and Footer email href checked. On all12 mobile route/width combinations: menu opens in document flow and pushes main downward, first link receives keyboard focus, Escape restores toggle focus, Contact navigation closes the menu. A separate live800→767→768 transition restores the toggle/desktop Home link. Internal href inventory contains only the five valid routes, `#main-content`, `tel:031-674-3640` and `mailto:sjbjh3613@daum.net`. No telephone call/email was sent. The existing local suite additionally exercises route/keyboard details and200% text.

No proven repository implementation defect was found. Changes are documentation/task records only; no new source code, tests, dependencies, SEO policy or imagery.23 verified size/thickness combinations, eight certificate entries and their qualifications are preserved.

## Evidence and validation

Artifacts: `/home/shlee/Workspace/ai/01.codex/task-020-review/`.

- `http-responses.json`: timestamped redirect/status/header chains; corresponding `*.response` bodies.
- `metadata.json`, `assets.json`, `markup-comparison.json`: live metadata, resource status/hashes and exact region comparison.
- `github-status.json`, `github-deployments.json`, `deployment-evidence.json`: public commit/deployment records.
- `browser.json`, `browser.log`:24-view inspection and interaction results.
- `live-{home,about,business,products,contact,task-020-missing}-{320,390,768,1280}.png`:24 directly reviewed full-page screenshots.
- `verify.log`: fresh npm run verify passed lint, strict typecheck,9 unit/component tests, production build and56 E2E cases. No pipeline failures or skipped/deleted tests; existing non-failing jsdom/NO_COLOR warnings remain.

The web retrieval service could not open the domain; direct HTTPS/browser requests succeeded. gh CLI was unavailable; the installed GitHub read-only status tool and public GitHub GET endpoints supplied evidence. The initial browser probe checked a lazy Footer image before it entered the viewport; the probe was corrected to scroll it into view and wait for image load, then completed all24 views. This was a probe synchronization issue, not a site loading defect.

No new preview server is needed: review the actual [production site](https://www.seungjong.co.kr/). Existing local servers remain untouched. Playwright owns only127.0.0.1:3100 for local verification with server reuse disabled.

## Subsequent authorization — TASK-021

The observations above remain the TASK-020 live baseline. The user subsequently approved representative-address/canonical, robots and sitemap search-discovery configuration. Implementation and deployment status are tracked in [search discovery](search-discovery.md) and tasks/current.md; this historical audit does not by itself establish that a later version is live.
