# Codex Execution Contract

This file is the execution contract for every repository task. Code written does not mean a task is complete.

## Before Coding

Before making changes:

1. Read `tasks/current.md` and confirm the current task.
2. Read the relevant product, architecture, and design documentation.
3. Run `git status` and preserve unrelated user changes.
4. Inspect the relevant code.
5. Inspect the relevant tests.
6. Confirm the task's Acceptance Criteria.
7. Make a minimal change plan tied to those criteria.

## Coding Rules

- Keep TypeScript strict mode enabled.
- Do not use unnecessary `any` types.
- Do not use unnecessary type assertions.
- Do not hide problems by disabling lint rules.
- Use Server Components by default.
- Use Client Components only when browser state, browser events, or browser-only APIs are required.
- Do not perform refactors unrelated to the current task.
- Do not add a dependency when existing tools can solve the problem.
- Create abstractions only after real duplication or a demonstrated need exists.
- Do not create speculative structure for possible future requirements.

## Testing Rules

- Test user-observable behavior instead of implementation details.
- Do not force tests onto trivial static markup.
- Prioritize conditional branches, state changes, and user interactions.
- Never make a failing suite pass by deleting or skipping a valid test.

## Validation Rules

Before completing any task, run:

```sh
npm run verify
```

If validation fails:

1. Analyze the root cause.
2. Fix the relevant code or test.
3. Re-run the failed validation step.
4. After it succeeds, re-run the complete `npm run verify` pipeline.

Never report an unexecuted validation as successful. Report what was not run and the exact reason.

## Definition of Done

A task is complete only when all applicable conditions are satisfied:

- Acceptance Criteria are met.
- Lint passes.
- Type checking passes.
- Unit and component tests pass.
- The production build passes.
- Required E2E tests pass.
- Desktop and mobile primary views are checked for UI changes.
- The related task and documentation are current.
- There are no hidden or unreported failures.

```text
Code written != Task completed

Acceptance Criteria
+ Validation passed
= Task completed
```


## Server Ownership

- Never stop or restart a user-owned development server without explicit direction.
- Never terminate a process based only on the port it occupies; first establish ownership and purpose.
- Automated verification uses a separate production server managed by Playwright at `http://127.0.0.1:3100`; user development stays on port 3000.
- Agents may clean up only processes they started. On a port conflict, report it instead of terminating or reusing another process.
- Preserve Next.js-generated managed instruction blocks after checking their package source; do not repeatedly delete them to hide a diff. Keep user instructions outside those markers.

## Git Policy

- Do not commit changes unless explicitly requested.
- Do not push to remote repositories.
- Do not amend existing commits.
- Do not rebase branches.
- Do not run destructive Git commands such as reset --hard.
- Before completing a task, report git status and summarize the diff.
- Suggest a commit message for the completed task.
