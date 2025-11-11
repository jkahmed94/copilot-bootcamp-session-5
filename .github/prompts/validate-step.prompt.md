---
description: "Validate that all success criteria for the current step are met"
mode: "code-reviewer"
model: "Claude Sonnet 4.5"
tools: ["codebase", "problems", "runCommands", "getTerminalOutput"]
---

# Validate Exercise Step Success Criteria

Checks whether the specified step's success criteria have been satisfied.

## Required Input
- Step number (e.g. `5-0`, `5-1`): `${input:step-number}` (MANDATORY)

## High-Level Workflow
1. Confirm `${input:step-number}` provided; if missing, abort with request for it.
2. Locate main exercise issue:
   - Run `gh issue list --state open` and select the one with title containing `Exercise:`.
3. Fetch issue & comments: `gh issue view <issue> --comments`.
4. Parse markdown to find the block starting with `# Step ${input:step-number}:`.
5. Extract the section labeled `Success Criteria` (until next heading or step marker).
6. Enumerate each criterion as a checklist item.
7. For each criterion:
   - Identify required verification method: code inspection, lint run, test run, build check, file presence.
   - Run targeted commands (e.g., `npm run lint`, `npm test --workspace packages/backend`, etc.) only if needed.
   - Map outputs to pass/fail.
8. Report comprehensive status:
   - Passed items with brief confirmation.
   - Failed items with: reason, evidence, suggested remediation steps.
9. If all pass: provide readiness note for next step or commit/push if not done.
10. If any fail: advise re-running `/execute-step` focused on incomplete criteria.

## Detailed Parsing Notes
- Success Criteria section detection heuristic:
  - Start line matches `Success Criteria` (case-insensitive) or a heading `### Success Criteria`.
         - Collect subsequent lines that belong to the section.
            - Stop collecting when you encounter one of the following:
               - A blank line immediately followed by a line starting with #
               - A line starting with :keyboard:
               - The end of the step block
- Criteria bullet markers: `-`, `*`, or numbered list.

## Verification Strategies Examples
- "All POST tests pass" → Run backend test suite or targeted test pattern; confirm zero failures.
- "No ESLint errors" → `npm run lint` exit status & absence of errors in output.
- "Toggle functionality works both ways" → Look for associated test names (search in backend tests) and ensure they pass.
- "Frontend shows empty state message" → Check presence of test asserting empty state render; if missing, flag as unverifiable (suggest test addition).

## Guardrails
- Do NOT modify files here—validation only.
- Never introduce new tooling or frameworks.
- If criterion unverifiable (no test, ambiguous wording), clearly state limitation and recommend adding explicit test.
- Avoid running full test suites multiple times; reuse earlier command output where possible.

## Output Structure
1. Step Header (Step ${input:step-number})
2. Criteria Checklist Table (Status: PASS/FAIL/UNVERIFIABLE)
3. Failures Detail Section
4. Recommendations (targeted next actions)
5. Overall Summary (Ready / Not Ready)

## Memory Integration (Optional upon user request)
- If all criteria pass and represents a coherent unit, offer to append a session notes entry.

Proceed with validation now.
