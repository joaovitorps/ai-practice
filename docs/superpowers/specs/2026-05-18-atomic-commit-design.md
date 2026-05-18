# Atomic Commit Skill — Design Spec

## Overview
An intelligent commit assistant that enforces **atomic commits** with **Conventional Commits** formatting. It analyzes working tree changes, validates atomicity, suggests splits when needed, and stages/commits only after explicit user approval. Combines principles from Conventional Commits spec, atomic commit best practices, and safety protocols.

## Trigger Phrases
Auto-activates on: `"commit"`, `"create commit"`, `"atomic commit"`

## Architecture

```
┌─────────────┐
│   TRIGGER   │ ── User says trigger phrase
└──────┬──────┘
       ▼
┌─────────────┐
│ GIT STATUS  │ ── Run `git status --porcelain` + `git diff`
│  & DIFF     │
└──────┬──────┘
       ▼
┌─────────────┐
│  SAFETY     │ ── Scan diff output for secrets (.env, credentials, keys)
│   CHECK     │   Abort if detected without explicit override
└──────┬──────┘
       ▼
┌─────────────┐
│ ATOMICITY   │ ── Analyze if changes represent ONE logical concern
│   CHECK     │   If NO → flag mixed changes, suggest per-commit splits
└──────┬──────┘
       ▼
┌─────────────┐
│   SPLIT     │ ── Show file + line ranges per proposed commit
│  (if needed)│   User decides how to group
└──────┬──────┘
       ▼
┌─────────────┐
│  GENERATE   │ ── Apply Conventional Commits spec
│   MESSAGE   │   Suggest type, scope, description, optional body/footer
└──────┬──────┘
       ▼
┌─────────────┐
│ VALIDATE    │ ── Check completeness, formatting, atomicity compliance
└──────┬──────┘
       ▼
┌─────────────┐
│   PREVIEW   │ ── Show final message + exact files/lines to be committed
└──────┬──────┘
       ▼
┌─────────────┐
│ USER EDIT   │ ── User can override type/scope/description
│  & APPROVE  │   Then confirms or aborts
└──────┬──────┘
       ▼
┌─────────────┐
│  EXECUTE    │ ── `git add` (specific files/hunks) + `git commit`
└─────────────┘
```

## Components

### 1. Safety Check (runs after Git Status & Diff)
- Scans the `git diff` output from the previous step for sensitive patterns
- Checks file names: `.env`, `.env.*`, `credentials.json`, `secrets.json`, `*.pem`, `*.key`, `id_rsa`, `private-key*`
- Checks diff content for patterns: `password=`, `api_key=`, `token=`, `secret=`, `private_key=`
- If detected → warn user and require explicit confirmation to proceed
- Never commit secrets without explicit override

### 2. Git Analysis
- `git status --porcelain` — list modified files
- `git diff` — inspect unstaged changes
- `git diff --staged` — inspect already-staged changes
- Determine if changes are staged, unstaged, or mixed

### 3. Atomicity Analysis
**Atomic commit rules (from Medium article):**
- One logical unit of change per commit
- Leaves codebase in working state
- Doesn’t mix concerns (no formatting + logic together)
- Small, focused, safe to build upon
- Descriptive summaries focusing on WHY not WHAT

**Mixed change detection:**
- Multiple distinct features in diff → suggest split
- Refactoring + bug fix in same diff → suggest split
- Style/formatting mixed with logic → suggest split
- Changes across unrelated modules → suggest split

### 4. Split Suggestion
When mixed changes detected:
- Propose logical groupings
- Show per-commit preview (if the full file will go to the commit, the line info can be omitted):
  ```
  Commit 1: feat: add JWT authentication
  - src/auth/jwt.ts#L1-50
  - src/middleware/auth.ts#L10-25

  Commit 2: fix: correct button alignment on mobile
  - src/components/Button.tsx
  ```
- User decides to split or proceed as-is

### 5. Message Generation (Conventional Commits)
**Format:**
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
| Type       | Purpose                        |
|------------|--------------------------------|
| `feat`     | New feature                    |
| `fix`      | Bug fix                        |
| `docs`     | Documentation only             |
| `style`    | Formatting/style (no logic)    |
| `refactor` | Code refactor (no feature/fix) |
| `perf`     | Performance improvement        |
| `test`     | Add/update tests               |
| `build`    | Build system/dependencies      |
| `ci`       | CI/config changes              |
| `chore`    | Maintenance/misc               |
| `revert`   | Revert commit                  |

**Rules:**
- Imperative mood: "add", "fix", "remove" — not "added", "adds", "adding"
- Subject ≤50 chars when possible, hard cap 72
- No trailing period
- Body only when WHY isn't obvious
- Body wrap at 72 chars
- Reference issues at end: `Closes #42`, `Refs #17`
- Breaking changes: `!` after type/scope OR `BREAKING CHANGE:` footer
- `BREAKING-CHANGE` synonymous with `BREAKING CHANGE` in footers
- Multiple body paragraphs allowed
- Multiple footers allowed
- Case-insensitive types (except BREAKING CHANGE must be uppercase)

**Body required for:**
- Breaking changes
- Security fixes
- Data migrations
- Reverts
- Non-obvious WHY

### 6. Validation
- Type is one of allowed values
- Description is present and imperative
- Scope aligns with changed files
- No mixed logical changes (or user acknowledged split)
- Breaking changes properly marked
- Message is complete

### 7. User Approval
- Show full commit message
- Show exact files/lines to be committed
- Allow user to edit type/scope/description
- User confirms or aborts

### 8. Execution
- Stage specific files (or hunks via `git add -p` if needed)
- Run `git commit -m "message"` with multi-line support
- Never use `--no-verify` without explicit request
- If commit fails due to hooks, fix and create NEW commit (don't amend)

## Git Safety Protocol
- NEVER update git config
- NEVER run destructive commands (`--force`, hard reset) without explicit request
- NEVER skip hooks (`--no-verify`) unless user asks
- NEVER force push to main/master
- NEVER commit secrets without explicit override
- If commit fails due to hooks, fix and create NEW commit (don't amend)

## Data Flow
1. User triggers skill
2. Skill reads git state (status + diff)
3. Skill analyzes atomicity
4. Skill generates/suggests commit(s)
5. Skill validates
6. Skill presents preview for approval
7. User edits/approves
8. Skill executes git commands
9. Skill reports success/failure

## Error Handling
- **No changes detected:** Inform user and exit
- **Secrets detected:** Warn and require explicit override
- **Mixed changes:** Suggest split, user decides
- **Empty message:** Re-prompt
- **Invalid type:** Re-prompt with allowed types
- **Commit hook failure:** Fix issues, create new commit
- **Git not initialized:** Inform user and exit

## Testing Strategy
- RED: Run subagent without skill on mixed changes → expect agent to create non-atomic commit
- GREEN: Run subagent with skill on mixed changes → expect agent to suggest split
- Test trigger phrases: "commit", "create commit", "atomic commit"
- Test conventional commits formatting compliance
- Test atomicity validation
- Test secret detection
- Test user override capability

## Boundaries
- Only operates on current git working directory
- Requires user approval before any `git` mutation
- Does not push to remote
- Does not amend commits
- Does not squash
- "stop atomic-commit" or "normal mode" reverts to standard behavior

## Dependencies
- Git installed and configured
- Working directory is a git repository

## Related Skills
- `caveman-commit`: Terse commit message generator (no atomicity checks)
- `conventional-commit`: XML-formatted commit prompts (auto-executes without approval)
- `git-commit`: Auto-detects type/scope, intelligent staging, safety protocols
