# ADR 0007: Read-Only Automation Readiness

## Status

Proposed

## Context

Phase 7C defined manual drift preparedness between structured domain inventory
intent and Cloudflare dashboard reality. A future read-only comparison could
help reviewers find differences between expected Pages project names, custom
domains, public environment variable posture, contact routing intent, and
Terraform authority documentation.

That comparison may eventually become useful if the domain portfolio grows,
manual review becomes too error-prone, or operational evidence needs to be more
repeatable. However, the platform is intentionally static-first,
governance-first, low-maintenance, and Cloudflare Pages Git-integrated. The
current manual review process is still small enough to operate safely without
Cloudflare API access.

Even read-only Cloudflare access is not risk-free. It can expose domain
inventory patterns, Pages project configuration, environment variable names,
routing structure, account-level structure, deployment conventions, and other
operational metadata. Read-only access has lower blast radius than write access,
but it still expands what repository tooling and CI jobs can observe.

## Decision

Read-only Cloudflare automation remains deferred. The project may document
readiness requirements, manual review procedures, and safe output expectations,
but it must not add Cloudflare API calls, Wrangler flows, tokens, Terraform
import, Terraform apply, automatic remediation, or live configuration checks in
this phase.

Any future proposal for read-only Cloudflare comparison must pass the
[Read-Only Automation Checklist](../read-only-automation-checklist.md) and be
reviewed as a separate phase.

The project should continue to support deterministic local, inventory-derived
review helpers that do not use secrets, network access, live Cloudflare data, or
mutation.

## Consequences

- Cloudflare dashboard configuration remains the operational source of truth.
- Structured inventory remains intended operational posture, not proof of live
  configuration.
- Terraform remains validation-only or import-planning only and does not own
  live resources.
- Manual drift review remains the default operating model.
- Future automation has a clear approval bar before it can be implemented.
- The platform avoids accidental dependency on Cloudflare API availability for
  normal validation.

## Risks

- Token handling risk: even read-only integrations require credentials that can
  be mis-scoped, leaked, logged, or reused incorrectly.
- CI exposure risk: CI logs can accidentally reveal operational metadata,
  environment variable names, routing patterns, or account structure.
- Scope expansion risk: read-only drift detection can quietly become pressure
  for remediation, provisioning, import, or apply behavior.
- False confidence risk: a passing read-only check may not prove that DNS,
  certificates, routing, cache behavior, generated output, or user-visible
  behavior are correct.
- API dependency risk: Cloudflare API changes, outages, rate limits, or
  permission changes can create validation noise unrelated to the static site.
- Blast radius risk: repository tooling could reveal more operational structure
  than the public placeholder pages reveal.

## Explicit Non-Goals

Future read-only automation must not:

- mutate Cloudflare configuration
- auto-remediate drift
- auto-apply Terraform
- import Terraform state
- rotate secrets
- modify DNS
- modify Pages projects
- modify Email Routing
- expose sensitive values
- bypass manual governance review
- become required for normal static-site builds

## Potentially Acceptable Future Scope

A future separately reviewed phase may consider:

- read-only comparison of inventory intent to Cloudflare settings
- redacted reporting
- optional local execution
- optional manually triggered CI execution
- inventory-to-config comparison
- metadata consistency checks
- failure modes that do not block unrelated static-site validation by default

## Reasons To Potentially Never Implement It

- The domain portfolio may remain small enough for manual review.
- Manual Cloudflare dashboard review may provide better operational context.
- Credential management may create more risk than the check removes.
- API drift or rate limits may produce noisy confidence signals.
- Public-safe reporting may hide enough detail that the check is less useful.
- Terraform authority may remain intentionally deferred indefinitely.

## Alternatives Considered

- Implement read-only Cloudflare checks now: rejected because the current phase
  is governance-only and the operational need is not yet proven.
- Add fake Cloudflare API tests: rejected because mocks would create
  implementation shape before a real integration is approved.
- Use Terraform plan as the drift source: rejected because Terraform is not
  authoritative and has no live state for these resources.
- Keep only manual documentation: partially accepted, but a local
  inventory-derived helper remains useful because it is deterministic and
  network-free.

## Future Reconsideration Triggers

- Domain count grows enough that manual review becomes unreliable.
- Reviewers need repeatable evidence for a recurring operational audit.
- A safe least-privilege Cloudflare token model is approved.
- Redacted output requirements are reviewed and tested.
- CI execution is explicitly approved as opt-in or manually triggered.
- The project accepts the residual risk of read-only metadata exposure.
