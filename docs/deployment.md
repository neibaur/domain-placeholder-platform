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
placeholder-platform-[domain-name]
```

Replace dots with hyphens.

| Domain      | Cloudflare Pages Project         |
| ----------- | -------------------------------- |
| `68tai.com` | `placeholder-platform-68tai-com` |
| `6gou8.com` | `placeholder-platform-6gou8-com` |
| `6xi8.com`  | `placeholder-platform-6xi8-com`  |

Consistent names improve operational clarity, reduce ambiguity when multiple domains share one repository, and make future Terraform import or state mapping predictable.

Future Terraform import planning should use the keyed address patterns documented in [Terraform and IaC Planning](iac.md#future-import-mapping-preparation). Manual Cloudflare configuration can be recorded with the [Cloudflare Inventory Template](cloudflare-inventory.md) before any future import attempt.

Recommended build settings:

- Framework preset: `Astro`
- Build command: `pnpm build`
- Build output directory: `dist`
- Node.js version: `22`
- Package manager: `pnpm`

The architecture rationale for static output and Cloudflare Pages hosting is documented in [Architecture](architecture.md#why-astro).

Use `pnpm build` for Cloudflare Pages because Cloudflare injects project environment variables into the build process. Use `pnpm build:local` only for local builds that should explicitly load `.env`.

## New Domain Onboarding

Use this lightweight flow before adding another domain to the portfolio:

1. Choose the domain identifier and Pages project name using `placeholder-platform-[domain-name]`.
2. Create or select one Cloudflare Pages project for that domain.
3. Confirm the project builds from `main` with `pnpm build` and `dist`.
4. Set required Cloudflare Pages variables: `PUBLIC_SITE_URL` and `PUBLIC_SITE_TITLE`.
5. Decide whether to rely on safe defaults for optional public variables.
6. Keep `PUBLIC_ROBOTS_INDEX=false` until indexing is explicitly approved.
7. Validate the Pages subdomain before attaching the custom domain.
8. Attach the custom domain and confirm DNS/certificate status.
9. Run post-deployment verification and update the [Cloudflare Inventory Template](cloudflare-inventory.md).

Do not attach a new domain to an existing pilot Pages project unless that shared deployment has a reviewed operational reason.

## Deployment Safety Controls

Deployment safety depends on keeping each domain isolated and each deployment target explicit.

- Verify the Cloudflare Pages project name follows `placeholder-platform-[domain-name]` before changing settings.
- Confirm the selected project matches the intended custom domain.
- Review deployment-specific `PUBLIC_` variables before each production rollout.
- Confirm `PUBLIC_SITE_URL` matches the exact production origin for that project.
- Validate canonical URLs, sitemap output, and `robots.txt` after deployment.
- Keep `PUBLIC_ROBOTS_INDEX=false` until indexing is explicitly intended.
- Minimize unnecessary exposure of operational metadata in generated output and documentation.

Predictable project names support safer rollback procedures, operational clarity, multi-domain scaling, and future Terraform/IaC import or management.

## Production Deployment Checklist

- [ ] `pnpm validate` passes locally.
- [ ] Correct Cloudflare Pages project selected, using `placeholder-platform-[domain-name]`.
- [ ] Correct custom domain mapped to the selected Pages project.
- [ ] Project-specific `PUBLIC_` variables reviewed.
- [ ] `PUBLIC_SITE_URL` exactly matches the production origin, including `https://`.
- [ ] `PUBLIC_ROBOTS_INDEX` matches the intended indexing posture.
- [ ] Smoke validation and accessibility validation pass before rollout.
- [ ] No secrets, Cloudflare account IDs, registrant details, or private contact details are committed.
- [ ] Preview deployments do not publish unintended ownership or operational metadata.
- [ ] Rollback path is understood for the selected single-domain Pages project.
- [ ] `public/.well-known/security.txt` is either intentionally configured with public URLs or removed.

The full Definition of Done is maintained in [Governance](governance.md#definition-of-done).

## Operational Readiness Checklist

Before treating a domain deployment as operationally ready:

- [ ] Repository validation passes with `pnpm validate`.
- [ ] Cloudflare Pages build succeeds for the intended project.
- [ ] Required `PUBLIC_` variables are present in the selected environment.
- [ ] Optional/defaulted `PUBLIC_` variables are intentionally set or intentionally omitted.
- [ ] Pages subdomain behavior is verified before custom domain attachment.
- [ ] Preview deployment behavior is reviewed separately from production.
- [ ] Canonical metadata uses the intended `PUBLIC_SITE_URL`.
- [ ] Page robots metadata and `robots.txt` match the intended indexing posture.
- [ ] `sitemap-index.xml` references the intended production origin.
- [ ] DNS and custom domain routing are active.
- [ ] Rollback or break-glass path is understood for the single domain.
- [ ] Inventory documentation is updated with validation notes.

## Preview Deployment Checklist

- Preview deployments use non-production branch deployments or pull request previews.
- Preview environment variables do not expose secrets, private ownership metadata, or private operational contacts.
- Preview `PUBLIC_SITE_URL` points to the preview origin when canonical validation is needed.
- Preview `PUBLIC_ROBOTS_INDEX` remains `false`.
- Preview output passes smoke and accessibility checks before production promotion.
- Preview URLs are not treated as durable public entry points.

## Environment Variables

Set these identity-critical variables in each Cloudflare Pages project:

```text
PUBLIC_SITE_URL=https://68tai.com
PUBLIC_SITE_TITLE=Domain Placeholder
```

Optional safe defaults can be omitted during initial onboarding:

```text
PUBLIC_SITE_NAME defaults to PUBLIC_SITE_TITLE
PUBLIC_SITE_DESCRIPTION defaults to A lightweight placeholder page for a reserved domain.
PUBLIC_PRIMARY_LOCALE defaults to en
PUBLIC_SECONDARY_LOCALE defaults to zh-CN
PUBLIC_CONTACT_URL defaults to an empty string
PUBLIC_ROBOTS_INDEX defaults to false
```

Repeat with the appropriate `PUBLIC_SITE_URL` and `PUBLIC_SITE_TITLE` for `6gou8.com` and `6xi8.com`.

`PUBLIC_SITE_URL` remains required because it defines canonical metadata, sitemap generation, Open Graph URLs, and deployment identity. `PUBLIC_ROBOTS_INDEX` defaults to `false` so new or parked domains do not become indexable unless explicitly approved.

The full pilot matrix is maintained in [Cloudflare Environment Variables](cloudflare-env.md).

Local `.env` files are not a deployment source of truth. They are developer convenience files for local commands, while Cloudflare Pages project variables control preview and production behavior.

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

Prefer rollback when the deployed output is broken, the wrong project/domain was targeted, canonical or robots behavior is unsafe, or the fix is not immediately obvious. Prefer a forward-fix when the issue is low-risk, clearly understood, and can be corrected faster than reverting without increasing exposure.

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

Validate rollback success by checking:

- the affected domain serves the expected placeholder content again
- canonical metadata points to the correct domain
- `robots.txt` and page-level robots metadata match the intended indexing posture
- `sitemap-index.xml` references the correct production origin
- other pilot domains remain unaffected

## Privacy Notes

Minimize unnecessary exposure of operational metadata in repository files, generated output, and deployment settings. Avoid storing registrant names, contact emails, account IDs, private ownership context, or private business context in source control. Public contact URLs may be configured only when intentionally published.

## Future Terraform Integration

TODO(terraform): Manage Cloudflare Pages projects, custom domains, DNS records, and environment variables through reviewed infrastructure code.

Terraform remains validation-only and non-authoritative. Future import or migration work should follow the staged strategy in [Terraform and IaC Planning](iac.md#safe-import-strategy) and should not recreate existing Cloudflare resources.

Phase 6 localization work should continue to preserve this deployment model: one shared codebase, project-specific configuration, and domain-level isolation.
