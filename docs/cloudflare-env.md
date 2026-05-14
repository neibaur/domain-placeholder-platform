# Cloudflare Pages Environment Variables

Use this checklist for each Cloudflare Pages project. These examples are documentation-only and must not be copied into application source code.

## Pilot Domain Matrix

These are documentation-only deployment examples. Do not copy pilot domain values into application source code.

| Domain      | Pages project           | `PUBLIC_SITE_URL`   | `PUBLIC_SITE_NAME`   | `PUBLIC_ROBOTS_INDEX` |
| ----------- | ----------------------- | ------------------- | -------------------- | --------------------- |
| `68tai.com` | `placeholder-68tai-com` | `https://68tai.com` | `Domain Placeholder` | `false`               |
| `6gou8.com` | `placeholder-6gou8-com` | `https://6gou8.com` | `Domain Placeholder` | `false`               |
| `6xi8.com`  | `placeholder-6xi8-com`  | `https://6xi8.com`  | `Domain Placeholder` | `false`               |

The Pages project naming convention is documented in [Deployment](deployment.md#project-naming-convention).

## Example Per-Domain Values

### 68tai.com

```text
PUBLIC_SITE_URL=https://68tai.com
PUBLIC_SITE_NAME=Domain Placeholder
PUBLIC_SITE_TITLE=Domain Placeholder
PUBLIC_SITE_DESCRIPTION=A lightweight placeholder page for a reserved domain.
PUBLIC_PRIMARY_LOCALE=en
PUBLIC_SECONDARY_LOCALE=zh-CN
PUBLIC_ROBOTS_INDEX=false
```

### 6gou8.com

```text
PUBLIC_SITE_URL=https://6gou8.com
PUBLIC_SITE_NAME=Domain Placeholder
PUBLIC_SITE_TITLE=Domain Placeholder
PUBLIC_SITE_DESCRIPTION=A lightweight placeholder page for a reserved domain.
PUBLIC_PRIMARY_LOCALE=en
PUBLIC_SECONDARY_LOCALE=zh-CN
PUBLIC_ROBOTS_INDEX=false
```

### 6xi8.com

```text
PUBLIC_SITE_URL=https://6xi8.com
PUBLIC_SITE_NAME=Domain Placeholder
PUBLIC_SITE_TITLE=Domain Placeholder
PUBLIC_SITE_DESCRIPTION=A lightweight placeholder page for a reserved domain.
PUBLIC_PRIMARY_LOCALE=en
PUBLIC_SECONDARY_LOCALE=zh-CN
PUBLIC_ROBOTS_INDEX=false
```

## Required Public Variables

- `PUBLIC_SITE_URL`: canonical origin for metadata, robots, and sitemap generation.
- `PUBLIC_SITE_NAME`: public site label.
- `PUBLIC_SITE_TITLE`: visible page title and metadata title.
- `PUBLIC_SITE_DESCRIPTION`: visible metadata description.
- `PUBLIC_PRIMARY_LOCALE`: primary BCP 47 language code.

## Optional Public Variables

- `PUBLIC_SECONDARY_LOCALE`: secondary BCP 47 language code.
- `PUBLIC_CONTACT_URL`: intentionally public contact or policy URL.
- `PUBLIC_ROBOTS_INDEX`: `true` or `false`; defaults to `false` when unset.

TODO(terraform): Convert this matrix into Terraform variables once Cloudflare project provisioning is automated.
