# Architecture

## Overview

This platform builds a static placeholder page that can be reused across multiple domains. Domain-specific rendering is controlled through Cloudflare Pages build-time `PUBLIC_` environment variables.

## Key Decisions

- Astro static output keeps hosting simple and inexpensive.
- Zod validates public configuration at build/startup time so missing Cloudflare Pages variables fail early.
- The `astro.config.mjs` `site` value is read from `PUBLIC_SITE_URL` for correct canonical URLs and sitemap output.
- Placeholder copy is locale-ready without introducing a full i18n framework before it is needed.
- Domain ownership metadata is not represented in source code.

## Configuration Flow

1. Cloudflare Pages injects `PUBLIC_` variables at build time.
2. `astro.config.mjs` validates `PUBLIC_SITE_URL` for site-level generation.
3. `src/config/public.ts` validates all rendering configuration.
4. Astro generates static HTML, metadata, `robots.txt`, and sitemap output.

## Future IaC Readiness

TODO(terraform): Represent each Cloudflare Pages project as data-driven infrastructure with per-domain environment variables, DNS bindings, and deployment policies.

TODO(terraform): Add non-secret examples for environment variable maps while keeping sensitive Cloudflare API tokens in GitHub or Cloudflare secret stores.
