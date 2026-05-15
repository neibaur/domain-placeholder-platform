# Domain Inventory

This inventory records public, non-sensitive operational metadata for placeholder domains. The structured source is [src/config/domains.ts](../src/config/domains.ts); this document remains the human-readable operational view.

It is not Terraform state, does not grant Terraform authority, and should be reconciled against the Cloudflare dashboard before any deployment, import planning, or drift review.

Do not record Cloudflare account IDs, zone IDs, API tokens, registrant details, private ownership notes, or private operational contacts here.

## Inventory Fields

| Field                    | Purpose                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| Domain                   | Public domain served by the placeholder platform.                                          |
| Cloudflare Pages project | Expected project name using `placeholder-platform-[domain-name]`.                          |
| Primary locale           | Intended `PUBLIC_PRIMARY_LOCALE` value for the domain.                                     |
| Secondary locales        | Intended secondary locale posture for the domain.                                          |
| Robots indexing          | Intended governance posture for `PUBLIC_ROBOTS_INDEX`; this is not live Cloudflare parity. |
| Contact routing          | Public-safe status for optional Cloudflare Email Routing such as `help@<domain>`.          |
| Terraform authority      | Current Terraform authority stage for the domain.                                          |
| Operational status       | Current lifecycle status: `active`, `maintenance`, `retired`, or `planned`.                |
| Notes                    | Public-safe follow-up notes without account identifiers, ownership metadata, or secrets.   |

## Current Domains

| Domain      | Cloudflare Pages Project         | Primary Locale | Secondary Locales | Robots Indexing | Contact Routing | Terraform Authority       | Operational Status | Notes                                                                      |
| ----------- | -------------------------------- | -------------- | ----------------- | --------------- | --------------- | ------------------------- | ------------------ | -------------------------------------------------------------------------- |
| `68tai.com` | `placeholder-platform-68tai-com` | `en`           | `zh-CN`, `th`     | Disabled        | Disabled        | `stage-0-validation-only` | `active`           | Initial platform domain; verify live Cloudflare settings before promotion. |
| `6gou8.com` | `placeholder-platform-6gou8-com` | `en`           | `zh-CN`, `th`     | Disabled        | Disabled        | `stage-0-validation-only` | `active`           | Initial platform domain; verify live Cloudflare settings before promotion. |
| `6xi8.com`  | `placeholder-platform-6xi8-com`  | `en`           | `zh-CN`, `th`     | Disabled        | Disabled        | `stage-0-validation-only` | `active`           | Initial platform domain; verify live Cloudflare settings before promotion. |

## Structured Validation

The TypeScript inventory validates:

- supported locale values
- duplicate domain prevention
- Pages project naming convention
- constrained operational status values
- constrained Terraform authority stage values

Tests also check that each structured inventory domain appears in this document. This is drift awareness only; docs are not generated from the inventory.

## Robots Governance

`robotsIndexingEnabled` represents intended operational posture for each domain and should align with the selected Cloudflare Pages project's `PUBLIC_ROBOTS_INDEX` value.

This repository does not read Cloudflare environment variables, call Cloudflare APIs, or enforce live parity. A future reviewed phase may compare local inventory intent against deployed Cloudflare configuration if automation is introduced.

## Governance Notes

- Treat this file as an operational inventory for review and onboarding, not as a source of truth for automated provisioning.
- Cloudflare dashboard configuration remains the operational source of truth.
- Terraform remains validation-only and non-authoritative until a later reviewed phase explicitly changes that posture.
- Update this inventory after onboarding, production validation, contact routing decisions, or drift review.
- Update the structured inventory and this document together.
- Keep examples and notes synthetic or public-safe.
