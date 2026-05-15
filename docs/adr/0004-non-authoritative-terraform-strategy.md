# ADR 0004: Non-Authoritative Terraform Strategy

## Status

Accepted

## Context

The repository includes validation-only Terraform structure and a reusable
Cloudflare Pages module contract. Existing Cloudflare resources are managed
manually through the Cloudflare dashboard. Terraform has no remote state, no
production backend, no imported resources, no `apply` workflow, and no
authority over live infrastructure.

The platform needs future IaC readiness without risking accidental
provisioning, replacement, drift remediation, or destructive infrastructure
changes.

## Decision

Terraform remains validation-only and non-authoritative. The Cloudflare
dashboard remains the operational source of truth until a later reviewed phase
intentionally introduces resources, state management, imports, plan review, and
apply controls.

No destructive infrastructure automation should be introduced casually. Future
Terraform authority requires deliberate maturity steps and documented review.

## Consequences

- Terraform can validate naming, module contracts, and formatting without
  touching Cloudflare.
- Existing Cloudflare Pages projects remain manually recoverable and
  operationally familiar.
- Import and migration planning can mature before state exists.
- Infrastructure drift must be recorded and reviewed manually for now.
- Terraform cannot yet enforce Cloudflare configuration consistency.

## Alternatives Considered

- Immediate Terraform provisioning: rejected because it could create resources
  before manual deployment behavior is fully understood.
- Immediate import of existing resources: deferred until inventory, rollback,
  state, and review procedures are mature.
- Production `terraform apply` from CI: rejected for the current stage because
  the platform does not yet have remote state or approval workflows.

## Future Reconsideration Triggers

- The managed domain portfolio grows beyond roughly 10 domains.
- Manual Cloudflare dashboard updates become error-prone or operationally
  inefficient.
- Repeated configuration drift is observed across Pages projects.
- DNS, Pages, or environment-variable changes become frequent enough to justify
  import and plan-driven review.
- The team is ready to introduce remote state, plan-only CI, and reviewed apply
  workflows.

These triggers are decision-review triggers only. They do not authorize
Terraform authority, import, apply, or provisioning work in Phase 6D.
