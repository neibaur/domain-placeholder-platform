# ADR 0002: Cloudflare Pages Git Integration

## Status

Accepted

## Context

The repository targets Cloudflare Pages and already uses GitHub Actions for
validation. Cloudflare Pages Git integration can build from the shared GitHub
repository while keeping each domain in a separate Pages project with
deployment-specific environment variables.

The platform does not currently need custom deployment orchestration through
Wrangler, Cloudflare API tokens, or bespoke release automation.

## Decision

Cloudflare Pages Git integration is the current deployment model. Each Pages
project connects to the shared repository and supplies its own preview and
production `PUBLIC_` variables.

Wrangler/API-token deployment and custom deployment automation are intentionally
deferred.

## Consequences

- Deployment remains simple and understandable.
- Cloudflare credentials are not required in repository CI for deployment.
- Each domain remains operationally isolated through its own Pages project.
- GitHub-to-Cloudflare Pages is sufficient for the current placeholder scope.
- Advanced deployment automation requires a future ADR or documented phase.

## Alternatives Considered

- Wrangler-based deploys from GitHub Actions: deferred to avoid adding token
  management and deployment authority before it is needed.
- Cloudflare API-driven provisioning: deferred until Terraform/import planning
  reaches an authoritative stage.
- A separate repository per domain: rejected because it would duplicate
  validation, docs, and platform governance.

## Future Reconsideration Triggers

- Git integration no longer supports required deployment controls.
- Release orchestration needs outgrow Cloudflare Pages project settings.
- A future IaC phase intentionally introduces reviewed deployment automation.
- Manual project configuration becomes a repeated source of operational errors.
