# Drift Preparedness

This document prepares the platform for future safe read-only drift checks between structured inventory intent and Cloudflare reality. Phase 7C does not add live checks, Cloudflare API calls, Wrangler behavior, Terraform import, Terraform apply, remediation, or deployment automation.

## Purpose

Drift preparedness makes future review easier by defining what can be compared, where to check it manually today, and which safety rules must exist before any automation is introduced.

The current posture is:

- [src/config/domains.ts](../src/config/domains.ts) records intended public-safe operational posture.
- Cloudflare dashboard settings remain the operational source of truth.
- Terraform remains validation-only or import-planning only.
- No tool in this repository reads Cloudflare configuration.
- No tool in this repository mutates Cloudflare configuration.

## Authority Boundaries

| Source                    | Role                                                                 |
| ------------------------- | -------------------------------------------------------------------- |
| Structured inventory      | Intended public-safe operational posture for managed domains.        |
| Cloudflare dashboard      | Operational source of truth for live Pages, DNS, and Email Routing.  |
| Terraform                 | Validation-only and non-authoritative until a later reviewed phase.  |
| `/platform.json`          | Public static platform metadata, not a live configuration inventory. |
| Local drift review helper | Deterministic manual checklist generation only.                      |

Inventory drift means the documented intent and live Cloudflare settings appear different. It does not mean Terraform should fix anything, and it does not authorize automated remediation.

## Comparison Mapping

| Inventory Field         | Intended Meaning                                      | Cloudflare Manual Check Location                   | Expected `PUBLIC_` Variable | Notes / Future Automation Candidate                                      |
| ----------------------- | ----------------------------------------------------- | -------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------ |
| `domain`                | Public domain expected to serve the placeholder page. | Cloudflare DNS and Pages custom domains.           | `PUBLIC_SITE_URL`           | Future read-only check could compare custom domain mappings and URL.     |
| `pagesProjectName`      | Expected Cloudflare Pages project name.               | Cloudflare Pages project list.                     | None                        | Future read-only check could list Pages projects.                        |
| `primaryLocale`         | Intended root document language and primary copy.     | Pages > Settings > Environment Variables.          | `PUBLIC_PRIMARY_LOCALE`     | Future read-only check could compare environment variable value.         |
| `secondaryLocales`      | Allowed/intended secondary locale posture.            | Pages > Settings > Environment Variables.          | `PUBLIC_SECONDARY_LOCALE`   | Runtime currently accepts one configured secondary locale per project.   |
| `robotsIndexingEnabled` | Intended indexing governance posture.                 | Pages > Settings > Environment Variables.          | `PUBLIC_ROBOTS_INDEX`       | Future read-only check could compare boolean intent to string variable.  |
| `contactRoutingEnabled` | Intended public contact routing posture.              | Cloudflare Email Routing rules and routing status. | None                        | Future read-only check could compare routing presence, if safely scoped. |
| `terraformAuthority`    | IaC governance stage for the domain.                  | Repository governance and Terraform planning docs. | None                        | Not a Cloudflare setting; do not treat this as live infrastructure data. |
| Operational convention  | Production branch should remain `main`.               | Pages > Settings > Builds & deployments.           | None                        | Future read-only check could compare production branch.                  |
| Operational convention  | Site title should be public-safe and intentional.     | Pages > Settings > Environment Variables.          | `PUBLIC_SITE_TITLE`         | Inventory does not store title text yet; manual review remains required. |
| Operational convention  | Custom domain should attach to the intended project.  | Pages > Custom domains and DNS records.            | None                        | Future read-only check could compare project-domain association.         |

## Manual Drift Review

Use this process today:

1. Inspect [src/config/domains.ts](../src/config/domains.ts).
2. Run `pnpm inventory:drift-review` for a deterministic manual review table.
3. Open the matching Cloudflare Pages project in the dashboard.
4. Confirm the project name matches `placeholder-platform-[domain-name]`.
5. Confirm the production branch is `main`.
6. Confirm the custom domain is attached to the intended Pages project.
7. Compare `PUBLIC_SITE_URL`.
8. Compare `PUBLIC_SITE_TITLE`.
9. Compare `PUBLIC_PRIMARY_LOCALE`.
10. Compare `PUBLIC_SECONDARY_LOCALE`.
11. Compare `PUBLIC_ROBOTS_INDEX` with `robotsIndexingEnabled`.
12. Compare contact routing intent with Cloudflare Email Routing setup.
13. Confirm Terraform authority remains governance-only unless a later reviewed phase changes it.
14. Update structured inventory and docs if intent changed.
15. Update Cloudflare manually if implementation drifted intentionally.
16. Do not use Terraform apply, Terraform import, or automated remediation for drift in this phase.

The helper can also print JSON for diff-friendly local review:

```sh
pnpm inventory:drift-review -- --json
```

## Local Helper Rules

`pnpm inventory:drift-review` is:

- idempotent
- read-only
- deterministic
- network-free
- secret-free
- mutation-free
- deployment-free

It generates inventory-derived manual review data only. It does not compare against live Cloudflare settings.

Helper output follows a sanitize-by-default posture:

- values explicitly classified as public may be shown
- values not explicitly classified as public are redacted
- no Cloudflare account IDs, zone IDs, project IDs, token names, private emails, or secret values should appear

Future read-only automation must satisfy the [Read-Only Automation Checklist](read-only-automation-checklist.md) before implementation.

## Never Compare Or Expose

Do not compare, print, commit, or expose:

- Cloudflare API tokens
- Cloudflare account IDs
- zone IDs
- project IDs that are not intentionally public
- registrant details
- billing details
- private ownership notes
- private email addresses
- private incident notes
- Terraform state
- Terraform plan files with sensitive metadata
- local `.env` contents

## Safety Rules Before Future API Usage

Any future read-only Cloudflare integration requires a separate reviewed phase and must satisfy all of these rules before implementation:

- The integration is read-only by design and permission scope.
- API tokens are stored only in approved secret storage, never in source.
- Logs redact identifiers and never print token material.
- Output is public-safe by default.
- CI usage is opt-in and reviewed separately.
- Network failures fail closed without changing source, state, or Cloudflare settings.
- No remediation, provisioning, import, apply, or delete behavior is present.
- Rate limits and API errors are handled without retry storms.
- Documentation explains exactly which Cloudflare endpoints are read.
- A rollback plan exists for disabling the check.

## Automation Review Checklist

Before any future automation is introduced:

- [ ] The goal is read-only drift detection, not remediation.
- [ ] Cloudflare API scopes are minimal and documented.
- [ ] No Terraform authority change is bundled with the automation.
- [ ] No deployment workflow change is bundled with the automation.
- [ ] Secret handling is reviewed.
- [ ] Output examples are reviewed for public-safety.
- [ ] Failure behavior is reviewed.
- [ ] Manual review remains possible without the automation.
- [ ] The change is covered by focused tests without fake live API mocks.
- [ ] Governance docs are updated.

## Current Non-Goals

- No Cloudflare API calls.
- No Wrangler deployment behavior.
- No Terraform apply/import behavior.
- No backend services, SSR, databases, or runtime APIs.
- No live environment parity enforcement.
- No automatic source, dashboard, DNS, or Email Routing changes.
