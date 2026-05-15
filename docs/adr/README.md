# Architecture Decision Records

Architecture Decision Records (ADRs) capture meaningful architectural,
operational, and governance decisions for this platform. They explain why a
decision was made, which alternatives were considered, and what should trigger
a future review.

This project uses ADRs because the platform is intentionally conservative:
static-first rendering, Cloudflare Pages Git integration, validation-first
workflows, non-authoritative Terraform, and shallow localization are all
deliberate choices. ADRs give future contributors and AI-assisted changes a
stable decision history instead of relying on scattered assumptions.

## Status Values

| Status     | Meaning                                                                  |
| ---------- | ------------------------------------------------------------------------ |
| Proposed   | A decision is under review and should not be treated as accepted policy. |
| Accepted   | A decision is current project guidance.                                  |
| Superseded | A newer ADR replaces the decision.                                       |
| Deprecated | The decision is no longer recommended, but no replacement is final yet.  |

Accepted ADRs should not be rewritten casually. If a decision changes
materially, create a new ADR that supersedes the old one and update this index.
Minor typo fixes and link maintenance are acceptable.

## Naming Convention

Use four-digit sequence numbers and concise kebab-case titles:

```text
0001-static-first-placeholder-platform.md
0002-cloudflare-pages-git-integration.md
```

## Adding a Future ADR

1. Create a new file in `docs/adr/` using the next sequence number.
2. Use the project ADR format: Status, Context, Decision, Consequences,
   Alternatives Considered, and Future Reconsideration Triggers.
3. Keep the scope focused on a durable decision, not a routine implementation
   detail.
4. Link related docs or earlier ADRs when the decision depends on existing
   governance.
5. Add the ADR to the index table below.

## Index

| ADR                                                                                                  | Status   |
| ---------------------------------------------------------------------------------------------------- | -------- |
| [0001: Static-First Placeholder Platform](0001-static-first-placeholder-platform.md)                 | Accepted |
| [0002: Cloudflare Pages Git Integration](0002-cloudflare-pages-git-integration.md)                   | Accepted |
| [0003: Validation Before Automation](0003-validation-before-automation.md)                           | Accepted |
| [0004: Non-Authoritative Terraform Strategy](0004-non-authoritative-terraform-strategy.md)           | Accepted |
| [0005: Environment-Driven Multi-Domain Rendering](0005-environment-driven-multi-domain-rendering.md) | Accepted |
| [0006: Localization Without Route-Based i18n](0006-localization-without-route-based-i18n.md)         | Accepted |
| [0007: Read-Only Automation Readiness](0007-read-only-automation-readiness.md)                       | Proposed |
