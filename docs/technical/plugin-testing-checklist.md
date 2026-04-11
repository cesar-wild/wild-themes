# Wild Agents — Plugin Testing Checklist

**Owner:** Vigia (QA Lead)
**Last updated:** 2026-04-11

Use this checklist for every Paperclip plugin before it is published to the registry or deployed to staging. Mark each item pass (✓), fail (✗), or N/A. A plugin is not shippable until all critical and high items pass.

---

## 1. SDK Compliance

| # | Check | Severity | Result |
|---|---|---|---|
| 1.1 | Plugin uses the current alpha SDK version (verify against `paperclip-create-plugin` skill output) | High | |
| 1.2 | Package manifest (`package.json` or equivalent) is valid and complete | Critical | |
| 1.3 | Plugin exports follow the required SDK entry-point convention | Critical | |
| 1.4 | Worker/UI surface separation follows SDK route conventions | High | |
| 1.5 | No use of deprecated or removed SDK APIs | High | |
| 1.6 | Plugin version follows semver | High | |
| 1.7 | Plugin ID is unique in the company registry | Critical | |
| 1.8 | Plugin scaffold matches the current scaffold template (run `paperclip-create-plugin` to verify) | Medium | |

---

## 2. Manifest and Metadata

| # | Check | Severity | Result |
|---|---|---|---|
| 2.1 | `name` field: present, lowercase, hyphen-separated | High | |
| 2.2 | `description` field: accurate and non-empty | Medium | |
| 2.3 | `author` field: set to `"Wild Agents"` | Medium | |
| 2.4 | `permissions` field: declares only required permissions (least-privilege) | High | |
| 2.5 | `entryPoints` field: references valid files that exist in the package | Critical | |
| 2.6 | No undocumented or experimental manifest fields unless intentional | Low | |

---

## 3. Runtime Behavior

| # | Check | Severity | Result |
|---|---|---|---|
| 3.1 | Plugin installs without errors on staging instance | Critical | |
| 3.2 | Plugin activates without runtime errors (check browser console) | Critical | |
| 3.3 | Plugin deactivates / uninstalls cleanly (no orphaned state) | High | |
| 3.4 | All declared features are functional | High | |
| 3.5 | Plugin does not interfere with other active plugins | High | |
| 3.6 | Plugin does not interfere with platform core UI | High | |
| 3.7 | Worker process does not crash or leak memory over a 5-minute idle test | High | |
| 3.8 | Plugin respects the declared permission boundaries (no capability escalation) | Critical | |
| 3.9 | Plugin handles missing or malformed configuration gracefully | Medium | |
| 3.10 | Error states show user-friendly messages, not raw stack traces | Medium | |

---

## 4. UI Surface (if applicable)

| # | Check | Severity | Result |
|---|---|---|---|
| 4.1 | Plugin UI renders inside the designated UI surface (no overflow) | High | |
| 4.2 | Plugin UI respects active Paperclip theme (uses platform CSS variables) | High | |
| 4.3 | No hardcoded colors or magic pixel values in plugin UI | High | |
| 4.4 | Plugin UI is responsive within its container bounds | Medium | |
| 4.5 | Interactive elements are keyboard-accessible | High | |
| 4.6 | Focus order is logical within the plugin UI | High | |
| 4.7 | WCAG AA contrast met for all text in plugin UI | High | |

---

## 5. API and Data

| # | Check | Severity | Result |
|---|---|---|---|
| 5.1 | All API calls use the SDK-provided client (no direct fetch to internal endpoints) | Critical | |
| 5.2 | API errors are caught and handled (no unhandled promise rejections) | High | |
| 5.3 | No user data is logged to the browser console in production | High | |
| 5.4 | No PII or secrets transmitted to third-party services | Critical | |
| 5.5 | Pagination handled correctly for list endpoints | Medium | |
| 5.6 | Optimistic UI updates are rolled back correctly on API failure | Medium | |

---

## 6. Security

| # | Check | Severity | Result |
|---|---|---|---|
| 6.1 | No API keys, tokens, or credentials hardcoded in source | Critical | |
| 6.2 | No credentials committed to the repository | Critical | |
| 6.3 | No dynamic `eval()` or equivalent code execution | Critical | |
| 6.4 | No XSS vectors: all user-provided content is escaped before rendering | Critical | |
| 6.5 | `innerHTML` / `dangerouslySetInnerHTML` not used with unsanitized input | Critical | |
| 6.6 | Plugin does not load external scripts at runtime | High | |
| 6.7 | CSP compliance: plugin does not require relaxing the platform's Content Security Policy | High | |
| 6.8 | Supply chain: all dependencies have no known critical CVEs | High | |

---

## 7. Performance

| # | Check | Severity | Result |
|---|---|---|---|
| 7.1 | Plugin bundle size is reasonable for its feature set (flag if > 500KB) | Medium | |
| 7.2 | Plugin does not poll or fetch on every render cycle | High | |
| 7.3 | Worker does not block the main thread with synchronous operations | High | |
| 7.4 | Platform navigation speed does not regress when plugin is active | Medium | |
| 7.5 | No memory leak detected after extended use (check DevTools heap snapshot) | High | |

---

## 8. Documentation

| # | Check | Severity | Result |
|---|---|---|---|
| 8.1 | Plugin has a `README.md` with installation, configuration, and usage instructions | High | |
| 8.2 | `README.md` accurately reflects the current plugin behavior | High | |
| 8.3 | Configuration options are documented with types and defaults | Medium | |
| 8.4 | Known limitations are noted | Low | |
| 8.5 | Changelog entry present for this version | Medium | |
| 8.6 | All commits include `Co-Authored-By: Paperclip <noreply@paperclip.ing>` | Medium | |

---

## 9. Regression Testing

Before shipping a new version of an existing plugin:

| # | Check | Severity | Result |
|---|---|---|---|
| 9.1 | All features from the previous version still work | High | |
| 9.2 | No settings or user data lost on upgrade | Critical | |
| 9.3 | Plugin upgrade is non-destructive (data migration if needed) | High | |
| 9.4 | Previously filed bugs are verified as fixed | High | |

---

## Sign-Off

| Reviewer | Date | Status |
|---|---|---|
| Vigia (QA Lead) | | |

Plugin is **shippable** when all Critical and High items pass, all bugs are resolved, and Vigia signs off.

---

**Wild Agents. Ship it right or don't ship it.**
