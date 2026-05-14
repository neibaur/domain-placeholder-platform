# Terraform and IaC Planning

Phase 5A is planning-only. It documents the intended infrastructure-as-code direction for this repository and does not provision, import, modify, or destroy any Cloudflare resources.

## Current Maturity

The repository has an operational governance, validation, and deployment-readiness foundation. Terraform/IaC is still planning-only: there is no provider configuration, no backend configuration, no state, no import workflow, and no apply automation.

This project is ready for a future non-destructive Terraform validation phase where formatting and validation can run without touching real infrastructure.

## Intended Future Scope

Future Terraform work may manage:

- Cloudflare Pages projects for each placeholder domain.
- DNS records needed for each custom domain.
- Cloudflare Pages custom domain mappings.
- Cloudflare Pages project environment variables.
- Future email routing if a domain needs public-facing mail handling.

The Cloudflare dashboard remains the source of truth until resources are intentionally imported into Terraform state or recreated through a reviewed migration plan.

## IaC Safety Principles

- Do not commit real secrets, API tokens, account IDs, zone IDs, or private ownership metadata.
- Do not introduce unmanaged destructive changes.
- Do not run production `terraform apply` from CI initially.
- Use a plan-before-apply workflow for every environment.
- Require manual review before any future remediation, import, or apply.
- Keep Cloudflare dashboard configuration authoritative until each resource is intentionally imported or recreated.
- Prefer small, reversible changes with clear rollback notes.
- Minimize unnecessary exposure of operational metadata in code, plans, state, logs, and documentation.

> IaC work should validate before provisioning. Manual review remains required before infrastructure changes, imports, remediation, or apply workflows.

## Naming Conventions

Future Cloudflare Pages resources should preserve the existing project naming convention:

```text
placeholder-[domain-name]
```

Examples:

| Domain      | Future Pages Project    |
| ----------- | ----------------------- |
| `68tai.com` | `placeholder-68tai-com` |
| `6gou8.com` | `placeholder-6gou8-com` |
| `6xi8.com`  | `placeholder-6xi8-com`  |

Predictable names support safer imports, operational clarity, rollback and debugging, and future automation.

## Proposed Future Directory Structure

No Terraform files are added in Phase 5A. A future skeleton may use:

```text
infra/
  terraform/
    modules/
      cloudflare-pages/
    environments/
      pilot/
```

Phase 5B should introduce only validation-safe placeholder structure and formatting commands. Provider configuration, backend configuration, and credentials should wait until the safety model is reviewed.

## State Management Considerations

Terraform state can contain sensitive operational metadata, even when variables are not secret. Future state management should be reviewed before any state files exist.

Possible future approaches:

- remote state storage
- Cloudflare R2 or another reviewed backend
- GitHub Actions environments and secrets for controlled workflow access
- protected CI workflows for plan-only checks
- manual approval before apply workflows

Do not commit local state files, generated plans, provider credentials, or backend secrets.

## Phase 5 Roadmap

| Phase    | Goal                                | Success Definition                                                                                               |
| -------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 5B       | Terraform Validation Skeleton       | Terraform formatting and validation can run in CI without provisioning or modifying infrastructure.              |
| 5C       | Cloudflare Module Design            | Reusable module structure and provider strategy are documented or scaffolded safely without destructive changes. |
| 5D       | Safe Import / Migration Strategy    | Existing Cloudflare resources can be mapped to future Terraform state through a reviewed, reversible plan.       |
| 5E       | Optional Automation Helpers         | Helper tooling improves inventory or onboarding workflows without storing secrets or applying unmanaged changes. |
| Future 6 | Localization / Internationalization | Multilingual placeholder structure is planned or implemented with accessibility and UTF-8 considerations.        |
| Future 7 | Operational Expansion               | Optional features are evaluated without weakening the core low-cost, governance-first platform model.            |
