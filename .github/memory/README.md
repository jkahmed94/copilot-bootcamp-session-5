# Memory System# Memory System



## Purpose## Purpose

Track patterns, decisions, and lessons learned during development to accelerate future work, reduce repeated reasoning, and improve consistency.The memory system augments development by capturing patterns, decisions, and lessons learned as you work. It provides two complementary layers of knowledge:



You have TWO knowledge layers:- **Persistent Memory**: Long-lived principles and workflows stored in `./.github/copilot-instructions.md`. These rarely change and guide overall behavior.

- **Persistent Memory**: `./.github/copilot-instructions.md` – stable principles, workflows, guardrails.- **Working Memory**: Ephemeral, session-specific discoveries stored in `./.github/memory/`. These evolve rapidly and inform immediate next steps.

- **Working Memory**: `./.github/memory/` – evolving discoveries, session summaries, emerging patterns.

## Components & Directory Structure

## Directory Structure```

```.github/memory/

.github/memory/  README.md                ← This documentation

  README.md                ← How the memory system works (this file)  session-notes.md         ← Historical session summaries (committed)

  session-notes.md         ← Historical session summaries (committed)  patterns-discovered.md   ← Accumulated reusable patterns (committed)

  patterns-discovered.md   ← Catalog of reusable patterns (committed)  scratch/

  scratch/    .gitignore             ← Ignores all scratch artifacts

    .gitignore             ← Ignore everything inside scratch    working-notes.md       ← Active session notes (NOT committed)

    working-notes.md       ← Ephemeral active session notes (NOT committed)```

```

### File Roles

## File Roles & When to Use Them| File | Lifecycle | Purpose | Commit Policy |

| Activity | Use `working-notes.md` | Promote to `patterns-discovered.md` | Summarize in `session-notes.md` ||------|-----------|---------|---------------|

|----------|------------------------|--------------------------------------|----------------------------------|| `copilot-instructions.md` | Persistent | Foundational principles & workflows | Committed |

| TDD (RED) failing tests | Capture hypotheses, failing test names, stack traces | If a repeatable fix/idiom emerges | At end: what passed, major decisions || `session-notes.md` | Growing history | Summaries of completed dev sessions | Committed |

| Lint cleanup | Note recurring rule triggers & approach | Generalizable refactor strategies | Summarize batch cleanup impact || `patterns-discovered.md` | Cumulative | Canonical reusable code/process patterns | Committed |

| Debugging runtime issues | Log reproduction steps & discarded theories | Diagnostic technique or safeguard | Outcome + root cause || `scratch/working-notes.md` | Ephemeral | Real-time thinking space during active work | NOT committed |

| Feature implementation | Track mini subtasks & edge cases found | Architectural or API usage patterns | Feature completion recap |

## When to Use Each File

## Lifecycle & Commit Policy### During TDD (Red-Green-Refactor)

| File | Volatility | Commit? | Description |- While tests are failing (RED), jot hypotheses & observations in `scratch/working-notes.md`.

|------|------------|---------|-------------|- When a breakthrough pattern is identified (e.g., repeated validation approach), promote it to `patterns-discovered.md`.

| `copilot-instructions.md` | Low | Yes | Stable foundational guidance |- At completion of a feature/test cycle, summarize the session in `session-notes.md`.

| `session-notes.md` | Medium (append-only) | Yes | Historical timeline of completed work |

| `patterns-discovered.md` | Medium (curated) | Yes | Canonical shared patterns |### During Linting / Code Quality Passes

| `scratch/working-notes.md` | High (frequent edits) | No | Real-time thought space |- Log recurring ESLint rule conflicts or resolution strategies in `scratch/working-notes.md`.

- Convert stable resolution strategies (e.g., preferred refactor style) into a pattern entry.

## How AI Uses These- Summarize major cleanup sessions and rationale in `session-notes.md`.

1. **Primary Guardrails**: Persistent principles from `copilot-instructions.md`.

2. **Contextual Recall**: Patterns in `patterns-discovered.md` influence suggestions (naming, structure, validations).### During Debugging

3. **Historical Awareness**: `session-notes.md` informs rationale (why decisions were made) and prevents regressions.- Capture failing scenarios, reproduction steps, and discarded hypotheses in `scratch/working-notes.md`.

4. **Ephemeral Guidance**: `scratch/working-notes.md` only used if explicitly referenced (avoid noise unless requested).- When a root cause reveals a reusable diagnostic technique or safeguard, record it in `patterns-discovered.md`.

- After resolving a significant bug, add a concise retrospective to `session-notes.md`.

Priority order when generating suggestions: Patterns > Session Notes > Persistent Principles > Scratch.

## Workflow Integration

## Promotion Workflow1. Start task → Open `scratch/working-notes.md` → Define Current Task & Approach.

1. Capture freely in `scratch/working-notes.md` while working.2. Capture findings live as you iterate (tests, logs, edge cases).

2. Ask: Is this reusable beyond this task?3. Promote durable insights:

   - Yes → Add formal entry to `patterns-discovered.md`.   - From scratch → to `patterns-discovered.md` (if reusable)

3. Ask: Does this conclude a meaningful unit of work (feature, fix, cleanup)?   - From scratch → to `session-notes.md` (summary at end)

   - Yes → Append summary to `session-notes.md`.4. AI references:

4. Leave transient brainstorm & false starts in scratch only.   - Foundational rules: `copilot-instructions.md`

   - Recent patterns: `patterns-discovered.md`

### Promotion Checklist   - Historical context: `session-notes.md`

Move an item OUT of scratch only if:

- It solved a class of problems (not just one instance).## Promotion Criteria

- It improves onboarding clarity or prevents future mistakes.Use this checklist before moving content out of scratch:

- It has a minimal reproducible example.- Does it apply beyond the immediate task? → Move to `patterns-discovered.md`.

- Will future contributors benefit from this narrative? → Add to `session-notes.md`.

## Authoring Guidelines- Is it still uncertain or experimental? → Keep in `scratch/working-notes.md`.

### Patterns (`patterns-discovered.md`)

Each pattern should contain: Name, Context, Problem, Solution, Example (minimal), Related Files, Notes. Keep code concise and idiomatic.## How AI Uses These Files

- **Prioritization**: Patterns > Session summaries > Scratch (only if surfaced by user).

### Session Notes (`session-notes.md`)- **Suggestion Context**: Patterns inform code scaffolding; session notes inform strategic choices; persistent instructions constrain overall behavior.

Append entries in chronological order. Past tense, factual. Reference pattern names when they were added.- **Conflict Resolution**: If a pattern conflicts with persistent principles, AI defers to persistent memory unless pattern is explicitly accepted and principles updated.



### Working Notes (`scratch/working-notes.md`)## Authoring Guidelines

Fast capture: bullets, timestamps, raw hypotheses. Refactor clarity only when promoting.### Patterns (`patterns-discovered.md`)

- One pattern per section with clear heading.

## Using During Workflows- Include problem context + concise solution + minimal code example.

- **TDD**: Log failing test names + root cause trace in scratch. Promote recurring fix patterns (e.g., initialization strategy).

- **Linting**: Track recurring ESLint rules (e.g., no-unused-vars strategy). Promote consistent refactor approach.### Session Notes (`session-notes.md`)

- **Debugging**: Record reproduction steps early; after discovering a generalizable guard (e.g., null check), promote pattern.- Keep chronological order (append at bottom).

- Use past tense; avoid speculative content—move speculation to scratch.

## Session Close Routine

1. Review scratch notes → highlight durable insights.### Scratch Working Notes

2. Update `patterns-discovered.md` (add or refine entries).- Prefer bullet lists & timestamps for rapid capture.

3. Append a structured summary to `session-notes.md`.- Purge obsolete fragments as clarity improves.

4. Optionally prune or archive scratch sections (keep file lightweight).

## Session Close Checklist

## Difference: `session-notes.md` vs `scratch/working-notes.md`Before ending a working session:

- `session-notes.md`: Curated, committed history; stable reference.1. Review `scratch/working-notes.md`.

- `scratch/working-notes.md`: Volatile, uncommitted sandbox for immediate cognition.2. Extract durable patterns → update `patterns-discovered.md`.

3. Write a summary block in `session-notes.md`.

## Example Flow4. Leave scratch file ready for next task (clear or archive section).

1. Encounter null access error on todos list → note in scratch.

2. Realize fix pattern: Always initialize collections as empty arrays → add to patterns.## Example Flow

3. Finish implementing POST endpoint + tests → write session summary.1. Discover API initialization bug → note in scratch.

2. Realize pattern: Always initialize collections to empty arrays → promote to patterns.

## Anti-Patterns3. Finish backend stabilization sprint → summarize in session notes.

- Duplicating same idea in multiple places.

- Promoting vague or one-off fixes as patterns.## Difference: Session vs Scratch

- Leaving large obsolete sections in scratch.- `session-notes.md` is a curated, stable record: committed to version control.

- `scratch/working-notes.md` is volatile and noisy: intentionally excluded from version control to encourage rapid iteration without churn.

## Quick Start

1. Open `scratch/working-notes.md` → Fill "Current Task".## Encouraged Practices

2. Work through Red-Green-Refactor → Capture insights.- Update patterns early—avoid letting insights stagnate in scratch.

3. Promote reusable concepts → Commit persistent files.- Reference pattern names in commits (e.g., "fix: apply Collection Init pattern").

4. Append session summary → Continue next task.- Keep examples minimal and idiomatic.



Leverage this system to keep thinking fast while preserving durable value.## Anti-Patterns
- Duplicating the same insight in multiple sections.
- Allowing scratch notes to become long-term storage.
- Writing vague patterns (must have clear problem + solution).

## Quick Start
1. Open `scratch/working-notes.md` and fill Current Task.
2. Work through TDD cycle; log findings.
3. Promote reusable insights.
4. Append session summary.
5. Commit updated persistent files.

---
Use this memory system to accelerate informed, consistent development while keeping noise isolated from durable knowledge.