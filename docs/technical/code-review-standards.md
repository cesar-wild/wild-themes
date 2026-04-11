# Wild Agents — Code Review Standards

**Owner:** Vigia (QA Lead)
**Last updated:** 2026-04-11

This document defines the code review process, responsibilities, and standards for all code changes in the Wild Agents repositories.

---

## Who Reviews What

| Author | Reviewer | Notes |
|---|---|---|
| Forja (Lead Engineer) | Vigia (QA) | All theme and plugin PRs require QA sign-off |
| Any agent | Forja or Vigia | One review minimum for all PRs to `main` |
| Vigia (docs changes) | Forja or Lobo | Peer review on technical docs |

**Rule:** No agent merges their own PR. At least one review from a different pack member is required.

---

## Reviewer Responsibilities

Reviewers are responsible for:

1. **Correctness** — Does the code do what it claims? Are there off-by-ones, missing edge cases, or wrong logic?
2. **Safety** — Does the code introduce security vulnerabilities, data loss risks, or secret exposure?
3. **Conventions** — Does the code follow the standards in this document and `docs/dev-workflow.md`?
4. **Completeness** — Is the implementation complete, or are there TODO stubs left behind?
5. **Documentation** — Is any changed behavior reflected in updated docs?

Reviewers are **not** responsible for:
- Polishing the author's personal style choices within convention bounds
- Approving work they do not understand (ask questions; request clarification before approving)

---

## PR Requirements

Every pull request must have:

- [ ] A clear title following Conventional Commits: `feat(theme):`, `fix(plugin):`, `docs:`, `chore:`, etc.
- [ ] A description explaining **what** changed and **why**
- [ ] Link to the Paperclip issue (e.g., `Closes MRW-14`)
- [ ] For themes: link to staging preview URL
- [ ] For plugins: link to test results or staging verification
- [ ] All CI/validation checks passing (`scripts/validate.sh` at minimum)
- [ ] No merge conflicts with `main`
- [ ] All commits include `Co-Authored-By: Paperclip <noreply@paperclip.ing>`

---

## Code Standards

### CSS / Theme Files

- All color values must use OKLCH tokens (`--color-<role>-<l|c|h>`).
- No hardcoded hex, rgb(), hsl(), or named colors.
- No `!important` on platform system tokens.
- No layout-affecting properties (margin, padding, display, grid) — themes are color-only.
- No `@import` fetching external resources.
- No animations or transitions (theme scope is tokens only).
- File must parse without errors.

### JSON Manifests

- Must be valid, parseable JSON.
- All required fields present (`id`, `name`, `description`, `version`, `author`).
- IDs must be lowercase, hyphen-separated.
- Versions must follow semver.

### Shell Scripts

- Use `set -e` (fail fast on errors).
- Quote all variables: `"$VARIABLE"` not `$VARIABLE`.
- No hardcoded credentials or environment-specific paths.
- Error messages go to stderr (`>&2`).
- Exit with a non-zero code on failure.

### JavaScript / TypeScript (Plugins)

- No `eval()` or `new Function()`.
- No `innerHTML` or `dangerouslySetInnerHTML` with unsanitized input.
- No hardcoded API keys or secrets.
- All async errors caught (no unhandled promise rejections).
- Use the SDK-provided API client — no direct `fetch` to internal platform endpoints.
- Dependencies: no packages with known critical CVEs.

---

## Prohibited Patterns (Any File Type)

The following are immediate review blockers — do not approve PRs containing these:

| Pattern | Why |
|---|---|
| Hardcoded API keys, tokens, passwords | Security: secret exposure |
| `git commit --no-verify` in scripts | Bypasses safety checks |
| `force push` to `main` | Destroys history |
| `eval()` with user-controlled input | Code injection |
| Remote `@import` in CSS | External dependency, CSP violation |
| `rm -rf` without explicit scope guard | Destructive risk |
| `TODO: fix later` in production code | Incomplete work shipped |
| Commented-out code blocks > 5 lines | Code debt; delete or keep |

---

## Review Timeline

- **Critical / High priority issues:** Review within 4 hours.
- **Standard PRs:** Review within 24 hours.
- **If reviewer is unavailable:** Escalate to Lobo.

Reviews that are not completed within the timeline should be flagged in the relevant Paperclip issue, not left silently blocking.

---

## Giving Feedback

### Severity labels for comments

Use prefixes to communicate urgency:

| Prefix | Meaning |
|---|---|
| `[blocker]` | Must be fixed before merge |
| `[suggestion]` | Recommended but not required |
| `[nit]` | Cosmetic — author decides |
| `[question]` | Reviewer needs clarification before approving |

Example:
```
[blocker] This hardcodes the staging URL. Use the env variable instead.

[suggestion] This loop could be simplified with Array.map().

[nit] Minor: prefer single quotes for consistency with the rest of the file.
```

### Tone

- Be specific and actionable. "This is wrong" is not feedback. "This will fail when `x` is null because the check at line 42 doesn't guard for that case" is.
- Critique the code, not the author.
- If you're unsure whether something is a bug or a design choice, use `[question]`.

---

## Approving and Merging

- Only approve if you have read and understood the full diff.
- Do not approve to unblock; approve because the code is correct.
- Once approved, the **author** merges (not the reviewer), after verifying CI is green.
- Squash merge is preferred to keep `main` history clean, unless the branch has meaningful commit history worth preserving.

---

## Post-Merge

After merge to `main`:

1. Verify staging deployment succeeds (for themes/plugins).
2. Confirm the relevant Paperclip issue is closed.
3. If a bug was fixed, Vigia re-validates the fix on staging before closing.

---

## Escalation

If a PR is stuck in review for > 24 hours, or if reviewer and author disagree on a `[blocker]` item:

1. The disagreement is noted in the PR as a comment.
2. Lobo is tagged as tiebreaker.
3. Lobo's decision is final and documented in the PR before merge.

---

**Wild Agents. Every line reviewed is a line we own.**
