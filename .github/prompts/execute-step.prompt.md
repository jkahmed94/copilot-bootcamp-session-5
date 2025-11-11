---
description: "Execute instructions from the current GitHub Issue step"
mode: "tdd-developer"
model: "Claude Sonnet 4.5"
tools: ["codebase", "search", "problems", "editFiles", "runCommands", "getTerminalOutput", "testFailure"]
---

# Execute Current Exercise Step

This prompt automates performing the activities listed in the latest exercise issue step.

## Inputs
- Optional issue number: `${input:issue-number}` (leave empty to auto-discover)

## High-Level Workflow
1. Identify target exercise issue (either by number or by searching titles containing `Exercise:`).
2. Fetch issue content with all comments.
3. Parse the latest step block (highest numbered `# Step X-Y:` or the most recent new step comment).
4. Extract each `:keyboard: Activity:` section in order.
5. For each activity, perform TDD-compliant actions:
   - If implementing new feature: WRITE TEST FIRST (RED), run tests to confirm failure, implement minimal code (GREEN), refactor (REFACTOR).
   - If fixing existing failing tests: analyze failure output, minimal code fix, rerun tests, refactor.
6. Never introduce e2e frameworks (Playwright/Cypress/Selenium/etc.). Stick to Jest + Supertest (backend) and React Testing Library (frontend).
7. Do not commit or push—defer to `/commit-and-push` prompt.
8. When all activities processed, instruct user to run `/validate-step`.

## Detailed Execution Algorithm
1. Resolve issue number:
   - If `${input:issue-number}` provided → use it.
   - Else: run `gh issue list --state open` and select the issue whose title starts with or contains `Exercise:`.
2. Retrieve full issue with comments: `gh issue view <issue> --comments`.
3. Parse markdown:
   - Find all occurrences of `# Step ` followed by pattern `\d+-\d+`.
   - Select the last (numerically or positionally latest) step block.
4. Within selected step, locate lines starting with `:keyboard: Activity:`. For each activity:
   - Summarize intent.
   - Determine if new feature or fix (look for keywords: "implement", "add", "create" → new feature; "fix", "failing", "error" → existing tests).
   - If new feature: generate proposed test(s) first (do not implement code yet). Apply test file changes. Run tests; capture failures; explain.
   - If fixing: run relevant test(s) (targeted by name or file) to capture current failure output; analyze.
   - Suggest minimal patch; apply; rerun tests.
   - If green: offer small refactor (dedup, naming, extraction) and verify tests remain green.
5. After all activities:
   - Provide summary: tests added, tests passing, refactors applied.
   - Instruct user: "/validate-step" next.

## Constraints & Guardrails
- TEST FIRST for new features.
- Avoid speculative large refactors before GREEN.
- Never suggest unsupported tooling (NO e2e frameworks, NO new test runners).
- Keep patches surgical; avoid unrelated formatting changes.
- If activity ambiguous: state assumption(s) (max 2) and proceed; highlight them to user.

## Output Structure Per Activity
1. Activity Title & Classification (New Feature | Fix Existing Tests)
2. Planned Test(s) or Failure Analysis
3. Actions Taken (test added, code patch details)
4. Test Run Result (RED/GREEN status)
5. Refactor (if applied)
6. Next Step (or completion notice)

## Memory Integration (Optional Only if User Requests)
- After completing a coherent feature/bug fix, offer to append session notes entry.

Proceed with automated step execution now.
