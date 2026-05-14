# Cloudflare Inventory Template

This template is for future Terraform import planning only. It does not make Terraform authoritative and should not contain secrets, API tokens, account IDs, zone IDs, project IDs, private ownership records, or private operational contacts.

Cloudflare remains the operational source of truth until a reviewed import or migration plan intentionally changes that authority.

## Inventory Guidance

Record enough information to compare the Cloudflare dashboard with future Terraform configuration before any import.

- Use public domain names and public build settings only.
- Record whether values differ between preview and production.
- Keep sensitive values in Cloudflare, GitHub Secrets, or future reviewed secret workflows.
- Treat unknown differences as drift concerns for review.
- Update validation fields after onboarding, deployment verification, or drift review.

## Project Inventory

| Domain      | Onboarding State | Cloudflare Pages Project         | Pages Subdomain                            | Production Branch | Build Command | Build Output Directory | `PUBLIC_SITE_URL`   | `PUBLIC_SITE_TITLE` | `PUBLIC_ROBOTS_INDEX` | Custom Domain Attached? | DNS Status      |
| ----------- | ---------------- | -------------------------------- | ------------------------------------------ | ----------------- | ------------- | ---------------------- | ------------------- | ------------------- | --------------------- | ----------------------- | --------------- |
| `68tai.com` | To be confirmed  | `placeholder-platform-68tai-com` | `placeholder-platform-68tai-com.pages.dev` | `main`            | `pnpm build`  | `dist`                 | `https://68tai.com` | To be confirmed     | To be confirmed       | To be confirmed         | To be confirmed |
| `6gou8.com` | To be confirmed  | `placeholder-platform-6gou8-com` | `placeholder-platform-6gou8-com.pages.dev` | `main`            | `pnpm build`  | `dist`                 | `https://6gou8.com` | To be confirmed     | To be confirmed       | To be confirmed         | To be confirmed |
| `6xi8.com`  | To be confirmed  | `placeholder-platform-6xi8-com`  | `placeholder-platform-6xi8-com.pages.dev`  | `main`            | `pnpm build`  | `dist`                 | `https://6xi8.com`  | To be confirmed     | To be confirmed       | To be confirmed         | To be confirmed |

## Validation Metadata

| Domain      | Last Validated  | Validated By    | Validation Notes | Drift Observed? | Import Readiness Notes |
| ----------- | --------------- | --------------- | ---------------- | --------------- | ---------------------- |
| `68tai.com` | To be confirmed | To be confirmed | To be confirmed  | To be confirmed | To be confirmed        |
| `6gou8.com` | To be confirmed | To be confirmed | To be confirmed  | To be confirmed | To be confirmed        |
| `6xi8.com`  | To be confirmed | To be confirmed | To be confirmed  | To be confirmed | To be confirmed        |

## Deployment Verification Notes

Use the checklist in [Deployment](deployment.md#operational-readiness-checklist) before marking a domain ready.

Record:

- Pages subdomain verification before custom domain attachment.
- Canonical URL verification after `PUBLIC_SITE_URL` is set.
- `robots.txt` and page robots metadata behavior.
- Sitemap output.
- Preview versus production environment differences.
- DNS/custom domain status.
- Rollback or break-glass notes.

## Import Planning Notes

Before future import, confirm:

- The project exists and serves expected placeholder content.
- The project name follows `placeholder-platform-[domain-name]`.
- Required `PUBLIC_` variables match the intended deployment identity.
- Preview and production environment variables are intentionally different, if they differ.
- Custom domain and DNS records are stable.
- Rollback or break-glass steps are documented for that single domain.
- Last validated date and drift notes are current.
