# Architecture

## Confirmed Stack

- Next.js with the App Router
- TypeScript with strict mode enabled
- Tailwind CSS
- ESLint
- Vitest and React Testing Library
- Playwright using Chromium

## Rendering Model

Use Server Components by default. Use a Client Component only when browser state, browser events, or browser-only APIs are required. Keep the client boundary as small as practical.

## Directory Responsibilities

- `src/app/`: App Router routes, layouts, and route-level composition
- `src/components/`: shared application components
- `src/ui/`: reusable UI primitives when they become necessary
- `src/lib/`: framework-independent helpers and shared utilities
- `src/styles/`: global styles
- `tests/e2e/`: browser-level user-flow and smoke tests
- `docs/`: product, architecture, and design decisions
- `tasks/`: backlog, the single current task, and its template

## Dependencies

Use existing platform and project tools before adding a dependency. Add a dependency only for a current, demonstrated need; do not add one for speculative future work.

## Testing Strategy

- Use Vitest for unit and component tests.
- Use React Testing Library to test observable user behavior rather than implementation details.
- Do not require tests for trivial static markup.
- Prioritize branches, state transitions, and user interactions.
- Use Playwright for critical browser behavior, routing, responsive behavior, and end-to-end flows.
- Run the production build before Playwright in the full validation pipeline.

Backend, database, API, and state-management architecture are TBD and must not be inferred until requirements exist.

## Responsive navigation focus — TASK-019

The existing navigation Client Component handles both breakpoint change and focusout from a newly hidden navigation control. Chromium can clear activeElement before dispatching matchMedia change; the focusout target preserves the identity of that disappearing control. Restoration is limited to a hidden navigation control, a null relatedTarget, an active document and the corresponding opposite breakpoint. It does not retain the last focused link or override an explicit focus destination. Both event listeners are removed on cleanup. Server Component boundaries and rendered markup are unchanged.
