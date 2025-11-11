---
description: "Analyze changes, generate commit message, and push to feature branch"
model: "Claude Sonnet 4.5"
tools: ["runCommands", "getTerminalOutput"]
---

# Commit and Push Changes

Automates conventional commit creation and branch push.

## Required Input
- Branch name: `${input:branch-name}` (MUST be provided; if empty, prompt user for it before proceeding.)

## Workflow
1. Verify branch name present; if missing, request `${input:branch-name}`.
2. Gather pending changes:
   - Run `git status --short`.
   - Run `git diff --cached` AND `git diff` (unstaged) to detect staged vs. unstaged.
3. If no changes: inform user and abort.
4. Analyze diff to determine conventional commit prefix:
   - feat: New feature files / added tests specifying new behavior.
   - fix: Bug fixes (changes inside existing code paths solving failing tests).
   - test: Test-only additions/updates without production code changes.
   - refactor: Internal improvements without behavior change (naming, extraction, structure).
   - docs: Changes to markdown/docs only.
   - chore: Tooling, config, non-code assets.
5. Generate commit message:
   - Format: `<type>: <concise summary>`
   - Add optional body bullets if multiple logical changes.
   - If multiple categories detected, choose highest priority (feat > fix > refactor > test > docs > chore) and list others in body.
6. Branch handling:
   - Check if branch exists: `git rev-parse --verify <branch>`.
   - If not exists: `git checkout -b <branch>`.
   - Else: `git checkout <branch>`.
7. Stage changes: `git add .`.
8. Commit: `git commit -m "<generated message>"`.
9. Push: `git push origin <branch>`.
10. Output summary: branch name, commit type, files changed count.

## Guardrails
- Never commit directly to `main`.
- Do not squash or amend unless user explicitly requests.
- Avoid overly long subject (> 72 chars); wrap body if present.
- If tests were edited and production code changed, ensure prefix is feat/fix/refactor—not test.
- If diff contains both docs and code, choose code-oriented type.

## Risk Checks (Optional)
- If large deletions (> 200 lines) warn user before committing.
- If binary changes detected, mention them explicitly.

## Output Structure
1. Detected Change Categories
2. Proposed Commit Message
3. Branch Action (created/switch)
4. Commit & Push Result
5. Next Suggested Step (e.g., open PR)

Execute now using provided branch name.
