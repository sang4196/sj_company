# TASK-019: Responsive Navigation Focus Reliability

## Authorization and plan

User approved the presented TASK-018 screen: “화면 괜찮음. 회사전경 사진은 이후 넣는걸로 하고 진행가능하면 진행하도록”. Record that approval narrowly for TASK-018 Home/Footer; individual historical internal-page approvals, missing product evidence, holder evidence and deployment/domain decisions remain unchanged. Company exterior photograph explicitly deferred. Initial tree clean at2ac18df.

- [x] Inspect preserved TASK-018 trace and bounded live event observations; separate product focus loss from test synchronization. Record counts, conditions and uncertainty; do not retry until passing.
- [x] Apply only an evidence-supported navigation or test synchronization fix. Keep layout, logo, text, data, dependencies and component boundaries unchanged.
- [x] Verify800→767,767→768, open-menu focus, unrelated main focus, Escape, route changes and skip-link without focus theft. Preserve valid assertions.
- [x] Inspect Header at320/390/768/1280 and200% text. Run affected checks then full npm run verify; document failures/reruns.
- [x] Update approval/deferred-photo records and final report. Preserve all existing servers; Playwright owns3100. No Git writes or next task.

## Status

Implementation and local verification complete. Existing approved screen remains unchanged. TASK-018 presented-screen approval is confirmed; TASK-019 focus correction passed full verification.


## Diagnosis and evidence

Preserved TASK-018 P2 trace confirms About focus then800→767px, followed by an inactive menu button for the5-second assertion; it contains no focus-event ordering instrumentation. TASK-011 also records an intermittent responsive-focus failure. Those earlier individual incidents cannot be reconstructed beyond their preserved data.

A temporary browser event probe ran exactly12 shrink transitions per project (24 total), after Business→About navigation. Two animation frames bracketed settled rendering, without arbitrary sleeps, retry policies or enlarged assertion timeouts. It recorded focus/blur/focusout and application matchMedia callback entry/exit. Baseline failures: Desktop2/12, Mobile4/12. In all six, blur/focusout targeted the disappearing About link with relatedTarget null before the application media callback; activeElement was already BODY on callback entry/exit. Successful cases entered the callback while About was still active. This reproduces a product focus-loss race, not merely an assertion synchronization issue.

Example baseline Mobile sample2: blur at1562ms, focusout1562.1ms, media-before1564.4ms, media-after1564.5ms; activeElement BODY throughout. Exact records: diagnostic-Desktop-Chromium.json and diagnostic-Mobile-Chromium.json. Baseline diagnostic tests deliberately recorded rather than failed on observations: their reported2 passed is harness completion, not product success.

## Correction

Only PrimaryNavigation's existing effect changes. A small shared restoration function handles the current focused element on media change and the actual focusout target when CSS already hid it. The latter requires no explicit destination (relatedTarget null), zero rendered rectangles and document.hasFocus(); the target must also belong to the navigation presentation that disappears at the current breakpoint. It retains no stale focus history. The document listener and media listener are both cleaned up. No CSS, JSX markup, ordering, labels, logo, dependencies or Server Component boundary changes.

After the fix, the same bounded12-per-project probe recorded Desktop0/12 and Mobile0/12 failures. Nine of24 samples still exercised blur-before-media ordering (Desktop6, Mobile3), all recovering correctly. This is evidence of handling the observed sequence, not a claim to prove every browser/event order. Only configured Chromium desktop/mobile projects were tested.

New user-observable E2E covers desktop About→767 menu button,767→768 first desktop link, open menu link→desktop, collapse when returning to mobile, main telephone focus preservation both directions with closed/open menus, and explicit blur of a visible navigation link without stale restoration. Existing Escape, route change, skip-link/next Tab, telephone, current-page and document-flow tests are retained unchanged. Diagnostic harness moved outside the repository to diagnostic-harness.js after use; no existing regression tests were deleted or skipped.

## Validation and visual preservation

Affected production build passed; new behavior tests2 and bounded probe runs2 completed successfully (affected.log). Final npm run verify passed lint, strict TypeScript,9 unit/component tests, production build and56 E2E tests (verify.log). No TASK-019 validation pipeline failure, retries/timeout increases or warnings suppressed. Existing non-failing jsdom navigation and NO_COLOR warnings remain.

Additional real-browser review at320/390/768/1280 and100%/200% text (8 combinations) confirmed phone→menu/desktop Tab order, mobile Enter→first link→Escape→toggle, no clipped Header controls or horizontal overflow. All eight Header screenshots directly inspected. CSS and rendered JSX/brand assets are byte-unchanged from approved TASK-018, so visual behavior/spacing remains identical;200% wrapping is retained. Browser results: review.json. Products23 combinations and their partial-coverage qualifications, About8 certificate records, holder evidence exclusions and deployment/domain decisions are unchanged.

## Approval, server ownership and handoff

TASK-018 presented Home/Footer screen approved on2026-09-19 (“화면 괜찮음”). Company exterior photograph explicitly deferred. This is not blanket approval of every historical internal view, domain or deployment. TASK-019 changes only focus behavior and is locally validated; no additional visual design introduced.

Final preview http://127.0.0.1:3107/ (PID257570) is running. All existing servers, including3106, preserved; no shutdown/restart. Playwright exclusively manages3100 with reuseExistingServer false and cleaned up its server. No port conflicts.

Artifacts directory: /home/shlee/Workspace/ai/01.codex/task-019-review/
- Header screenshots: header-320-100.png, header-320-200.png, header-390-100.png, header-390-200.png, header-768-100.png, header-768-200.png, header-1280-100.png, header-1280-200.png.
- Baseline event data: diagnostic-Desktop-Chromium.json, diagnostic-Mobile-Chromium.json; diagnostic.log.
- Fixed event data: diagnostic-after-Desktop-Chromium.json, diagnostic-after-Mobile-Chromium.json; affected.log.
- Final verification: verify.log; additional browser evidence: review.json. Diagnostic helper retained as diagnostic-harness.js outside Git.

No staging/commit/push or next task. Suggested commit: `fix: preserve navigation focus across responsive breakpoints`.

---

# TASK-018: Compact Home and Enriched Footer

## Status and authorization

Implementation and local verification complete, authorized through the design review and orchestrator handoff. User approval of the presented TASK-018 Home/Footer screen: **확인 (2026-09-19)**. Earlier 미확인 entries below are historical validation records, superseded only for this presented screen. Initial tree clean at `f3d2711` (TASK-017 committed/pushed separately). Preserve23 verified product combinations, their partial-coverage qualifications, eight registration records, official logo, confirmed company facts and existing servers. No new specification research or next task.

## Plan and Acceptance Criteria

- [x] Capture baseline Home/Footer at320/390/768/1280; measure each Home section height and product start position.
- [x] Reduce Home section padding and mobile Hero density through natural content layout, without fixed/max heights or clipping. Aim48–64px desktop,28–36px mobile section padding and390px Hero400–480px.
- [x] Put business number/title on one line with nearby description; prioritize actual product name; compact company facts and contact band while preserving inquiry routes.
- [x] Footer: unchanged official PNG + company name, approved manufacturing description, four real internal shortcuts, current address/tel/mailto, exact ©2026 wording with no inferred2017 copyright start or unsupported company details. Desktop columns/mobile compact stack, accessible targets/focus and no duplicated image alt/name.
- [x] Directly inspect before/after at all four widths and200% text reflow; check no overflow/clipping, heading hierarchy, keyboard navigation/skip-link/menu, contact links and Footer on every route including404.
- [x] Preserve valid tests; update only genuinely conflicting assertions and add meaningful behavior checks; full npm run verify passes, with failed-stage rerun then full rerun if needed.
- [x] Update documentation/task/backlog; report measured differences, screenshots/preview/status/diff and user approval 미확인. No Git writes or next-task implementation.

## P2 accessibility follow-up — final

P2 resolved: Home accessible name now includes the visible telephone number (`전화 문의 031-674-3640`), with exact Home unit/E2E coverage; other phone tests are unchanged. Affected unit1 and fresh-build Home E2E2 passed. First full rerun passed53/54 E2E but the existing mobile breakpoint focus-return check failed at smoke.spec.ts236. Inspected its matchMedia/document.activeElement handling; timing/order is suspected but not confirmed. Unchanged affected test then passed in both projects; final complete npm run verify passed lint, strict typecheck,9 unit/component tests, build and54 E2E. No skipped/deleted/weakened tests or navigation workaround. Failure evidence is retained in p2-failed-test-results/. Logs: p2-unit.log, p2-build.log, p2-e2e.log, p2-verify.log (failed), p2-failed-step-rerun.log and p2-verify-final.log (final pass), all under /home/shlee/Workspace/ai/01.codex/task-018-review/. This result supersedes the previous verify.log result.

Corrected final preview: http://127.0.0.1:3106/ (PID233987, running). Existing3105 and other servers preserved without restart. Directly inspected p2-contact-320.png, p2-contact-390.png, p2-contact-768.png and p2-contact-1280.png under the same review directory; visible layout unchanged and phone target remains48px high. Browser evidence: p2-browser.json. Earlier full-page/200% captures remain representative because only the accessible label changed. User visual approval remains **미확인**. No Git writes or next task.

## Server ownership

Existing production previews:3000 PID109386,3001 PID157777,3101 PID167708,3102 PID186715,3103 PID205602. Preserve all without restart/termination.3100 is free for Playwright-managed production verification with reuse disabled; start a fresh preview on a free port if required.


## Implementation and validation — 2026-09-19

Home retains five sections and confirmed copy. Business numbers and titles share a row; the actual product name is the h2 under a small 대표 제품 label. Company facts retain the company name, 2017 founding year and address; duplicate business content is removed. Telephone and email remain in a compact inquiry band. Standard mobile section padding is32px, Hero36px; desktop content padding48–64px. The deliberately compact contact band uses24px. No fixed/max Hero height or text clipping was introduced.

Footer uses the unchanged official PNG at32px with automatic height and empty alt beside the company name, approved description `금형 설계·제작 · 우레탄 성형·발포`, four real shortcuts, address, telephone, email and exact `© 2026 (주)승종. All rights reserved.`. Normal desktop uses three columns; mobile stacks compactly. Touch targets remain at least44px. The founding year remains Home/About information, not a claimed copyright start date.

The initial 200% root-font review exposed long product text overflow and overlapping existing Header controls. Flexible wrapping, minimum-width handling and adaptive Footer columns resolve these while retaining the standard mobile Header row and desktop horizontal navigation. At200%, content grows naturally and can wrap across additional lines; no content is hidden to meet a height target. Final browser measurements found no element/document overflow at all four widths.

`npm run verify` passed: lint, strict typecheck,9 unit/component tests, production build and54 Desktop/Mobile Chromium E2E cases. No pipeline failures or skipped/deleted tests. Existing non-failing jsdom navigation and NO_COLOR warnings remain visible. The first screenshot helper attempt used a viewport-only clip outside the viewport; corrected full-page capture succeeded. Existing Home product-heading and global identity-link assertions were scoped to the intended new hierarchy/Header because Footer now also has a Home link. New tests cover 200% reflow, Footer keyboard focus/activation and exact logo/contact/shortcut content across all five active routes plus404. Existing menu, Escape/focus restoration, page-change close, skip-link/next-Tab, current-page navigation and specification/registration tests pass.

Directly inspected baseline and final screenshots at320/390/768/1280, plus final200% text captures. Logo appearance, hierarchy, company facts, contact band and Footer remain readable; normal Header controls do not overlap. Products content/23 combinations and partial-catalog qualifications, illustrative SVGs, About/eight records, official logo assets, metadata and dependencies are unchanged. Server Component boundaries remain unchanged.

## Measured before → after (CSS px)

| Width | Hero | Business | Product | Company | Contact | Product start Y | Footer |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 320 | 768.8 → 492.2 | 754.8 → 478.8 | 355.8 → 253.8 | 604.5 → 338.2 | 333.2 → 187.0 | 1608.6 → 1056.0 | 366.5 → 290.0 |
| 390 | 704.2 → 401.3 | 703.6 → 427.6 | 355.8 → 253.8 | 604.5 → 338.2 | 333.2 → 135.0 | 1492.8 → 913.8 | 366.5 → 290.0 |
| 768 | 512.0 → 347.7 | 447.5 → 315.9 | 280.0 → 203.2 | 375.4 → 253.8 | 244.5 → 97.0 | 1068.5 → 772.6 | 246.6 → 222.0 |
| 1280 | 512.0 → 435.7 | 540.2 → 358.6 | 330.0 → 196.8 | 436.0 → 273.0 | 338.6 → 97.0 | 1161.2 → 903.2 | 246.6 → 177.2 |

390px Hero is401.3px, within the400–480px target. Narrower320px naturally needs492.3px. All Footer heights decrease.

## Review artifacts and ownership

Current production preview: http://127.0.0.1:3105/ — running for user review. Existing3000/3001/3101/3102/3103 and preliminary3104 were preserved; use3105 for the final build. Playwright exclusively managed3100 with reuse disabled and cleaned up its own server. No port conflicts, termination or restart of existing servers.

- 320px before: `/home/shlee/Workspace/ai/01.codex/task-018-review/before-320.png`; after: `/home/shlee/Workspace/ai/01.codex/task-018-review/after-320.png`; Footer: `/home/shlee/Workspace/ai/01.codex/task-018-review/footer-320.png`; 200%: `/home/shlee/Workspace/ai/01.codex/task-018-review/text200-320.png`.
- 390px before: `/home/shlee/Workspace/ai/01.codex/task-018-review/before-390.png`; after: `/home/shlee/Workspace/ai/01.codex/task-018-review/after-390.png`; Footer: `/home/shlee/Workspace/ai/01.codex/task-018-review/footer-390.png`; 200%: `/home/shlee/Workspace/ai/01.codex/task-018-review/text200-390.png`.
- 768px before: `/home/shlee/Workspace/ai/01.codex/task-018-review/before-768.png`; after: `/home/shlee/Workspace/ai/01.codex/task-018-review/after-768.png`; Footer: `/home/shlee/Workspace/ai/01.codex/task-018-review/footer-768.png`; 200%: `/home/shlee/Workspace/ai/01.codex/task-018-review/text200-768.png`.
- 1280px before: `/home/shlee/Workspace/ai/01.codex/task-018-review/before-1280.png`; after: `/home/shlee/Workspace/ai/01.codex/task-018-review/after-1280.png`; Footer: `/home/shlee/Workspace/ai/01.codex/task-018-review/footer-1280.png`; 200%: `/home/shlee/Workspace/ai/01.codex/task-018-review/text200-1280.png`.

Measurements: `/home/shlee/Workspace/ai/01.codex/task-018-review/before-measurements.json`, `/home/shlee/Workspace/ai/01.codex/task-018-review/after-measurements.json`. Verification log: `/home/shlee/Workspace/ai/01.codex/task-018-review/verify.log`.

User visual approval: **미확인**. No staging, commit, push or next-task implementation. Suggested commit message: `style: compact home layout and enrich footer`. Handoff report: `/tmp/sj-company-task018-dev-report.txt`.

---

# TASK-017: Verified Product Sizes and Illustrative Diagrams

## Status

Verified portions implemented and local validation passed. Catalog coverage remains partial because linked official stores return HTTP429 and some measurement bases are unspecified. User visual approval: **미확인**.

## Authorization and Scope

User confirmed: “띠아모매트, 바오밥매트, 이편한매트에 있는 모든 규격이 해당돼. 확인해서 적용하도록해”. This authorizes applying dimensions actually verified from the three official catalogs to Seung Jong without requesting repeat numeric approval. It does not establish material, color, performance, business relationships or OEM deliveries. Initial tree is clean at `dd385d5`; preserve DESIGN-REFRESH.

## Plan and Acceptance Criteria

- [x] Trace each official catalog, detail and option source, including separate mat forms and center/side/corner/edge variants; record inaccessible options as unresolved; distinguish original units, nominal/effective sizes, and actual size/thickness combinations.
- [x] Record exact URLs, date, extraction method, original and normalized dimensions, duplicates, exclusions and unresolved fields in `docs/product-spec-evidence.md`. Never claim partial coverage is complete.
- [x] Apply all verified combinations to Products; no invented cross-products of widths/thicknesses. No competitor branding, photos or copy in the public UI.
- [x] Provide simple independent code/SVG diagrams labeled 제품 형태 예시 where useful, without suggesting real product photography or unknown construction.
- [x] Keep the current visual design, shared shell, Home and contact information unchanged. No new dependencies or unnecessary Client Components.
- [x] Preserve valid tests; check 320/390/768/1280px, overflow, keyboard and inquiry paths; directly review screenshots.
- [x] Run complete `npm run verify`; document any failure and successful reruns.
- [x] Record user visual approval 미확인; hand off without commit/push or starting another task.

## Server Ownership

At start: 3000 PID 109386 (older TASK-015 production preview), 3001 PID 157777 (TASK-016 preview), 3101 PID 167708 (DESIGN-REFRESH preview) are running. Preserve all without stopping/restarting. Port 3100 is free and remains reserved for Playwright-owned production verification; no server reuse or port-based termination.

## Implementation and Coverage

- 23 unique verified dimension/thickness combinations in19 public rows across four tables: square11, side/corner/corridor5, hex1, rug unit+sets6. Four original SVG shape examples include adjacent dimensions. No source product imagery/branding or competitor copy is published.
- [Source inventory and numeric mapping](../docs/product-spec-evidence.md) records original units, exact URLs/images, official option checks, duplicates, conflicts, exclusions and unavailable sources. Applicability was explicitly authorized by the user; no repeat numeric approval requested.
- **Not a complete catalog claim:** 바오밥 rug4P/6P complete dimensions/thickness remain unresolved after official desktop/mobile store and browser429, official English-site and linked official-blog exploration. 띠아모 store parts/12-pack effective size, certain500/600/650 part dimensions, connector inclusion/effective footprint, and hex measurement axes remain unresolved. Unverified combinations are omitted, not fabricated.
- Preserve Home/Header/Footer/current design; only Products markup/data and new `.product-*` CSS selectors change. Server rendering and dependencies unchanged.

## Validation and Visual Review — 2026-09-19

- Final `npm run verify`: **passed** lint, strict typecheck,9 unit/component tests, production build,44 Desktop/Mobile Chromium E2E cases. Log: `/home/shlee/Workspace/ai/01.codex/task-017-review/verify.log`.
- Initial unit failure exposed concatenated accessible row text between type and size; inserted a real space and unit tests passed. First full verification caught unsupported RTL `exact` options; removed them (string name matching is already exact), standalone typecheck passed and full verification reran. Next run caught a new E2E locator using the wrong skip-link wording. Corrected it to the existing “본문으로 건너뛰기”; all8 affected tests passed before the final full44-case run. Historical failure logs retained; no hidden failures.
- All pre-existing valid tests preserved without deletion/skip. Removed only this agent's temporary `task-017-before.spec.ts` capture helper after retaining its screenshots; it was never a committed regression test. Existing body-no-img assertions remain valid because examples use SVG.
- Directly reviewed before/after and detailed specification captures at320/390/768/1280 CSSpx. All19 data rows and four figures render; no document/table/caption clipping or horizontal overflow. Mobile stacks diagrams/tables;768+ uses two columns. Caption units, actual thickness choices, side/corner differences and hex qualification remain legible.
- Skip-link → main → next main link, inquiry link focus outline, next Tab to email and actual telephone/email destinations pass. Existing shared navigation, menu, logo, Home, About, metadata and404 regressions also pass.
- Before/after matching full-page images use Pixel7 Chromium at each CSS viewport (device scale2.625), because the final baseline capture came from the Mobile project. Additional `review-*` images use Desktop Chromium at scale1. The first1500 device-pixel rows of each before/after pair are byte-identical, confirming unchanged Header and upper Products content. Isolated screenshots use document-origin full-page clips; the first clip-only attempt failed outside the viewport, then corrected captures succeeded.
- Current TASK-017 production preview: `http://127.0.0.1:3103/products`. Agent-owned server kept running; Playwright exclusively managed3100 with reuse disabled and cleaned it up. Existing3000/3001/3101 preserved. Earlier revalidation preview3102 is also preserved, but is not the TASK-017 review URL.
- User visual approval: **미확인**. No staging/commit/push or next-task implementation. TASK-018 remains outside this work.

## Screenshots and Handoff

All absolute paths are outside the repository and retained after Playwright cleanup:

| CSS width | Before | After |
| --- | --- | --- |
|320|`/home/shlee/Workspace/ai/01.codex/task-017-review/before-320.png`|`/home/shlee/Workspace/ai/01.codex/task-017-review/after-320.png`|
|390|`/home/shlee/Workspace/ai/01.codex/task-017-review/before-390.png`|`/home/shlee/Workspace/ai/01.codex/task-017-review/after-390.png`|
|768|`/home/shlee/Workspace/ai/01.codex/task-017-review/before-768.png`|`/home/shlee/Workspace/ai/01.codex/task-017-review/after-768.png`|
|1280|`/home/shlee/Workspace/ai/01.codex/task-017-review/before-1280.png`|`/home/shlee/Workspace/ai/01.codex/task-017-review/after-1280.png`|

Desktop scale1 full-page: `/home/shlee/Workspace/ai/01.codex/task-017-review/review-{320,390,768,1280}.png`. Readable section captures: `/home/shlee/Workspace/ai/01.codex/task-017-review/spec-{320,390,768,1280}-{0,1,2,3}.png` (square/parts/hex/rug). Browser measurements: `layout-check.json` in that directory.

Full handoff report: `/tmp/sj-company-task017-dev-report.txt`. Suggested commit message: `feat: add verified product specifications and shape diagrams`.

---

# DESIGN-REFRESH: Company Website Visual Review

## Status

Implementation and local validation complete. User requested a design review and visual improvement. This new request authorizes Home and shared visual styling beyond the earlier TASK-016 scope; preserve its existing registration content and evidence. Final user visual approval remains unconfirmed.

## Plan and Acceptance Criteria

- [x] Replace the sparse Home introduction with a clear typographic company statement and factual business scope; retain the five-section information order.
- [x] Establish coherent navy/ivory colors, heading weights, section spacing, product emphasis, and contact actions across all routes. Preserve the official logo and confirmed facts.
- [x] Preserve navigation, keyboard focus, phone/email links and all certificate records; add no dependencies or unverified imagery/claims.
- [x] Directly review desktop/mobile screenshots and check 320/390/768/1280px for overflow.
- [x] Run full `npm run verify`, record results and Git diff. No commit/push/deployment.

## Initial Findings

Existing uncommitted TASK-016 files are preserved. Port 3000 serves stale build asset references (unstyled page); no user-owned server is restarted. A separate agent-owned preview is used on 3101. Port 3100 was initially occupied by another verification process and subsequently became free without intervention.


## Validation and Review

- Final `npm run verify` passed: lint, strict TypeScript checking, 8 unit/component tests, production build, 36 Desktop/Mobile Chromium E2E tests. All existing tests retained. Earlier full run also passed before the final Business wrapping and Contact spacing/button refinements.
- Existing non-failing jsdom navigation and NO_COLOR/FORCE_COLOR warnings remain. No hidden failures or skipped checks.
- Directly reviewed Home at 320/390/768/1280px and every internal page at 390/1280px. Browser measurements at all four widths on all five routes found no horizontal overflow or clipped headings/body/link/detail text. Rechecked Business/Contact after final CSS refinements.
- Before screenshots: `/home/shlee/Workspace/ai/01.codex/design-review/styled-before-390.png` and `/home/shlee/Workspace/ai/01.codex/design-review/styled-before-1280.png`. The separate `before-*.png` files document the stale, unstyled port-3000 preview.
- After screenshots: `/home/shlee/Workspace/ai/01.codex/design-review/after-{home,about,business,products,contact}-{320,390,768,1280}.png`. Final first-screen image: `/home/shlee/Workspace/ai/01.codex/design-review/home-preview.png`.
- Verification log: `/home/shlee/Workspace/ai/01.codex/design-review/verify.log`.
- Agent-owned final production preview remains on `http://127.0.0.1:3101`. Existing servers on 3000/3001 were not stopped/restarted; their running production instances may reference old build assets. Use 3101 for this review. Playwright manages its own 3100 server.
- Changes for this request: Home JSX, shared CSS, design/product/content documentation and task records. Existing TASK-016 About implementation/tests/evidence preserved. No dependency, client-state, official-logo, Git staging/commit/push, or deployment changes. User visual approval remains unconfirmed.
- Suggested commit message for this design work: `style: refresh company website visual hierarchy`.

---

# TASK-016: About Patent and Design Registration Records

## Status

Implementation and local validation complete. 사용자 화면 승인 상태: **미확인**.

## Scope and Plan

Initial working tree is clean at `758fec6` (TASK-015). User-authorized next-task implementation covers a minimal factual About section based on the supplied registration certificates. This authorization is not final visual approval, a live registry check, or authorization to deploy. Preserve earlier task records and the running port 3000 production server (PID 109386).

1. Capture the existing About page using Playwright's separate production server on 3100.
2. Add a Server Component list after company information, grouping two patents and six designs whose certificates explicitly name 주식회사 승종. Use exact titles, registration numbers and dates; label related designs with their recorded basic-design numbers.
3. Keep the evidence scope explicit in the UI, adapt the existing About regression assertions to the newly authorized facts, and check 320/390/768/1280px.
4. Run the full verification pipeline, inspect before/after screenshots, update related documentation, and hand off without commit/push or starting TASK-017.

## Out of Scope

The patent and four designs with missing holder details; current rights/validity claims; product linkage, performance, safety, exclusivity or first-development claims; certificate PDF/image publication; personal identifiers/addresses; shared Header/Footer or Home redesign; dependencies, deployment and Git writes.

## Acceptance Criteria

- [x] Exactly the two patents and six designs documented with the company as certificate holder appear, with correct names/numbers/dates and grouping.
- [x] The three related designs identify the correct basic design; no unverified relationships are inferred.
- [x] Copy clearly limits the list to supplied certificates and does not assert current validity, a current holdings total, product application, performance, safety or exclusivity.
- [x] Missing-holder records remain excluded and internally unresolved; no original certificates or personal information enter public assets.
- [x] 320/390/768/1280px layouts are readable without clipping/overflow; company information, navigation, skip-link and inquiry paths remain usable.
- [x] Existing valid tests remain; necessary content/regression tests pass together with full `npm run verify`.
- [x] Desktop/Mobile before/after screenshots are directly reviewed with absolute paths recorded.
- [x] Related documents are current; user visual approval remains 미확인; no TASK-017, staging, commit or push.

## Validation

- Final `npm run verify` passed: ESLint, strict TypeScript, 8 unit/component tests, production build, and 36 Desktop/Mobile Chromium E2E tests. These include eight new responsive About cases (four widths × two projects) and all 28 existing cases. No tests deleted or skipped.
- Initial verification stopped at typecheck because an RTL role query included a Playwright-only `exact` option. Removed the unsupported option; standalone typecheck then passed and the full pipeline passed. After visual review refined only the new section's word wrapping and the screenshot capture origin, the full pipeline passed again on the final code.
- Existing no-patent About assertions conflicted with the newly authorized section; they now assert exact allowed facts, the two/six grouping, three related-design links, missing-holder exclusions, evidence qualification, and absence of unsupported claims. Existing company, contact, route, skip-link/next-Tab, Header, and no-body-image checks remain.
- Non-failing existing output: jsdom “Not implemented: navigation to another Document” and NO_COLOR/FORCE_COLOR warning. No warnings suppressed; no hidden failures.
- Names, numbers, dates and the three basic-design references match the supplied evidence register. P3 and four missing-holder designs remain excluded. No private PDF, image, personal identifier or historical personal address added to public assets. Contact address and phone/email are unchanged.
- Directly reviewed all four before/after full-page screenshots and all four final registration-section screenshots. Mobile titles/details reflow without overlap; 768/1280 title and details share a row. All eight records fit, with no horizontal overflow or clipped text. The first 1,200px of each before/after screenshot is pixel-identical, confirming the existing upper About layout/Header are preserved. Source changes are scoped to About and its new selectors; Home, Footer, navigation, metadata, assets and dependencies are unchanged.
- Early long-element screenshots showed an offscreen fixed skip-link in the captured image. Capturing from the document origin with an explicit full-page clip removes this capture artifact; skip-link code was not changed. Final screenshots contain no overlay.
- E2E used only the Playwright-managed 127.0.0.1:3100 server with reuse disabled; it was cleaned up. No port conflicts occurred.
- Port 3000 stays on original PID 109386, with About HTTP 200 before/during/after verification. It retains the previous TASK-015 page in memory and was not stopped/restarted.
- Current TASK-016 review: `http://127.0.0.1:3001/about#about-registrations-heading`. Agent-started production preview PID 157777, exec session 44759; HTTP 200 with the new section and eight registration dates. This is a local review server, not deployment, and does not provide hot reload.
- User visual approval remains **미확인**, including prior TASK-015 approval. No TASK-017, staging, commit, push, rebase, reset or clean.

## Screenshots

All paths are outside the repository to survive future Playwright cleanup. Full-page before/after captures use the same Desktop Chromium context at each requested viewport (844px viewport height); behavior also passed Mobile Chromium. Registration-only images are browser screenshots, not regenerated images.

| Width | Before | After | Registration detail |
| --- | --- | --- | --- |
| 320 | `/home/shlee/Workspace/ai/01.codex/task-016-review/before-320.png` | `/home/shlee/Workspace/ai/01.codex/task-016-review/after-320.png` | `/home/shlee/Workspace/ai/01.codex/task-016-review/after-320-registrations.png` |
| 390 | `/home/shlee/Workspace/ai/01.codex/task-016-review/before-390.png` | `/home/shlee/Workspace/ai/01.codex/task-016-review/after-390.png` | `/home/shlee/Workspace/ai/01.codex/task-016-review/after-390-registrations.png` |
| 768 | `/home/shlee/Workspace/ai/01.codex/task-016-review/before-768.png` | `/home/shlee/Workspace/ai/01.codex/task-016-review/after-768.png` | `/home/shlee/Workspace/ai/01.codex/task-016-review/after-768-registrations.png` |
| 1280 | `/home/shlee/Workspace/ai/01.codex/task-016-review/before-1280.png` | `/home/shlee/Workspace/ai/01.codex/task-016-review/after-1280.png` | `/home/shlee/Workspace/ai/01.codex/task-016-review/after-1280-registrations.png` |

## Git Handoff and Next-task Prerequisites

Initial tree was clean at `758fec6`. TASK-016 changes: About page/data, scoped CSS, About unit and smoke expectations, new responsive About E2E, four product/design/evidence/inventory documents, and current/backlog task records. Git status: 10 modified tracked files and one untracked E2E file; index unchanged. `git diff --check` passed.

Suggested commit message: `feat: add evidence-based patent and design records to About`.

Git review/commit/push are left to the separately authorized Git task. TASK-017 requires user-confirmed actual product width, length, thickness, and all available size variants before specification UI or dimensioned imagery. No sample dimensions are assumed. User visual approval is still **미확인**; the next-task authorization does not approve the whole site's design.

---

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
