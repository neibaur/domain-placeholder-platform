# Deployment

This document covers deployment readiness only. Cloudflare implementation work should remain separate from documentation and governance refinement changes.

## Cloudflare Pages

Create one Cloudflare Pages project per deployed domain when isolated configuration, branch controls, or future operational ownership boundaries are useful.

Recommended model:

- one shared GitHub repository
- one Cloudflare Pages project per domain
- domain-specific `PUBLIC_` environment variables per project
- no hardcoded production domain values in application source

## Project Naming Convention

Use this strict Cloudflare Pages project naming format:

```text
placeholder-[domain-name]
```

Replace dots with hyphens.

| Domain      | Cloudflare Pages Project |
| ----------- | ------------------------ |
| `68tai.com` | `placeholder-68tai-com`  |
| `6gou8.com` | `placeholder-6gou8-com`  |
| `6xi8.com`  | `placeholder-6xi8-com`   |

Consistent names improve operational clarity, reduce ambiguity when multiple domains share one repository, and make future Terraform import or state mapping predictable.

Recommended build settings:

- Framework preset: `Astro`
- Build command: `pnpm build`
- Build output directory: `dist`
- Node.js version: `22`
- Package manager: `pnpm`

The architecture rationale for static output and Cloudflare Pages hosting is documented in [Architecture](architecture.md#why-astro).

## Production Deployment Checklist

- `pnpm validate` passes locally.
- The target Cloudflare Pages project has all required `PUBLIC_` variables configured.
- `PUBLIC_SITE_URL` exactly matches the production origin, including `https://`.
- `PUBLIC_ROBOTS_INDEX` is `false` until the domain is intentionally ready for search indexing.
- No secrets, Cloudflare account IDs, registrant details, or private contact details are committed.
- GitHub branch protection requires the validation workflow before merge.
- Cloudflare production deployments are connected to `main`.
- Preview deployments do not publish unintended ownership or operational metadata.
- `public/.well-known/security.txt` is either intentionally configured with public URLs or removed.

The full Definition of Done is maintained in [Governance](governance.md#definition-of-done).

## Preview Deployment Checklist

- Preview deployments use non-production branch deployments or pull request previews.
- Preview environment variables do not expose secrets, private ownership metadata, or private operational contacts.
- Preview `PUBLIC_SITE_URL` points to the preview origin when canonical validation is needed.
- Preview `PUBLIC_ROBOTS_INDEX` remains `false`.
- Preview output passes smoke and accessibility checks before production promotion.
- Preview URLs are not treated as durable public entry points.

## Environment Variables

Set these in each Cloudflare Pages project:

```text
PUBLIC_SITE_URL=https://68tai.com
PUBLIC_SITE_NAME=Domain Placeholder
PUBLIC_SITE_TITLE=Domain Placeholder
PUBLIC_SITE_DESCRIPTION=A lightweight placeholder page for a reserved domain.
PUBLIC_PRIMARY_LOCALE=en
PUBLIC_SECONDARY_LOCALE=zh-CN
PUBLIC_ROBOTS_INDEX=false
```

Repeat with the appropriate `PUBLIC_SITE_URL` for `6gou8.com` and `6xi8.com`.

The full pilot matrix is maintained in [Cloudflare Environment Variables](cloudflare-env.md).

## Custom Domain Configuration

For each Cloudflare Pages project:

1. Create or select the project using the naming convention above.
2. Connect the shared GitHub repository.
3. Set the production branch to `main`.
4. Configure build settings and project-specific `PUBLIC_` variables.
5. Add the matching custom domain in Cloudflare Pages.
6. Confirm Cloudflare creates or uses the expected DNS record.
7. Wait for the custom domain certificate and routing status to become active.
8. Verify the deployed domain before enabling search indexing.

Do not attach multiple pilot domains to one Pages project unless there is an explicit reviewed reason. Separate projects allow one domain to be paused, rolled back, or detached without affecting the others.

## Post-Deployment Verification

Run these checks for each deployed domain:

| Check                | Expected Result                                                                                             |
| -------------------- | ----------------------------------------------------------------------------------------------------------- |
| Placeholder content  | The page renders the expected placeholder title and description.                                            |
| Canonical metadata   | `link rel="canonical"` uses the deployed `https://` domain.                                                 |
| Robots metadata      | The page contains `noindex,nofollow` while `PUBLIC_ROBOTS_INDEX=false`.                                     |
| `robots.txt`         | `https://<domain>/robots.txt` matches the indexing posture.                                                 |
| Sitemap              | `https://<domain>/sitemap-index.xml` exists and references the deployed domain.                             |
| Accessibility        | pa11y passes locally before deploy, and manual spot checks confirm readable responsive layout after deploy. |
| Mobile layout        | Content remains readable on narrow viewports.                                                               |
| Operational metadata | Rendered output does not expose unnecessary ownership, account, deployment, or private contact details.     |

Useful browser checks:

```text
https://<domain>/
https://<domain>/robots.txt
https://<domain>/sitemap-index.xml
```

## Rollback Guidance

Use the least disruptive rollback that isolates the affected domain while preserving the shared repository and other Pages projects.

Recommended order:

1. Roll back the affected Pages project to the previous successful deployment from the Cloudflare Pages dashboard.
2. If the issue is configuration-related, correct only that project's environment variables and redeploy.
3. If the domain must be removed temporarily, detach the custom domain from the affected Pages project.
4. If DNS routing must be stopped quickly, remove or disable only the affected DNS record.
5. Keep the other pilot domain projects attached and deploying normally unless they share the same verified issue.

Break-glass options for a single affected domain:

- Disable automatic deployments for the affected Pages project.
- Remove the affected custom domain from Cloudflare Pages.
- Detach or pause the affected DNS record.
- Set `PUBLIC_ROBOTS_INDEX=false` and redeploy if indexing exposure is the concern.

Record the action taken, affected project name, timestamp, and follow-up owner in the incident or deployment notes. Do not add private incident details to public repository files.

## Privacy Notes

Minimize unnecessary exposure of operational metadata in repository files, generated output, and deployment settings. Avoid storing registrant names, contact emails, account IDs, private ownership context, or private business context in source control. Public contact URLs may be configured only when intentionally published.

## Future Terraform Integration

TODO(terraform): Manage Cloudflare Pages projects, custom domains, DNS records, and environment variables through reviewed infrastructure code.
