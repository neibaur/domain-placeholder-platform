# ADR 0001: Static-First Placeholder Platform

## Status

Accepted

## Context

The platform manages lightweight placeholder pages for multiple domains. The
current requirements emphasize low cost, operational durability, SEO metadata,
environment-driven rendering, accessibility, and governance. The project does
not currently need request-time personalization, authenticated sessions,
database-backed content, or server-side APIs.

## Decision

The platform will remain static-first. Astro generates static output for
Cloudflare Pages, with domain-specific values resolved at build time through
validated `PUBLIC_` environment variables.

Server-side rendering, databases, long-running server runtimes, edge functions,
and APIs are deferred until a clear operational or product requirement exists.

## Consequences

- Hosting remains low-cost and simple to operate.
- Runtime attack surface and maintenance burden stay small.
- Builds are inspectable, reproducible, and compatible with Cloudflare Pages.
- Dynamic behavior is limited to what can be safely resolved at build time.
- Future runtime features require an explicit decision rather than gradual
  complexity creep.

## Alternatives Considered

- Server-side rendering: deferred because the current placeholder use case does
  not need request-time rendering.
- Database-backed content: deferred because per-domain content is currently
  small and configuration-driven.
- Edge functions or API routes: deferred because there is no current runtime
  integration requirement.

## Future Reconsideration Triggers

- Domains require authenticated or personalized experiences.
- Placeholder content becomes too complex for static configuration.
- Runtime integrations become necessary for a specific product launch.
- Operational evidence shows static generation can no longer meet deployment or
  content requirements.
