# ADR 0005: Environment-Driven Multi-Domain Rendering

## Status

Accepted

## Context

The platform serves multiple domains from one shared codebase. Each domain needs
distinct public identity values such as site URL, title, optional description,
locale settings, and indexing behavior. Duplicating repositories or hardcoding
domain values would increase maintenance cost and risk documentation drift.

## Decision

One codebase supports multiple domain deployments. Deployment-specific
`PUBLIC_` environment variables control rendered content, metadata, canonical
URLs, sitemap output, robots behavior, and localization selection.

Each Cloudflare Pages project remains operationally isolated and owns its own
preview and production variables.

## Consequences

- New domains can reuse the same validation, layout, accessibility, and
  deployment patterns.
- Domain-specific values stay out of application source code.
- Cloudflare Pages projects can be rolled back or disabled independently.
- Missing identity-critical values fail fast through Zod validation.
- Contributors must keep environment documentation aligned with the public
  configuration schema.

## Alternatives Considered

- Separate repository per domain: rejected because it duplicates governance,
  tooling, and maintenance.
- Hardcoded domain configuration in source: rejected because it increases
  metadata exposure and makes multi-domain reuse brittle.
- Runtime database-backed domain configuration: deferred because static
  build-time configuration is sufficient for the current placeholder scope.

## Future Reconsideration Triggers

- Domain-specific content grows beyond simple placeholder configuration.
- A future product needs runtime content management.
- Deployment-specific environment variables become difficult to audit manually.
- Terraform or helper tooling matures enough to safely manage environment
  inventory.
