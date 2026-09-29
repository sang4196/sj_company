# Dodam reference redesign preview

2026-09-29. The user requested a full redesign based on https://dodamcare.com/, including animation and Footer, for local review before approval. Baseline is clean commit `e2c66b2`. Earlier broad manufacturing-reference research is superseded by this named reference.

## Current approval — 2026-09-30

The user explicitly authorized review, commit and push of the complete redesign from e2c66b2, including the final white/blue palette and matching Header/Footer. Earlier local-only/approval-pending statements below describe historical checkpoints and are superseded. No further visual redesign is included in this Git handoff. Main push may trigger Vercel production deployment; actual publication results are reported separately.


Git review validation (2026-09-30): a fresh `npm run verify` exited0 with lint, strict typecheck,18 unit/component tests, production build and80 E2E passing. Log: `/home/shlee/Workspace/ai/01.codex/dodam-review/git-review-verify.log`. Reviewed the complete diff and asset provenance; no blocking findings or further visual/code changes. Publication handoff: `/tmp/sj-company-dodam-git-report.txt` records the resulting commit, remote and deployment observations.

## Reference observations and implementation

Inspected rendered desktop1440px and mobile390px pages, scrolled header, reveal behavior, gallery and Footer. Reference uses cream `#F7F1E4`, sand `#F2E9D4`, warm black `#1C1912`, bronze `#8A6A2F`; full-width photography with a large left headline and a small portrait detail on desktop; square actions; IBM Plex Sans KR headings; editorial columns; dark contact section; company/Sitemap/Contact Footer and persistent inquiry shortcuts. Implemented this visual language with independently written Next.js components and CSS. The accumulated previous trial CSS is replaced by one coherent stylesheet.

Five pages share typography, colors, spacing and motion. Home retains company→business→product→company facts→contact semantics but rebuilds composition. Product introduction gains a clearly identified shape diagram before all four existing specification tables; Business uses a material-background introduction and a compact linkage section. About retains its exact registration records. Contact groups phone, email and address into a usable two-column layout. Mobile reflows into a single column. Reference company identity, contact data, pricing/performance claims, customer videos, reviews, forms and privacy policy are not copied into SJ content.

Footer contains official logo, business description, foundation year, address, four real site links, phone, email, contact-page link, copyright and back-to-top. Persistent shortcuts use the existing telephone, mail and contact routes; there is no nonfunctional application form or invented Kakao channel/registration number.

## Motion

SiteMotion progressively enhances `.reveal` elements with upward24px fades and bounded80ms stagger. Initial viewport and keyboard destinations are immediately visible. Pointer focus does not interrupt a reveal: this prevents a moving link from escaping the pointer between press and release. Content remains visible without JavaScript or IntersectionObserver. Reduced-motion preferences and changes disable movement. Header adds a separator shadow after40px (its surface now remains matched to Footer); inquiry strip appears after Home hero or160px on internal pages. Buttons fill on hover; portrait detail settles from1.12×; decorative scroll cue loops. All motion is disabled under prefers-reduced-motion. Existing accessible mobile menu,48rem breakpoint and focus handling are preserved.

## Asset provenance

- `public/fonts/IBMPlexSansKR-SemiBold.woff2`: IBM/plex, weight600,434484bytes. Source commit763c36ef9117782905ae010056dfbe8fd2653a25, `packages/plex-sans-kr/fonts/complete/woff2/hinted/IBMPlexSansKR-SemiBold.woff2`. SIL OFL1.1 in `public/fonts/IBM-Plex-LICENSE.txt`. SUIT Variable remains the locally hosted body font.
- `public/visuals/material-study.webp`: original built-in image_gen output converted with installed Sharp. It is illustrative material imagery, not a photograph of SJ products/facilities. Visible Home caption identifies this. Original: `/mnt/c/Users/sang4/.codex/generated_images/01a0b4e3-920d-73b1-bcba-41cffb4dda6b/exec-3f5b3fd9-4a4e-48a5-a787-446826a5053c.png`.
- `src/components/product-study.tsx`: independent decorative SVG material/form study with an adjacent scope caption. Does not define real product connectors, color, texture, performance or measurements. Existing four specification figures remain independently labeled.

Generation prompt (built-in tool): Use case: photorealistic-natural. Create an original editorial background photograph for a Korean design and urethane manufacturing company website. Landscape16:9. A quiet materials design study on a broad warm limestone workbench: ivory flexible foam offcuts, one clean charcoal solid mold-like geometric block, several restrained warm gray precision-shaped sample blocks, a plain rolled sketch paper without visible markings. Arrange objects in the RIGHT half; LEFT half is mostly dark warm brown wall and clean negative space for large white Korean text. Warm afternoon window light grazing matte surfaces, realistic fine porous foam texture and subtly brushed metal, tasteful neutral taupe, cream and brown, natural believable shadows. Close-up table height perspective, premium architecture editorial photography mood, authentic imperfect surfaces, no neon, no glossy futuristic ribbons, no computer UI. It is a generic illustrative material composition, NOT an identifiable company factory or a documented product. No people, logos, lettering, measurement numbers, text, certifications or recognizable machinery. No website layout or text. Wide high resolution image.

## Review and rollback

Screenshots, reference inspection files and validation logs are outside the repository at `/home/shlee/Workspace/ai/01.codex/dodam-review/`. Current approval is for implementation and review, not commit/push/deployment. Restore only this task's tracked diffs from e2c66b2 and remove only its introduced assets/components/docs to roll back, preserving later unrelated changes. Final validation and preview URL are recorded in tasks/current.md.

Review corrections: adaptive company-fact columns keep the large foundation year readable at200%; the portrait inset stays within its parent; desktop phone emphasis is retained; the scrolled Home header selector correctly overrides its initial dark surface. A pointer-focus jump during scroll reveal was reproduced and fixed without weakening existing checks. Initial failures are retained in `verify.log` and `fix-e2e.log`; corrected motion and navigation checks passed26 E2E in `motion-fix-e2e.log`. An intermediate full run (`verify-final.log`) exited143 during E2E without a final result; its owned orphan verification server was identified and stopped before rerunning. This interrupted run is not reported as a pass.

The next full run (`verify-complete.log`) passed67 checks and exhausted the30-second budget in the monolithic Footer test after six route inspections and four navigation checks. Split that test into six route cases and one navigation case. All original assertions, four text-reflow cases and default timeouts remain. This makes80 E2E cases including the new motion coverage.

Suggested commit after user approval: `feat: redesign site and footer with Dodam-inspired styling`.

Final result: `npm run verify` exited0 with lint, strict typecheck,18 unit/component tests, production build and80 E2E passing (`verify-passed.log`). The isolated Footer suite passed22 cases. All five pages at320/390/768/1440 had no horizontal overflow or browser page errors; final desktop/mobile screenshots were visually inspected, including the Footer and200% reflow. Preview: http://127.0.0.1:3114/. Changes remain uncommitted for user approval.

## White and blue follow-up

The user requested a white/blue variation to distinguish this design from Dodam. Updated the shared palette, hero overlays/text, action buttons, diagrams, table surfaces, contact sections, Footer and fixed inquiry strip. Layout, font assets, motion, verified information and the original raster asset are unchanged. The photo presentation uses CSS grayscale/navy overlays on Home and luminosity blending in Business; the independent SVG diagram is recolored to silver-blue. Updated only the two color values in the existing header-transition assertions to match the requested design.

Colors: white `#ffffff`, surface `#f1f6fc`, ink `#162d4b`, muted `#53657d`, accent `#245fc7`, navy `#102b4e`, Footer `#f7f9fc`. Desktop1440/mobile390 screenshots of all five pages are saved as `blue-*.png`, with layout checks in `blue-layout-report.json`. Pre-change copies of the seven touched files are saved in `/home/shlee/Workspace/ai/01.codex/dodam-review/before-blue/` to reverse only the color follow-up without discarding the previous redesign. No commit/push/deployment. Suggested commit: `style: refine redesign with a white and blue palette`.

White/blue validation: full `npm run verify` passed lint, strict typecheck,18 unit/component tests, production build and80 E2E (`blue-verify.log`). Ten desktop/mobile page captures had no horizontal overflow or browser page errors and were visually inspected. Normal text/action color pairs were checked, including dark surfaces (`blue-contrast.json`); existing focus/motion/reflow behavior passed. Preview: http://127.0.0.1:3114/?preview=blue. No remaining validation failures; awaiting visual review.

## Header matches Footer — 2026-09-30

At the user's request, Header and Footer now share opaque `#f7f9fc` via `--shell-surface`. The Header keeps navy text at the opening, after scrolling and with an expanded mobile menu. The former Home transparency, light text and backdrop filters are removed; the scroll separator shadow remains. Existing two Header color expectations are updated. Full `npm run verify` passed18 unit/component tests and80 E2E plus lint, strict typecheck and production build (`header-match-verify.log`). Desktop/mobile inspection confirmed25 matching-color states across the five pages without overflow (`header-match-layout.json`, `header-match-*.png`). Preview: http://127.0.0.1:3114/?preview=header. Changes remain uncommitted.
