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

| Area                                  | Status                                                                            |
| ------------------------------------- | --------------------------------------------------------------------------------- |
| Governance-first foundation           | Operational. Documentation, validation, review, and safety guidance are in place. |
| Multi-domain deployment architecture  | Documented. One shared repository and one Cloudflare Pages project per domain.    |
| CI/CD quality and security validation | Operational. Validation, CodeQL, and Gitleaks workflows are defined.              |
| Accessibility, smoke, and env checks  | Operational through `pnpm validate`.                                              |
| Terraform/IaC planning                | Documented in [Terraform and IaC Planning](docs/iac.md).                          |
| Terraform validation skeleton         | Operational. Formatting and validation run without provisioning.                  |

Cloudflare provisioning, Terraform applies, imports, production environment configs, and automation helpers are not implemented.

## Documentation Map

| Document                                                   | Purpose                                                                                             |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [Architecture](docs/architecture.md)                       | Explains the Astro/static-site design, configuration flow, SEO behavior, and future IaC boundaries. |
| [Governance](docs/governance.md)                           | Defines workflow expectations, CI/CD gates, review standards, and Definition of Done.               |
| [Deployment](docs/deployment.md)                           | Captures Cloudflare Pages setup expectations and the pre-deployment checklist.                      |
| [Security and Privacy](docs/security-and-privacy.md)       | Defines public configuration boundaries and operational metadata privacy expectations.              |
| [Cloudflare Environment Variables](docs/cloudflare-env.md) | Provides documentation-only examples for pilot domain environment configuration.                    |
| [Terraform and IaC Planning](docs/iac.md)                  | Documents future Terraform scope, safety principles, naming, and Phase 5 roadmap.                   |

## Deployment Model

The recommended Cloudflare Pages model is one shared GitHub repository with one Cloudflare Pages project per domain. Each project supplies its own `PUBLIC_` environment variables, so production domain values stay out of application source code.

| Domain      | Cloudflare Pages Project |
| ----------- | ------------------------ |
| `68tai.com` | `placeholder-68tai-com`  |
| `6gou8.com` | `placeholder-6gou8-com`  |
| `6xi8.com`  | `placeholder-6xi8-com`   |

See [Deployment](docs/deployment.md) for production, preview, verification, and rollback checklists before connecting Cloudflare resources.

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
- markdownlint
- Zod environment validation checks
- Astro type checking and production build
- production smoke tests against generated `dist/` output
- automated accessibility checks against the served production output

The same validation path is expected in CI before merge. See [Governance](docs/governance.md#cicd-pipeline) for the full CI/CD pipeline and branch protection expectations.

Current commands:

| Command            | Purpose                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `pnpm build:local` | Loads local `.env` through `dotenv-cli`, then runs the normal build.                                                     |
| `pnpm check:env`   | Runs [scripts/check-env-validation.ts](scripts/check-env-validation.ts) for positive and negative Zod validation checks. |
| `pnpm smoke`       | Runs [scripts/smoke-production.mjs](scripts/smoke-production.mjs) against generated production output.                   |
| `pnpm check:a11y`  | Runs [scripts/check-accessibility.mjs](scripts/check-accessibility.mjs) with pa11y against served `dist/`.               |
| `pnpm validate`    | Runs formatting, linting, markdown, env, smoke, and accessibility checks as the main confidence command.                 |

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

Required:

- `PUBLIC_SITE_URL`
- `PUBLIC_SITE_NAME`
- `PUBLIC_SITE_TITLE`
- `PUBLIC_SITE_DESCRIPTION`
- `PUBLIC_PRIMARY_LOCALE`

Optional:

- `PUBLIC_SECONDARY_LOCALE`
- `PUBLIC_CONTACT_URL`
- `PUBLIC_ROBOTS_INDEX` defaults to `false` and must be explicitly set to `true` to allow indexing.

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
