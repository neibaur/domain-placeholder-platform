# Cloudflare Pages Environment Variables

Use this checklist for each Cloudflare Pages project. These examples are documentation-only and must not be copied into application source code.

Cloudflare Pages project variables are the source of truth for deployed preview and production behavior. Local `.env` files are only for local development and validation, and they are intentionally ignored by git.

For local builds that should load `.env`, use:

```sh
pnpm build:local
```

For CI and Cloudflare builds, use `pnpm build` with environment variables already provided by the runner or Cloudflare project settings.

## Pilot Domain Matrix

These are documentation-only deployment examples. Do not copy pilot domain values into application source code.

| Domain      | Pages project                    | `PUBLIC_SITE_URL`   | `PUBLIC_SITE_TITLE`  | `PUBLIC_ROBOTS_INDEX` |
| ----------- | -------------------------------- | ------------------- | -------------------- | --------------------- |
| `68tai.com` | `placeholder-platform-68tai-com` | `https://68tai.com` | `Domain Placeholder` | defaults to `false`   |
| `6gou8.com` | `placeholder-platform-6gou8-com` | `https://6gou8.com` | `Domain Placeholder` | defaults to `false`   |
| `6xi8.com`  | `placeholder-platform-6xi8-com`  | `https://6xi8.com`  | `Domain Placeholder` | defaults to `false`   |

The Pages project naming convention is documented in [Deployment](deployment.md#project-naming-convention).

## Example Per-Domain Values

### 68tai.com

```text
PUBLIC_SITE_URL=https://68tai.com
PUBLIC_SITE_TITLE=Domain Placeholder
```

### 6gou8.com

```text
PUBLIC_SITE_URL=https://6gou8.com
PUBLIC_SITE_TITLE=Domain Placeholder
```

### 6xi8.com

```text
PUBLIC_SITE_URL=https://6xi8.com
PUBLIC_SITE_TITLE=Domain Placeholder
```

## Required Public Variables

- `PUBLIC_SITE_URL`: canonical origin for metadata, robots, and sitemap generation.
- `PUBLIC_SITE_TITLE`: visible page title and metadata title.

`PUBLIC_SITE_URL` remains required because it defines canonical metadata, sitemap output, Open Graph URLs, and deployment identity. `PUBLIC_SITE_TITLE` remains required because it is the primary visible identity for the placeholder page.

## Safe Defaulted Public Variables

- `PUBLIC_SITE_NAME`: defaults to `PUBLIC_SITE_TITLE`.
- `PUBLIC_SITE_DESCRIPTION`: defaults to a generic placeholder description.
- `PUBLIC_PRIMARY_LOCALE`: defaults to `en`.
- `PUBLIC_SECONDARY_LOCALE`: defaults to `zh-CN`.
- `PUBLIC_CONTACT_URL`: defaults to an empty string.
- `PUBLIC_ROBOTS_INDEX`: defaults to `false`.

Defaults reduce onboarding friction without hiding identity-critical misconfiguration. `PUBLIC_ROBOTS_INDEX=false` is conservative for parked, private, test, or prelaunch domains.

TODO(terraform): Convert this matrix into Terraform variables once Cloudflare project provisioning is automated.
