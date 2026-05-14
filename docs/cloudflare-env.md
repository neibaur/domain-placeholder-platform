# Cloudflare Pages Environment Variables

Use this checklist for each Cloudflare Pages project.

## Pilot Domain Matrix

| Domain      | `PUBLIC_SITE_URL`   | `PUBLIC_ROBOTS_INDEX` |
| ----------- | ------------------- | --------------------- |
| `68tai.com` | `https://68tai.com` | `false`               |
| `6gou8.com` | `https://6gou8.com` | `false`               |
| `6xi8.com`  | `https://6xi8.com`  | `false`               |

## Required Public Variables

- `PUBLIC_SITE_URL`: canonical origin for metadata, robots, and sitemap generation.
- `PUBLIC_SITE_NAME`: public site label.
- `PUBLIC_SITE_TITLE`: visible page title and metadata title.
- `PUBLIC_SITE_DESCRIPTION`: visible metadata description.
- `PUBLIC_PRIMARY_LOCALE`: primary BCP 47 language code.
- `PUBLIC_ROBOTS_INDEX`: `true` or `false`.

## Optional Public Variables

- `PUBLIC_SECONDARY_LOCALE`: secondary BCP 47 language code.
- `PUBLIC_CONTACT_URL`: intentionally public contact or policy URL.

TODO(terraform): Convert this matrix into Terraform variables once Cloudflare project provisioning is automated.
