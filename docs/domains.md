# Domain Inventory

This inventory records public, non-sensitive operational metadata for placeholder domains. It is not Terraform state, does not grant Terraform authority, and should be reconciled against the Cloudflare dashboard before any deployment, import planning, or drift review.

Do not record Cloudflare account IDs, zone IDs, API tokens, registrant details, private ownership notes, or private operational contacts here.

## Inventory Fields

| Field                    | Purpose                                                                                  |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| Domain                   | Public domain served by the placeholder platform.                                        |
| Cloudflare Pages project | Expected project name using `placeholder-platform-[domain-name]`.                        |
| Operational status       | Current known status from manual onboarding or verification.                             |
| Supported locales        | Locale values supported by the shared platform build.                                    |
| Contact routing status   | Public-safe status for optional Cloudflare Email Routing such as `help@<domain>`.        |
| Terraform status         | Current Terraform posture for the domain.                                                |
| Notes                    | Public-safe follow-up notes without account identifiers, ownership metadata, or secrets. |

## Current Domains

| Domain      | Cloudflare Pages Project         | Operational Status | Supported Locales   | Contact Routing Status | Terraform Status                   | Notes                                                                |
| ----------- | -------------------------------- | ------------------ | ------------------- | ---------------------- | ---------------------------------- | -------------------------------------------------------------------- |
| `68tai.com` | `placeholder-platform-68tai-com` | To be confirmed    | `en`, `zh-CN`, `th` | To be confirmed        | Validation-only; non-authoritative | Initial platform domain; verify against Cloudflare before promotion. |
| `6gou8.com` | `placeholder-platform-6gou8-com` | To be confirmed    | `en`, `zh-CN`, `th` | To be confirmed        | Validation-only; non-authoritative | Initial platform domain; verify against Cloudflare before promotion. |
| `6xi8.com`  | `placeholder-platform-6xi8-com`  | To be confirmed    | `en`, `zh-CN`, `th` | To be confirmed        | Validation-only; non-authoritative | Initial platform domain; verify against Cloudflare before promotion. |

## Governance Notes

- Treat this file as an operational inventory for review and onboarding, not as a source of truth for automated provisioning.
- Cloudflare dashboard configuration remains the operational source of truth.
- Terraform remains validation-only and non-authoritative until a later reviewed phase explicitly changes that posture.
- Update this inventory after onboarding, production validation, contact routing decisions, or drift review.
- Keep examples and notes synthetic or public-safe.
