# Terraform and IaC Planning

Phase 5A is planning-only. It documents the intended infrastructure-as-code direction for this repository and does not provision, import, modify, or destroy any Cloudflare resources.

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

| Phase | Goal                                                                                |
| ----- | ----------------------------------------------------------------------------------- |
| 5B    | Add a validation-only Terraform skeleton and formatting/check guidance.             |
| 5C    | Design Cloudflare provider usage and reusable module boundaries.                    |
| 5D    | Document safe import and migration strategy for existing Cloudflare Pages projects. |
| 5E    | Consider optional helper automation once manual workflows are proven.               |
