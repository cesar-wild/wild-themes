# Wild Agents — QA Process

**Owner:** Vigia (QA Lead)
**Last updated:** 2026-04-11

This document defines how Wild Agents tests themes, plugins, and agent output before any work is marked done or merged to `main`.

---

## Scope

| Artifact | What we ship | QA gate required |
|---|---|---|
| Paperclip themes | CSS token overrides | Yes |
| Paperclip plugins | Plugin SDK packages | Yes |
| Agent output | Docs, plans, configs committed to repo | Yes (doc audit) |
| Scripts / tooling | Shell scripts in `scripts/` | Yes |

---

## QA Roles

| Role | Responsibility |
|---|---|
| **Vigia** | Owns this process. Files bugs. Validates fixes. Signs off on releases. |
| **Forja** | Addresses bugs filed against code. Requests clarification on ambiguous specs. |
| **Trazo** | Visual standard authority. Vigia references Trazo's design specs for visual correctness checks. |
| **Lobo** | Escalation point for systemic failures, recurring issues, or release-blocking bugs. |

---

## Review Triggers

QA review is mandatory before any of the following:

- Merging a PR to `main`
- Deploying to staging (`bash scripts/deploy.sh`)
- Marking a Paperclip issue as `done`
- Publishing a plugin to the Paperclip registry

---

## Review Pattern (All Artifacts)

Always follow this order. Do not skip categories; document pass/fail for each.

### 1. Functionality

- Does the artifact do what the spec says?
- Does it avoid breaking existing behavior?
- Are edge cases handled?

### 2. Visual Correctness (Themes)

- Renders correctly in light mode and dark mode.
- Matches Trazo's approved design direction.
- No visual regressions vs. the previous shipped version.

### 3. Accessibility

- WCAG AA minimum compliance.
- Contrast ratios meet 4.5:1 (text) and 3:1 (UI components).
- No color-only information encoding.

### 4. Code Quality

- Follows conventions in `docs/dev-workflow.md`.
- No hardcoded colors, magic numbers, or inline styles.
- No `!important` on system tokens.
- No exposed secrets or tokens.

### 5. Documentation

- README or relevant doc is updated.
- Installation / usage instructions are accurate.
- No doc/code drift (docs must match the actual code).

### 6. Performance

- Theme CSS does not introduce layout jank or paint storms.
- Plugin does not exceed SDK resource limits.

---

## Bug Filing Standard

File every bug as a Paperclip issue. Use this template:

```
**What:** One-line summary of the defect
**Where:** File path and line number (or component name)
**Steps:** How to reproduce
**Expected:** What should happen
**Actual:** What actually happens
**Severity:** critical / high / medium / low
```

### Severity definitions

| Severity | Definition | Examples |
|---|---|---|
| **Critical** | Data loss, security vulnerability, or platform breakage | Secret in commit, CSS that crashes rendering |
| **High** | Release-blocking defect affecting core functionality | Theme fails to apply, plugin won't install |
| **Medium** | Noticeable defect with a workaround | Wrong color in a secondary UI element |
| **Low** | Polish / cosmetic / nitpick | Minor spacing off by 1px |

---

## Fix Validation

When a bug is marked fixed:

1. Re-read the changed files — do not rely on the author's description alone.
2. Verify the specific line/component that was wrong is now correct.
3. Confirm no regressions introduced nearby.
4. Update the Paperclip issue: close if fully resolved; reopen if still broken.

Do not rubber-stamp. One failed validation beats three assumed passes.

---

## Batch Findings

When multiple issues share a root cause (e.g., all five themes use the same broken token pattern), batch them into a single bug report rather than filing five separate issues. Note each affected file explicitly.

---

## Release Gate Checklist

Before any artifact is considered release-ready, all of the following must be green:

- [ ] Functionality review: pass
- [ ] Visual review (if theme): pass
- [ ] Accessibility review: pass
- [ ] Code quality review: pass
- [ ] Documentation review: pass
- [ ] All open critical/high bugs: resolved
- [ ] Fix validation: complete for all fixed bugs
- [ ] Merged to `main` via PR with ≥1 review

---

## Efficiency Rules

- Don't re-audit unchanged code. Note the last-reviewed commit SHA in the issue comment.
- One thorough review beats three shallow passes.
- Security issues and data-loss bugs interrupt current work immediately.

---

**Wild Agents. Quality is not optional. It is the baseline.**
