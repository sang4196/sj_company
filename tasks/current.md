# TASK-005: Business Page & Confirmed Manufacturing Capabilities

## Status

Complete

## Context

Synchronize newly human-confirmed manufacturing capabilities and implement a factual Business page for new business contacts. Current OEM production is publishable; historical large-volume OEM sales remain verification-required.

## Scope

- Update product, content inventory, and design-system constraints for confirmed business capabilities
- Present product design, mold design and production, and urethane molding and foaming
- Explain customer drawing and product-idea inputs
- Present linked design-to-manufacturing capability without implying a mandatory process
- Present custom-shape production and current OEM production
- Connect the representative product and verified contact paths
- Add focused page and Desktop/Mobile E2E coverage

## Out of Scope

- Detailed UI changes to Home, About, Products, Contact, or Careers
- First-development, large-volume sales, customer, patent, certification, performance, quality, safety, environmental, capacity, or facility claims
- ODM, price, MOQ, delivery, or unconditional manufacturing guarantees
- Product catalog expansion, images, form, backend, database, map, or animation
- Brand colors, fonts, logo, dependencies, or unnecessary client-side code

## Acceptance Criteria

- [x] Documentation matches the newly confirmed business information.
- [x] Current OEM production is distinct from the unverified historical large-volume OEM sales claim.
- [x] Visitors can understand the product and mold design and production scope.
- [x] Visitors can understand urethane molding and foaming, custom-shape production, and current OEM production.
- [x] The page communicates that design and manufacturing may be linked.
- [x] The page does not guarantee that every specification or order can be produced.
- [x] No unverified performance, patent, capacity, customer, or sales claim is introduced.
- [x] Verified phone and email contact paths are provided.
- [x] Other page content is not changed unintentionally.
- [x] Desktop and mobile reading order and links are usable.
- [x] Relevant tests and existing regression tests pass.
- [x] `npm run verify` passes.

## Validation

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run test:run`
- [x] `npm run build`
- [x] `npm run test:e2e`

## Notes

- Keep Business as a Server Component.
- Reuse contact values from `src/lib/site.ts` without changing shared company copy.
- Treat the provided Business copy as an implementation draft based on confirmed facts, not final marketing-copy approval.
- Business production screenshots and Home desktop/mobile regression screenshots were reviewed.
