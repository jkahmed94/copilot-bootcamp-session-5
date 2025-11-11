## Project Context

This is a full-stack TODO application designed for learning agentic development workflows with GitHub Copilot. The project consists of:

- **Frontend**: React application for managing TODO items
- **Backend**: Express.js REST API with in-memory data store
- **Development Focus**: Iterative, feedback-driven development with test-first approach
- **Current Phase**: Backend stabilization and frontend feature completion

## Documentation References

Consult these files for detailed project information:

- [docs/project-overview.md](../docs/project-overview.md) - Architecture, tech stack, and project structure
- [docs/testing-guidelines.md](../docs/testing-guidelines.md) - Test patterns and standards
- [docs/workflow-patterns.md](../docs/workflow-patterns.md) - Development workflow guidance

## Development Principles

Follow these core principles for all development work:

1. **Test-Driven Development**: Follow the Red-Green-Refactor cycle
   - Write the test first (RED)
   - Implement code to make it pass (GREEN)
   - Refactor for quality while keeping tests green (REFACTOR)

2. **Incremental Changes**: Make small, testable modifications
   - One feature or fix at a time
   - Verify each change before moving forward

3. **Systematic Debugging**: Use test failures as guides
   - Read error messages carefully
   - Trace issues to root causes
   - Fix systematically, not randomly

4. **Validation Before Commit**: Ensure quality at every step
   - All tests must pass
   - No lint errors
   - Code follows project conventions

## Testing Scope

This project uses **unit tests and integration tests ONLY**:

- **Backend**: Jest + Supertest for API testing
- **Frontend**: React Testing Library for component unit/integration tests
- **Manual Testing**: Browser testing for full UI verification

**Important Constraints**:
- **DO NOT** suggest or implement e2e test frameworks (Playwright, Cypress, Selenium)
- **DO NOT** suggest browser automation tools
- **Reason**: This lab focuses on unit/integration tests without e2e complexity

### Testing Approach by Context

- **Backend API changes**: 
  - Write Jest tests FIRST
  - Run tests (RED)
  - Implement code (GREEN)
  - Refactor (REFACTOR)

- **Frontend component features**:
  - Write React Testing Library tests FIRST for component behavior
  - Run tests (RED)
  - Implement code (GREEN)
  - Refactor (REFACTOR)
  - Follow with manual browser testing for full UI flows

**This is true TDD**: Test first, then code to pass the test.

## Workflow Patterns

Follow these established workflows for different tasks:

### 1. TDD Workflow
For all feature development and bug fixes:
1. Write or fix tests
2. Run tests → Expect failure (RED)
3. Implement minimal code to pass
4. Run tests → Verify success (GREEN)
5. Refactor for quality
6. Re-run tests → Ensure still passing

### 2. Code Quality Workflow
For addressing lint errors and code style:
1. Run linter to identify issues
2. Categorize issues by type and severity
3. Fix systematically (one category at a time)
4. Re-validate after each batch
5. Confirm all issues resolved

### 3. Integration Workflow
For end-to-end feature work:
1. Identify the issue or requirement
2. Debug and understand current state
3. Write tests for expected behavior
4. Fix or implement the feature
5. Verify end-to-end functionality

## Chat Mode Usage

Use specialized chat modes for different workflows:

- **tdd-developer**: Use for all test-related work and Red-Green-Refactor cycles
  - Writing new tests
  - Fixing failing tests
  - Implementing features with TDD approach
  - Debugging test failures

- **code-reviewer**: Use for addressing lint errors and code quality improvements
  - Running ESLint
  - Categorizing and fixing lint issues
  - Code style improvements
  - Ensuring code quality standards

## Memory System

- **Persistent Memory**: This file (`.github/copilot-instructions.md`) holds foundational principles & workflows.
- **Working Memory**: The `.github/memory/` directory captures evolving discoveries and patterns.
- During active development, log real-time hypotheses & findings in `.github/memory/scratch/working-notes.md` (NOT committed).
- At session end, summarize outcomes in `.github/memory/session-notes.md` (committed historical record).
- Promote reusable implementation or debugging strategies to `.github/memory/patterns-discovered.md` (committed catalog).
- When giving context-aware suggestions, reference patterns first, then session history, then persistent principles.

Refer to `.github/memory/README.md` for usage guidance and promotion workflow.

## Workflow Utilities

GitHub CLI commands are available for workflow automation (accessible to all modes):

### Issue Management Commands

- List open issues: `gh issue list --state open`
- Get issue details: `gh issue view <issue-number>`
- Get issue with comments: `gh issue view <issue-number> --comments`

### Exercise Navigation

- The main exercise issue will have "Exercise:" in the title
- Steps are posted as comments on the main issue
- Use these commands when `/execute-step` or `/validate-step` prompts are invoked

## Git Workflow

Follow conventional commit format and branch strategies:

### Conventional Commits

Use semantic commit prefixes:
- `feat:` - New features
- `fix:` - Bug fixes
- `chore:` - Maintenance tasks
- `docs:` - Documentation changes
- `test:` - Test-related changes
- `refactor:` - Code refactoring without behavior changes

### Branch Strategy

- **Feature branches**: `feature/<descriptive-name>`
- **Bug fixes**: `fix/<descriptive-name>`
- **Main branch**: Protected, always stable

### Commit Process

1. Stage all changes: `git add .`
2. Commit with conventional format: `git commit -m "feat: add user authentication"`
3. Push to the correct branch: `git push origin <branch-name>`

### Best Practices

- Write clear, descriptive commit messages
- Keep commits focused on a single logical change
- Verify tests pass before committing
- Push regularly to avoid losing work
