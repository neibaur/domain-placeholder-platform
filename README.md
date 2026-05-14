# domain-placeholder-platform

Reusable, governance-first placeholder platform for multiple domains using Astro, TypeScript, Cloudflare Pages, and GitHub Actions.

Initial pilot domains:

- `68tai.com`
- `6gou8.com`
- `6xi8.com`

Domain-specific values are intentionally not hardcoded. Each Cloudflare Pages project should provide `PUBLIC_` environment variables at build time.

## Platform Value

This platform provides a low-cost, operationally durable foundation for managing a domain portfolio. It supports fast future project launches, multilingual placeholder readiness, reusable Cloudflare Pages deployment patterns, and visible platform-engineering governance practices without turning a placeholder page into a heavy application.

Lightweight placeholder domains are treated as production-grade operational assets, not disposable static pages. The repository is intended to preserve a reusable Cloudflare Pages pattern, demonstrate platform governance practices, and provide a launchpad for future multilingual or domain-specific projects.

## Current Status Snapshot

| Component                         | Current Maturity                       |
| --------------------------------- | -------------------------------------- |
| Astro build/runtime               | Operational static placeholder site.   |
| Cloudflare Pages deployment model | Operational through manual validation. |
| Environment variable policy       | Operational hybrid required/defaulted. |
| CI/CD validation                  | Operational via GitHub Actions.        |
| Security scanning                 | Operational via CodeQL and Gitleaks.   |
| Accessibility and smoke checks    | Operational through `pnpm validate`.   |
| Focused tests                     | Operational via Vitest.                |
| Phase 5 readiness                 | Operationally ready.                   |
| Terraform/IaC                     | Validation-only and non-authoritative. |
| Import/onboarding                 | Planned and documented.                |
| Localization/i18n                 | Phase 6A foundation implemented.       |
| Automation helpers                | Deferred.                              |

Cloudflare provisioning, Terraform applies, imports, production environment configs, localization implementation, and automation helpers are intentionally deferred.

## Runtime Stack Snapshot

| Area                  | Current Choice                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------ |
| Framework             | Astro with TypeScript.                                                                                 |
| Package manager       | pnpm.                                                                                                  |
| Hosting target        | Cloudflare Pages.                                                                                      |
| Rendering model       | Static-first build output with minimal client-side JavaScript.                                         |
| Build command         | `pnpm build`.                                                                                          |
| Build output          | `dist`.                                                                                                |
| Runtime configuration | Cloudflare Pages project variables for preview/production; local `.env` only for developer validation. |

## Intentional Limitations

The platform stays lightweight by design:

- No database.
- No authentication.
- No SSR or long-running server runtime.
- No edge functions yet.
- No analytics yet.
- No Terraform-managed Cloudflare resources yet.
- No route-based localization/i18n yet.

These constraints keep the placeholder platform low-cost, low-maintenance, and easy to validate while future needs are still small.

## Architectural Principles

- Prefer static-first output and Cloudflare Pages' simple deployment model.
- Keep per-domain customization environment-driven.
- Validate behavior before adding automation.
- Treat governance, privacy, and accessibility as baseline engineering concerns.
- Adopt Terraform progressively, with validation before authority.
- Avoid overengineering until real operational needs justify more structure.

## What Is Real vs Planned

| Category               | Status                                                                                                                                                                                                                       |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Real today             | Astro platform, validation scripts, CI/CD workflows, Cloudflare Pages-compatible builds, manual Cloudflare Pages deployments, Terraform validation skeleton, reusable module scaffolding, and import planning documentation. |
| Planned but not active | Terraform provisioning, real imports, remote state, automated apply workflows, route-based localization, full domain onboarding automation, and helper tooling.                                                              |
| Source of truth        | Cloudflare remains the operational source of truth until resources are intentionally imported or recreated through a reviewed plan.                                                                                          |

## Repository Demonstrates

- DevSecOps governance and CI/CD maturity.
- Operational safety engineering for multi-domain deployments.
- Reusable infrastructure design without premature provisioning.
- IaC planning discipline and import-readiness thinking.
- Accessibility-aware engineering and secure deployment practices.

## Documentation Map

| Document                                                      | Purpose                                                                                             |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [Architecture](docs/architecture.md)                          | Explains the Astro/static-site design, configuration flow, SEO behavior, and future IaC boundaries. |
| [Governance](docs/governance.md)                              | Defines workflow expectations, CI/CD gates, review standards, and Definition of Done.               |
| [Deployment](docs/deployment.md)                              | Captures Cloudflare Pages setup expectations and the pre-deployment checklist.                      |
| [Security and Privacy](docs/security-and-privacy.md)          | Defines public configuration boundaries and operational metadata privacy expectations.              |
| [Cloudflare Environment Variables](docs/cloudflare-env.md)    | Provides documentation-only examples for pilot domain environment configuration.                    |
| [Terraform and IaC Planning](docs/iac.md)                     | Documents future Terraform scope, safety principles, naming, and Phase 5 roadmap.                   |
| [Cloudflare Inventory Template](docs/cloudflare-inventory.md) | Provides a non-authoritative template for future import planning and drift review.                  |

## Deployment Model

The recommended Cloudflare Pages model is one shared GitHub repository with one Cloudflare Pages project per domain. Each project supplies its own `PUBLIC_` environment variables, so production domain values stay out of application source code.

| Domain      | Cloudflare Pages Project         |
| ----------- | -------------------------------- |
| `68tai.com` | `placeholder-platform-68tai-com` |
| `6gou8.com` | `placeholder-platform-6gou8-com` |
| `6xi8.com`  | `placeholder-platform-6xi8-com`  |

See [Deployment](docs/deployment.md) for production, preview, verification, and rollback checklists before connecting Cloudflare resources.

Operational onboarding for a new domain should start with the [Deployment](docs/deployment.md#new-domain-onboarding) guide and be recorded in the [Cloudflare Inventory Template](docs/cloudflare-inventory.md).

## Local Development

```sh
pnpm install
cp .env.example .env
pnpm dev
```

Local development can use `.env`, but copying `.env.example` only creates the file. Shell commands such as `pnpm build` do not automatically load `.env` for every execution path, especially because the Astro config validates `process.env` before rendering.

Use the cross-platform local build script when you want to build with values from `.env`:

```sh
pnpm build:local
```

This uses `dotenv-cli` as a small development-only wrapper so contributors do not need different Bash, Git Bash, and PowerShell export commands.

`pnpm build` remains intentionally strict and expects `PUBLIC_` values to already be present in the process environment. This preserves fail-fast behavior for CI and Cloudflare Pages.

Local `.env` files are for local development and validation only. Production and preview deployments should use Cloudflare Pages project environment variables, which remain the source of truth for deployed domain behavior. Do not commit `.env`.

VS Code or Python env-file injection is unrelated to Astro/pnpm builds unless the variables are actually exported into the shell process that runs `pnpm`.

## Current Validation Commands

```sh
pnpm validate
```

This is the main local confidence command. It runs:

- Prettier formatting checks
- ESLint
- Vitest focused TypeScript tests
- markdownlint
- Zod environment validation checks
- Astro type checking and production build
- production smoke tests against generated `dist/` output
- automated accessibility checks against the served production output

The same validation path is expected in CI before merge. See [Governance](docs/governance.md#cicd-pipeline) for the full CI/CD pipeline and branch protection expectations.

Current commands:

| Command              | Purpose                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `pnpm build:local`   | Loads local `.env` through `dotenv-cli`, then runs the normal build.                                                     |
| `pnpm test`          | Runs focused Vitest tests for pure TypeScript config and localization behavior.                                          |
| `pnpm test:coverage` | Runs non-gating Vitest coverage reporting for local review.                                                              |
| `pnpm check:env`     | Runs [scripts/check-env-validation.ts](scripts/check-env-validation.ts) for positive and negative Zod validation checks. |
| `pnpm smoke`         | Runs [scripts/smoke-production.mjs](scripts/smoke-production.mjs) against generated production output.                   |
| `pnpm check:a11y`    | Runs [scripts/check-accessibility.mjs](scripts/check-accessibility.mjs) with pa11y against served `dist/`.               |
| `pnpm validate`      | Runs formatting, linting, markdown, env, smoke, and accessibility checks as the main confidence command.                 |

## Terraform Validation

Phase 5B adds a validation-only Terraform skeleton under [infra/terraform](infra/terraform/README.md). It supports formatting and configuration validation without provisioning infrastructure.

```sh
cd infra/terraform
terraform fmt -recursive -check
terraform init -backend=false
terraform validate
```

Terraform is not authoritative yet. No Cloudflare resources are declared, imported, modified, or destroyed in this phase.

The reusable Cloudflare Pages module contract lives at [infra/terraform/modules/cloudflare-pages](infra/terraform/modules/cloudflare-pages/README.md). It defines validation-safe inputs and outputs only; it does not create Cloudflare Pages projects.

Future import planning is documented in [Terraform and IaC Planning](docs/iac.md#safe-import-strategy). Any eventual import should be inventory-first, keyed by domain identifiers, and reviewed through plan-only drift analysis before Terraform authority changes.

## Ready for Phase 6

The platform is ready for future localization/i18n planning because the deployment model, environment policy, validation pipeline, accessibility baseline, operational inventory, and Terraform posture are stable and documented. Phase 6 can focus on multilingual structure without also solving deployment governance or infrastructure authority.

Phase 6 should add localization carefully and incrementally. Prefer a simple structured content/config model before adding full route-based i18n, unless separate localized routes become a clear requirement. Localization changes should preserve accessibility, SEO metadata, canonical URL behavior, sitemap behavior, and conservative `PUBLIC_ROBOTS_INDEX=false` defaults. See [Governance](docs/governance.md#ready-for-phase-6) and the [Definition of Done](docs/governance.md#definition-of-done).

## Localization Model

Phase 6A introduced a small typed content contract in [src/content/locales.ts](src/content/locales.ts). Phase 6B polishes the rendering and adds focused Vitest tests for the localization/config behavior. The current model supports:

- `en` for English.
- `zh-CN` for Simplified Chinese.

`PUBLIC_PRIMARY_LOCALE` controls the root `<html lang>` value and primary page copy. `PUBLIC_SECONDARY_LOCALE` controls the secondary localized message. Missing locale variables keep the existing safe defaults: primary `en`, secondary `zh-CN`.

Unsupported locale values fail during Zod environment validation so Cloudflare Pages deployments do not silently render an unintended language. Thai remains future-ready in documentation but is not accepted by the Phase 6A schema yet.

Current non-goals:

- No locale-prefixed routes.
- No per-locale sitemap entries.
- No external i18n framework.
- No Cloudflare deployment changes.

Locale-specific message blocks are rendered from the same content structure and carry their own `lang` attributes. The root `<html lang>` remains tied to `PUBLIC_PRIMARY_LOCALE`.

Coverage is available through `pnpm test:coverage`, but it is intentionally non-gating while the application remains small and mostly static. A formal threshold can be considered in Phase 6C if localization logic or reusable utilities grow.

## Secret Scanning

GitHub Actions runs Gitleaks to detect accidentally committed secrets on pull requests and pushes to `main`. Secrets should never be committed. Use GitHub Secrets, Cloudflare Pages project variables, or future reviewed IaC-safe workflows for sensitive values.

## Local Security Preflight

Before opening a PR, run the standard validation and whitespace checks:

```sh
pnpm validate
git diff --check
```

If Gitleaks is installed locally, optionally run:

```sh
gitleaks git --redact --verbose
```

Do not commit `.env` files, API tokens, Cloudflare credentials, account IDs, private ownership details, or private operational contact information.

PR-readiness checklist:

- [ ] `pnpm validate` passes locally.
- [ ] `git diff --check` passes.
- [ ] No secrets, tokens, account IDs, or private operational details are committed.
- [ ] No `.env` files are committed.
- [ ] Docs/examples do not contain real Cloudflare tokens or account IDs.
- [ ] Workflow, environment, deployment, secret scanning, or future IaC changes received extra review.

## Accessibility Validation

`pnpm check:a11y` runs pa11y against the built site served locally from `dist/`. It checks practical WCAG 2.2 AA issues including landmark usage, heading structure, semantic HTML concerns, image alternative text when images exist, and detectable color contrast issues.

Automated checks are useful but incomplete. They cannot fully prove usability with screen readers, keyboard-only workflows, cognitive accessibility, translation quality, or whether visible content is contextually clear. Manual review should remain part of any production launch.

Accessibility is treated as a first-class engineering concern, not a final polish step. The platform starts with semantic HTML, responsive layout behavior, low client-side complexity, and multilingual readiness so future domains can grow without rebuilding the accessibility baseline. See [Governance](docs/governance.md#accessibility-philosophy).

If pa11y cannot locate a browser locally, set:

```sh
PA11Y_CHROME_PATH="C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
```

## Smoke Testing

`pnpm smoke` builds the project, serves `dist/` locally, and verifies:

- expected placeholder text renders
- the configured site URL appears in rendered output
- canonical metadata is present
- `PUBLIC_ROBOTS_INDEX=false` produces non-indexing metadata and `robots.txt`
- sitemap output references the configured canonical site URL

Run `pnpm build` before `pnpm check:a11y` when using the accessibility command by itself.

## Environment Variables

See [.env.example](.env.example) for the public build-time variables expected by the platform.

Required per deployment:

- `PUBLIC_SITE_URL`
- `PUBLIC_SITE_TITLE`

Defaulted safely when unset:

- `PUBLIC_SITE_NAME` defaults to `PUBLIC_SITE_TITLE`
- `PUBLIC_SITE_DESCRIPTION` defaults to a generic placeholder description
- `PUBLIC_PRIMARY_LOCALE` defaults to `en`
- `PUBLIC_SECONDARY_LOCALE` defaults to `zh-CN`
- `PUBLIC_CONTACT_URL` defaults to an empty string
- `PUBLIC_ROBOTS_INDEX` defaults to `false` and must be explicitly set to `true` to allow indexing.

`PUBLIC_SITE_URL` remains required because it defines canonical URLs, sitemap output, Open Graph URLs, and deployment identity. Defaults reduce onboarding friction, but identity-critical values still fail fast when missing.

Supported Phase 6A locale values are `en` and `zh-CN`. Invalid locale values fail environment validation clearly.

## Project Structure

```text
src/
  components/       Reusable Astro components
  config/           Zod-validated public configuration
  content/          Locale-ready copy modules
  layouts/          Document and metadata shell
  pages/            Static routes
  styles/           Shared CSS
docs/               Governance and operating documentation
```

## Recommended First Commit

```sh
git add .
git commit -m "chore: initialize governance-first Astro platform"
```
