# Domain Lifecycle

This guide standardizes common domain lifecycle changes while preserving the current static-first, Cloudflare-dashboard-first operating model.

Lifecycle metadata lives in [src/config/domains.ts](../src/config/domains.ts) and is summarized in [Domain Inventory](domains.md). It is public-safe operational intent, not Terraform state, deployment automation, or live Cloudflare configuration.

## Status Values

| Status        | Meaning                                                                 |
| ------------- | ----------------------------------------------------------------------- |
| `planned`     | Domain is expected to be onboarded but is not operational yet.          |
| `active`      | Domain is operational or intended to remain publicly reachable.         |
| `maintenance` | Domain is temporarily paused, reviewed, or undergoing operational work. |
| `retired`     | Domain is no longer intended to serve the placeholder platform.         |

## Terraform Authority Values

| Value                       | Meaning                                                               |
| --------------------------- | --------------------------------------------------------------------- |
| `stage-0-validation-only`   | Cloudflare dashboard is authoritative; Terraform validates only.      |
| `stage-1-import-planned`    | Import planning exists, but Terraform does not manage live resources. |
| `stage-2-imported-readonly` | Read-only import posture is being evaluated.                          |
| `stage-3-authoritative`     | Terraform authority is intentionally approved for the domain.         |

All current domains remain at `stage-0-validation-only`.

## Adding A Domain

Use [Domain Onboarding](domain-onboarding.md). Add the domain to the structured inventory and the human-readable inventory in the same pull request.

Before marking a domain `active`, confirm:

- Cloudflare Pages project follows `placeholder-platform-[domain-name]`.
- Required `PUBLIC_` variables are configured in Cloudflare.
- `robotsIndexingEnabled` reflects the intended `PUBLIC_ROBOTS_INDEX` value.
- Primary and secondary locales are supported by the platform.
- Preview and production deployments have been validated.

## Temporarily Disabling Indexing

Set `robotsIndexingEnabled` to `false` in the structured inventory and update [Domain Inventory](domains.md). Then update the selected Cloudflare Pages project's `PUBLIC_ROBOTS_INDEX=false` value manually in Cloudflare and redeploy.

Validate:

- page-level robots metadata
- `/robots.txt`
- sitemap output
- [Domain Inventory](domains.md) notes

Do not add Cloudflare API calls or automatic environment parity checks in this phase.

## Changing Locale Support

Locale changes should remain explicit and validation-first:

- Confirm the locale exists in the platform locale source of truth.
- Update `primaryLocale` or `secondaryLocales` in the structured inventory.
- Update the matching Cloudflare Pages `PUBLIC_PRIMARY_LOCALE` or `PUBLIC_SECONDARY_LOCALE` value manually.
- Update [Domain Inventory](domains.md).
- Run local validation before deployment review.

Route-based localization remains out of scope.

## Maintenance Mode

Use `maintenance` when a domain is intentionally paused or being reviewed while it may still serve static placeholder output.

Recommended checks:

- Confirm `PUBLIC_ROBOTS_INDEX=false` unless indexing remains intentionally approved.
- Confirm rollback or forward-fix path for the single domain.
- Keep notes public-safe and avoid incident details that belong outside the repository.

## Retiring A Domain

Use `retired` only after the operational decision is reviewed. Retiring a domain in inventory does not detach DNS, delete a Cloudflare Pages project, transfer ownership, or change Terraform authority.

Retirement checklist:

- Confirm the intended DNS and Pages behavior in Cloudflare.
- Disable indexing before or during retirement unless there is a reviewed reason not to.
- Record public-safe retirement notes.
- Preserve rollback or transfer notes outside the repository if they contain private details.

## Transfer Preparation

Ownership transfer may involve private registrant, account, billing, or legal details. Do not commit those details.

Repository-safe transfer preparation can include:

- setting `operationalStatus` to `maintenance` or `retired`
- confirming indexing posture
- confirming no private contact or ownership data appears in docs or generated output
- documenting public-safe handoff notes only

## Rollback Philosophy

Prefer domain-scoped rollback or forward-fix. The shared repository serves multiple domains, so operational recovery should avoid disrupting unaffected Pages projects.

Recommended order:

1. Correct the affected Cloudflare Pages project configuration.
2. Redeploy only the affected Pages project.
3. Roll back only the affected Pages project if the new output is unsafe.
4. Detach or pause only the affected custom domain when needed.
5. Update inventory notes with public-safe facts after recovery.

Future automation may compare inventory intent with Cloudflare configuration, but only after a reviewed phase introduces safe read-only checks.
