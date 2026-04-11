# Wild Agents — Theme Testing Checklist

**Owner:** Vigia (QA Lead)
**Last updated:** 2026-04-11

Use this checklist for every theme before it is merged to `main` or deployed to staging. Mark each item pass (✓), fail (✗), or N/A. A theme is not shippable until all critical and high items pass.

---

## 1. Manifest Validation

| # | Check | Severity | Result |
|---|---|---|---|
| 1.1 | `theme.json` exists and is valid JSON | Critical | |
| 1.2 | `id` field: lowercase, hyphen-separated, unique in the repo | High | |
| 1.3 | `name` field: present and non-empty | High | |
| 1.4 | `description` field: present and meaningful | Medium | |
| 1.5 | `version` field: follows semver (e.g., `1.0.0`) | High | |
| 1.6 | `author` field: set to `"Wild Agents"` | Medium | |
| 1.7 | `tags` field: present (may be empty array) | Low | |
| 1.8 | No extra undocumented fields that differ from the template schema | Low | |

**Tool:** `bash scripts/validate.sh themes/<theme-name>`

---

## 2. CSS Structure

| # | Check | Severity | Result |
|---|---|---|---|
| 2.1 | `index.css` exists | Critical | |
| 2.2 | File parses without CSS errors (run through a linter or browser DevTools) | Critical | |
| 2.3 | All overrides are inside a single `:root` block | High | |
| 2.4 | No hardcoded hex, rgb(), hsl(), or named colors | Critical | |
| 2.5 | No hardcoded magic numbers (px values not derived from a token) | High | |
| 2.6 | No inline styles (this is a CSS file; no `style=` attributes) | High | |
| 2.7 | No `!important` declarations on platform system tokens | High | |
| 2.8 | Header comment present with theme name and `Wild Agents` attribution | Low | |

---

## 3. OKLCH Token Usage

| # | Check | Severity | Result |
|---|---|---|---|
| 3.1 | All custom properties follow `--color-<role>-<l\|c\|h>` naming convention | High | |
| 3.2 | Lightness values (`-l`) are in range 0–1 | High | |
| 3.3 | Chroma values (`-c`) are ≥0 (negative chroma is invalid) | High | |
| 3.4 | Hue values (`-h`) are in range 0–360 | High | |
| 3.5 | Every overridden token exists in the Paperclip platform token set | High | |
| 3.6 | No orphan tokens (tokens overriding properties the platform does not consume) | Medium | |
| 3.7 | At minimum: accent, surface, text-primary, text-secondary, and border tokens defined | High | |
| 3.8 | Light mode tokens produce legible contrast (see Accessibility section) | Critical | |
| 3.9 | Dark mode tokens produce legible contrast (see Accessibility section) | Critical | |

**Reference:** See `themes/_template/index.css` for the canonical token set.

---

## 4. Accessibility

| # | Check | Severity | Result |
|---|---|---|---|
| 4.1 | Text-on-surface contrast ratio ≥ 4.5:1 (WCAG AA, normal text) | Critical | |
| 4.2 | Large text (≥18pt or ≥14pt bold) contrast ratio ≥ 3:1 | High | |
| 4.3 | UI component / interactive element contrast ratio ≥ 3:1 | High | |
| 4.4 | Accent color on surface: ≥ 3:1 contrast | High | |
| 4.5 | Focus indicators remain visible (not overridden to invisible) | High | |
| 4.6 | No information conveyed by color alone | High | |
| 4.7 | Tested with a contrast checker (e.g., APCA, WebAIM Contrast Checker) | High | |

**OKLCH contrast check:** Use the OKLCH lightness delta as a quick guide — a difference of ≥0.45 in `L` between text and background is a reasonable starting point, but always verify with a proper contrast tool.

---

## 5. Visual Correctness

| # | Check | Severity | Result |
|---|---|---|---|
| 5.1 | Theme renders correctly on the staging instance at `http://5.223.73.101:8080` | High | |
| 5.2 | No blank/white flash when theme first loads | Medium | |
| 5.3 | No missing tokens (platform defaults not unintentionally showing through) | High | |
| 5.4 | Matches Trazo's approved visual direction for this theme | High | |
| 5.5 | No unintended color leakage (accent bleeding into surfaces, etc.) | Medium | |
| 5.6 | Typography is legible across all text roles | High | |
| 5.7 | `preview.png` present and accurately represents the shipped theme | Low | |

---

## 6. Cross-Browser Testing

| # | Browser | Version | Light Mode | Dark Mode | Result |
|---|---|---|---|---|---|
| 6.1 | Chrome / Chromium | Latest stable | ✓/✗ | ✓/✗ | |
| 6.2 | Firefox | Latest stable | ✓/✗ | ✓/✗ | |
| 6.3 | Safari | Latest stable | ✓/✗ | ✓/✗ | |
| 6.4 | Edge | Latest stable | ✓/✗ | ✓/✗ | |

**Minimum:** Chrome + Firefox required. Safari and Edge are high-priority but not blockers for initial release.

**OKLCH browser support note:** OKLCH is supported in all modern browsers as of 2023. No polyfills required for target browsers above. Flag any rendering discrepancies in older environments.

---

## 7. Performance

| # | Check | Severity | Result |
|---|---|---|---|
| 7.1 | Theme CSS file size < 50KB (themes should be token overrides only) | Medium | |
| 7.2 | No `@import` rules fetching remote resources | High | |
| 7.3 | No animations or transitions defined (theme scope is color tokens only) | High | |
| 7.4 | No layout-affecting properties (margin, padding, display, grid) | High | |
| 7.5 | Staging load time does not regress vs. no-theme baseline | Medium | |

---

## 8. Security

| # | Check | Severity | Result |
|---|---|---|---|
| 8.1 | No API keys, tokens, or credentials in CSS or JSON files | Critical | |
| 8.2 | No `url()` references to external remote resources | High | |
| 8.3 | No `content:` injecting executable or malicious strings | High | |

---

## 9. Documentation

| # | Check | Severity | Result |
|---|---|---|---|
| 9.1 | If theme introduces new conventions, `docs/dev-workflow.md` is updated | Medium | |
| 9.2 | PR description includes link to staging preview | Medium | |
| 9.3 | Commit messages follow Conventional Commits format | Low | |
| 9.4 | All commits include `Co-Authored-By: Paperclip <noreply@paperclip.ing>` | Medium | |

---

## Sign-Off

| Reviewer | Date | Status |
|---|---|---|
| Vigia (QA Lead) | | |

Theme is **shippable** when all Critical and High items pass, all bugs are resolved, and Vigia signs off.

---

**Wild Agents. No shortcuts on quality.**
