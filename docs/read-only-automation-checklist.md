# Read-Only Automation Checklist

This checklist must be satisfied before any future read-only Cloudflare integration is approved. It does not approve automation by itself; it defines the minimum review bar for a later phase.

The current project posture remains manual review only. No Cloudflare API calls, Wrangler flows, Terraform import, Terraform apply, remediation, backend service, SSR behavior, database, or runtime API is introduced by this document.

## Business Justification

- [ ] The reason for automation is concrete and recurring.
- [ ] Manual review has become too slow, inconsistent, or risky for the current domain count.
- [ ] The expected benefit is larger than the credential, metadata exposure, and maintenance risk.
- [ ] A decision has been made that doing nothing remains insufficient.

## Operational Need

- [ ] The exact comparison scope is documented.
- [ ] Each checked field maps to structured inventory intent.
- [ ] Each checked field maps to a Cloudflare dashboard location or read-only endpoint.
- [ ] The check reports drift; it does not remediate drift.
- [ ] Manual review remains possible without the automation.

## Scale Threshold

- [ ] The number of domains or review frequency justifies automation.
- [ ] The operational burden is documented with examples.
- [ ] A smaller improvement, such as better docs or local-only checklist generation, is not enough.

## Token Scope Minimization

Any future integration must use:

- granular Cloudflare API tokens
- least-privilege permissions
- scoped account, zone, or project access where possible
- short-lived or rotatable credentials where practical
- GitHub Actions secrets only if CI usage is approved

Explicitly forbidden:

- Global API Keys
- broadly scoped account tokens
- write-capable tokens for read-only checks
- committed tokens
- sample real token values
- token names that reveal private account structure

Preferred hardening, when practical:

- IP allowlisting
- restricted runners
- short token rotation windows
- separate tokens for local and CI use

## Secret Management

- [ ] Tokens are stored only in approved secret storage.
- [ ] Local `.env` files remain untracked.
- [ ] CI secrets are available only to approved workflows.
- [ ] Pull request workflows from untrusted forks cannot access secrets.
- [ ] Logs never print token values, token names, account IDs, zone IDs, or private identifiers.

## Execution Mode

- [ ] Local-only execution is evaluated before CI execution.
- [ ] CI execution, if approved, is opt-in or manually triggered by default.
- [ ] The check is not required for normal static-site builds unless separately approved.
- [ ] Network failures fail closed without mutation.
- [ ] Timeout behavior is documented.
- [ ] Rate limit behavior is documented.

## Output Redaction

Sanitize by default:

- Values explicitly classified as public may be shown.
- Values not explicitly classified as public must be redacted.
- Use placeholders such as `[REDACTED]` or `***`.
- Prefer reporting field names, status, and comparison result over raw values.

Do not print:

- secrets
- account IDs
- zone IDs
- token names
- private email addresses
- registrant details
- billing data
- internal-only identifiers
- private incident details

## Logging Restrictions

- [ ] Logs are concise and public-safe.
- [ ] Debug logging is disabled by default.
- [ ] Error messages do not include raw API responses until reviewed.
- [ ] CI artifacts do not persist sensitive operational metadata.

## Failure Handling

- [ ] API errors do not mutate source files, Terraform state, or Cloudflare settings.
- [ ] Drift findings are review items, not automatic failures, unless a later phase explicitly approves gating.
- [ ] False positives have a documented override or annotation path.
- [ ] The check can be disabled quickly without affecting deployments.

## Safe Defaults

- [ ] No write permissions.
- [ ] No remediation.
- [ ] No Terraform apply.
- [ ] No Terraform import.
- [ ] No DNS changes.
- [ ] No Pages project changes.
- [ ] No Email Routing changes.
- [ ] No secret rotation.

## Review And Approval

- [ ] ADR status and governance docs are updated.
- [ ] Security review covers token scope and output exposure.
- [ ] Operations review covers dashboard ownership and manual fallback.
- [ ] CI review covers trigger mode and secret exposure.
- [ ] Tests cover redaction, failure behavior, and deterministic output without fake live API expectations.
- [ ] Rollback plan explains how to disable the check.

## Manual Override Posture

Cloudflare dashboard remains the operational source of truth until a later accepted ADR changes that model. Human review can intentionally accept drift, update inventory intent, or update Cloudflare settings manually. Automation must not bypass that decision.

## Explicit Non-Goals

Future read-only automation must not:

- mutate Cloudflare configuration
- auto-remediate drift
- auto-apply Terraform
- import Terraform state
- rotate secrets
- modify DNS
- modify Pages projects
- modify Email Routing
- expose sensitive values
- bypass manual governance review
