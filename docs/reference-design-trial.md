# Reference design trial

## Approval and Git handoff

2026-09-19: User reviewed the softened design and explicitly requested verification, commit and push. This supersedes the earlier local-trial-only and no-push instructions for this revision. Approved scope includes the abstract Home artwork, self-hosted SUIT font and license, simplified five-page composition, shared styles and related documentation. Production deployment may follow the existing main-branch integration.


## Reference and rollback boundary

User-supplied reference: https://www.asml.com/en, inspected 2026-09-19 using the page and a rendered desktop screenshot. Adopted high-level design principles only: broad opening composition, editorial headings, column guides, asymmetrical blocks, blue/white contrast and restrained link accents. No reference-site media/identity/content is copied. No company capabilities are inferred from the reference.

Initial repository clean at `46a869f`. All trial edits remain uncommitted. Rollback should revert only this trial's modifications and its new asset/document, preserving later changes. Earlier manufacturing-photo experiment remains removed. Existing tests and verified product/registration/SEO content are preserved.

## Original artwork

Built-in image_gen generated an abstract metal-form composition, explicitly not a machine, facility or product. Public asset: `public/visuals/form-study.webp` (1600×900, 85158 bytes), converted to WebP using installed Sharp at quality85. Original remains at `/mnt/c/Users/sang4/.codex/generated_images/01a0b4e3-920d-73b1-bcba-41cffb4dda6b/exec-a6428fca-d3e8-4f43-bb25-f6d1268c1d24.png`. Hero includes visible `형태와 소재를 표현한 AI 그래픽` credit; image is decorative CSS background and all essential text remains HTML. No animation or extra dependency.

Prompt: Use case: stylized-concept. Asset type: original abstract editorial hero artwork for a small Korean design and manufacturing company website. Wide 16:9 landscape, no text. A striking macro sculptural composition of several interlocking curved metallic ribbons and solid precision-cut rounded rectangular forms, dark graphite brushed aluminum surfaces with restrained electric cobalt blue reflections and a thin warm ivory highlight. Forms cluster on the RIGHT half, extending beyond the right and bottom edges. LEFT half is nearly empty deep midnight navy for white website headline overlay. Elegant contemporary industrial design study, tangible fine metal grain, soft cinematic sidelight, clear dimensional depth, not neon sci-fi. Background midnight blue-black. This is clearly an abstract sculptural artwork, NOT a factory, NOT machinery, NOT a chip or actual product. No tools, workers, buildings, logos, text, watermark, interface, grids, sparks, smoke or familiar brand shapes. Sophisticated restrained geometric composition with one strong curved sweep, avoid chaotic tangle, suitable for a premium editorial website opening scene. Produce only the background artwork, not a website mockup.

## Review

Screenshots and verification logs are outside the repository at `/home/shlee/Workspace/ai/01.codex/asml-review/`. User visual approval remains pending. No commit/push/deployment.

Validation completed: lint, strict typecheck, 11 unit/component tests, production build and 58 E2E passed via npm run verify. Existing non-failing jsdom navigation/NO_COLOR warnings remain. Captured all five routes at widths 320, 390, 768 and 1280 with no horizontal overflow; visually inspected desktop/mobile pages. Existing tests cover 200% Home/Footer text reflow and keyboard navigation. Before/after screenshot filenames use before- or after-{route}-{width}.png. Local trial preview runs on port 3110; baseline preview on 3109 remains available.

## Softer composition revision

Following user feedback, removed repeated English section labels and decorative numbering, ornamental section/fact-list borders and intro grid backgrounds. Softened headings to ink, backgrounds to warm neutral shades, product/process/contact panels with restrained rounding. Specification and registration rules remain. First validation exposed a generated arrow becoming part of a link accessible name on404; removed that decoration without changing tests. The affected Desktop/Mobile404 recovery tests then passed. Final full verification and updated preview recorded in tasks/current.md.
