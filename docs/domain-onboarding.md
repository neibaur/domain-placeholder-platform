# Domain Onboarding

Use this checklist when adding a new placeholder domain. The goal is repeatable, low-risk onboarding through Cloudflare Pages Git integration without adding deployment automation, Terraform authority, or runtime infrastructure.

## Naming Convention

Cloudflare Pages projects should use:

```text
placeholder-platform-[domain-name]
```

Replace dots with hyphens.

Examples:

| Domain      | Cloudflare Pages Project         |
| ----------- | -------------------------------- |
| `68tai.com` | `placeholder-platform-68tai-com` |
| `6gou8.com` | `placeholder-platform-6gou8-com` |
| `6xi8.com`  | `placeholder-platform-6xi8-com`  |

This naming convention is operational governance. It does not make Terraform authoritative and does not create or manage Cloudflare resources.

## Checklist

- [ ] Confirm domain ownership and DNS visibility in Cloudflare.
- [ ] Create or identify one Cloudflare Pages project for the domain.
- [ ] Confirm the project name follows `placeholder-platform-[domain-name]`.
- [ ] Connect the Pages project to this GitHub repository.
- [ ] Configure the production branch as `main`.
- [ ] Configure the build command as `pnpm build`.
- [ ] Configure the build output directory as `dist`.
- [ ] Configure required `PUBLIC_` variables:
  - `PUBLIC_SITE_URL=https://<domain>`
  - `PUBLIC_SITE_TITLE=<public placeholder title>`
- [ ] Configure optional public variables only when intentionally needed:
  - `PUBLIC_SITE_NAME`
  - `PUBLIC_SITE_DESCRIPTION`
  - `PUBLIC_PRIMARY_LOCALE`
  - `PUBLIC_SECONDARY_LOCALE`
  - `PUBLIC_CONTACT_URL`
  - `PUBLIC_ROBOTS_INDEX`
- [ ] Keep `PUBLIC_ROBOTS_INDEX=false` unless indexing is explicitly approved.
- [ ] Validate the Pages preview or pages.dev deployment before attaching the custom domain.
- [ ] Attach the custom domain and confirm DNS and certificate status.
- [ ] Validate production output:
  - rendered placeholder content
  - canonical URL
  - `robots.txt`
  - sitemap output
  - root and locale-specific `lang` attributes
  - responsive readability
- [ ] Optionally configure Cloudflare Email Routing for `help@<domain>`.
- [ ] Add the domain to the structured inventory in [src/config/domains.ts](../src/config/domains.ts).
- [ ] Update [Domain Inventory](domains.md).
- [ ] Run local validation commands.
- [ ] Open a pull request with this checklist copied into the PR description or linked from the PR.

## Inventory Fields

Each new domain should define:

- `domain`
- `pagesProjectName`
- `primaryLocale`
- `secondaryLocales`
- `robotsIndexingEnabled`
- `contactRoutingEnabled`
- `terraformAuthority`
- `operationalStatus`
- `notes`

`robotsIndexingEnabled` is documented operational intent and should match the Cloudflare Pages project's `PUBLIC_ROBOTS_INDEX` value. This repository does not read Cloudflare variables or call Cloudflare APIs.

## Local Validation

Run before opening the onboarding PR:

```sh
pnpm install
pnpm validate
pnpm test
pnpm test:coverage
```

Use `pnpm build:local` only when you intentionally want to load local `.env` values for developer validation. Cloudflare Pages production and preview builds should receive variables from the selected Pages project.

## Public Metadata Check

After build or deployment, `/platform.json` should be available as a static metadata artifact. It is safe for public hosting and should not contain secrets, account IDs, zone IDs, private emails, registrant details, or internal-only notes.

## Pull Request Checklist

- [ ] Domain and project name follow `placeholder-platform-[domain-name]`.
- [ ] Required `PUBLIC_` variables are documented and configured in Cloudflare, not source code.
- [ ] Optional locale, contact, and robots values are intentionally selected.
- [ ] Structured inventory and [Domain Inventory](domains.md) agree.
- [ ] Preview deployment has been checked before production promotion.
- [ ] Production deployment has been checked after custom domain attachment.
- [ ] [Domain Inventory](domains.md) is updated.
- [ ] No secrets, account identifiers, private ownership metadata, or private contacts are committed.
- [ ] `pnpm validate`, `pnpm test`, and `pnpm test:coverage` pass locally or CI failures are explained.

## Non-Goals

- No Cloudflare deployment automation.
- No Terraform apply behavior.
- No backend, database, API server, analytics pipeline, or form processor.
- No route-based localization unless a later reviewed phase introduces it.
