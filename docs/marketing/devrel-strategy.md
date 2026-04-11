# Wild Agents — Developer Relations Strategy v1.0

> Version 1.0 | April 2026 | Owned by Eco (Marketing Lead)

---

## What DevRel Means for Us

Developer relations at Wild Agents is not a separate function — it is how we market. With zero external spend, our only lever is genuine community value: being useful, being present, being honest.

DevRel goals:
1. Make Wild Agents themes and plugins easy to adopt
2. Build a reputation as the technically serious team in the Paperclip ecosystem
3. Create a feedback loop that makes our products better
4. Support the Paperclip ecosystem's growth (a healthy platform is good for us)

---

## The Developer Adoption Funnel

Understanding how a developer becomes a Wild Agents user shapes every DevRel decision.

```
Unaware → Aware → Evaluating → Using → Advocating
```

| Stage | What the developer is doing | What we do |
|---|---|---|
| **Unaware** | Has no idea we exist | Content, SEO, community presence |
| **Aware** | Heard of us, hasn't tried anything | Strong README, clear demo, honest description |
| **Evaluating** | Comparing us to default theme or alternatives | Docs quality, install simplicity, honest limitations |
| **Using** | Installed a theme or plugin | Fast bug fixes, responsive to issues, good release notes |
| **Advocating** | Recommending us to others | Thank them, involve them, make it easy to share |

Most DevRel effort should go to making "Evaluating → Using" and "Using → Advocating" as frictionless as possible.

---

## Developer Experience (DX) Standards

Before community presence matters, the experience of actually using our products must be excellent. Developers who hit friction don't complain — they leave and don't come back.

### README quality (required)
Every theme and plugin README must include:
- What it is (1–2 sentences)
- What problem it solves
- Screenshot or preview
- Install/deploy instructions (5 steps or fewer)
- Known limitations (honest, specific)
- How to report issues

### Issue responsiveness
- All GitHub issues get a first response within 48 hours
- Bug reports that are valid: acknowledged, estimated fix timeline given
- Feature requests: acknowledged, honest about whether it's on roadmap

### Documentation completeness
- Every CSS token override in a theme must be documented in the theme's README or linked doc
- Plugins must document all public configuration options
- "It's obvious" is not a documentation standard

### Release notes
Every release must include:
- Summary of changes (2–3 sentences)
- List of changed/added/removed tokens or features
- Breaking changes called out explicitly
- Migration instructions if breaking

---

## Community Engagement Playbook

### Where to be present
_(Research needed — identify active Paperclip community spaces)_

Priority targets:
- Paperclip GitHub Discussions (if active)
- Any official Paperclip Discord or Slack
- Reddit communities for developer tooling (r/webdev, r/programming)
- dev.to and Hashnode for technical content

### How to engage

**Principle: value first, promotion never-first.**

Rule: For every post that mentions Wild Agents products, there should be at least two contributions that are purely helpful — answering questions, sharing knowledge, giving feedback on others' work.

**When answering questions:**
- Answer completely, even if the question isn't about our product
- Only mention Wild Agents if it's genuinely relevant and helpful
- Link to docs, not to a sales page

**When posting about releases:**
- One structured announcement per release, one channel at a time
- Include: what changed, why it matters, link to release notes
- Invite feedback. Mean it.

**When someone criticizes our work:**
- Engage directly and respectfully
- Acknowledge valid points without defensiveness
- If they're wrong about something technical, correct politely with evidence

---

## Feedback Collection

We need feedback to improve. We get it by:

1. **GitHub Issues** — primary channel. Label them: `bug`, `feature-request`, `question`, `theme-feedback`
2. **Community threads** — actively read threads about Paperclip theming for indirect signals
3. **Release comments** — monitor comments on release announcements
4. **Direct outreach** — when a developer posts about Paperclip theming publicly, engage genuinely

### Feedback-to-product loop
- Monthly: review open GitHub issues with Forja and Vigia
- Patterns that appear in 3+ separate pieces of feedback go on the roadmap
- When we act on feedback, tell the person who reported it

---

## Open-Source Strategy

Our themes and plugins are open-source. This is a DevRel decision as much as a product decision.

Open-source benefits:
- Developers can verify our technical claims by reading the code
- Forks and contributions improve the product without requiring our time
- Transparency builds trust that closed-source products can't buy

Contribution guidelines (to be maintained in `CONTRIBUTING.md`):
- How to set up local dev environment
- How to submit a theme variant or token improvement
- Code style expectations
- What makes a good PR vs. what gets rejected
- How decisions get made

### Contributor recognition
When external contributors submit PRs that get merged:
- Thank them by name in the release notes
- Add them to a `CONTRIBUTORS.md` if they want it
- A contributor who improves the pack is a potential future advocate

---

## First 30 Days Checklist

- [ ] Identify Paperclip community spaces (forums, Discord, GitHub Discussions)
- [ ] Create/refine `CONTRIBUTING.md` for wild-themes
- [ ] Issue templates configured in GitHub (bug report, feature request, theme feedback)
- [ ] First community introduction posted
- [ ] First technical content piece published
- [ ] GitHub issue tracker actively monitored (Eco owns triage)
- [ ] Contact info / community presence documented so other agents can refer users there

---

## What DevRel Is Not

- **Not a support function.** We answer questions in public so everyone benefits. We don't do private support.
- **Not a sales function.** We don't cold-pitch. We build things worth talking about.
- **Not a PR function.** We don't spin bad news. We acknowledge problems and fix them.
- **Not disconnected from product.** Feedback from the community must reach Forja and Vigia. DevRel without a feedback loop is just noise.

---

*This strategy should be reviewed after Month 1 based on actual community findings. Update the community space list as we identify where developers actually are.*
