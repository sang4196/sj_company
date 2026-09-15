# TASK-004: Contact Page Information Architecture

## Status

Complete

## Context

Complete a factual Contact page so new business contacts can call or email `(주)승종` using verified contact information. Phone inquiry is the primary conversion.

## Scope

- Clear Contact page introduction
- Primary phone contact with a real `tel:` action
- Secondary email contact with a real `mailto:` action
- Confirmed company address
- Responsive, semantic, accessible information hierarchy
- Focused page and E2E coverage

## Out of Scope

- Changes to Home, About, Business, Products, or Careers
- Contact form, backend, database, or email sending
- Map, iframe, external map service, SDK, or dependency
- Business hours, visit guidance, representative, department, staff, fax, SNS, or chat channel
- Logo, brand colors, animation, and new dependencies
- Fabricated company or contact information

## Acceptance Criteria

- [x] Contact uses only confirmed contact information.
- [x] `(주)승종` and `031-674-3640` are visible.
- [x] Phone is the primary contact and links to `tel:031-674-3640`.
- [x] Email is visually secondary and links to `mailto:sjbjh3613@daum.net`.
- [x] The confirmed address is visible.
- [x] No contact form, map, iframe, or external map dependency is added.
- [x] No unconfirmed hours, person, department, visit, fax, SNS, or chat information is shown.
- [x] Phone contact is easy to use on mobile and clear on desktop.
- [x] Long email and address content do not cause horizontal overflow.
- [x] Phone and email links are keyboard accessible with visible focus.
- [x] Relevant tests pass.
- [x] Desktop Chromium E2E passes.
- [x] Mobile Chromium E2E passes.
- [x] `npm run verify` passes.

## Validation

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run test:run`
- [x] `npm run build`
- [x] `npm run test:e2e`

## Notes

- Keep Contact as a Server Component.
- Reuse contact values from `src/lib/site.ts`.
- Do not extract a generic contact component solely from similar page markup.
- Desktop and mobile layouts were visually reviewed after the automated checks.
