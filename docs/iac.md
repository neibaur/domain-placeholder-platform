# Terraform and IaC Planning

Phase 5A started the infrastructure-as-code planning foundation. The repository now includes validation-only Terraform structure and module contracts, but it still does not provision, import, modify, or destroy any Cloudflare resources.

## Current Maturity

The repository has an operational governance, validation, and deployment-readiness foundation. Terraform/IaC now has a validation-only skeleton, a reusable Cloudflare Pages module contract, and a safe import planning strategy: there is provider version pinning, backend-free validation, module input validation, output design, and documented import governance, but no resources, no backend configuration, no state, no import automation, and no apply workflow.

This project can run non-destructive Terraform formatting and validation without touching real infrastructure.

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

## Terraform Validation Skeleton

Phase 5B introduces:

- `infra/terraform/versions.tf`
- `infra/terraform/providers.tf`
- placeholder directories for `modules/`, `environments/`, and `shared/`
- a Terraform validation-only GitHub Actions workflow

The workflow and local commands run formatting, backend-free initialization, and validation only:

```sh
terraform fmt -recursive -check
terraform init -backend=false
terraform validate
```

They do not include `terraform apply`, `terraform destroy`, remote state, imports, production environments, Cloudflare resources, or credentials.

## Cloudflare Pages Module Contract

Phase 5C adds a reusable module contract at `infra/terraform/modules/cloudflare-pages/`.

The module currently defines:

- `project_name`
- `production_branch`
- `build_command`
- `build_output_directory`
- `environment_variables`

The contract is designed for one Cloudflare Pages project per domain. It validates the `placeholder-platform-[domain-name]` project naming convention and requires environment variable keys to use the platform's `PUBLIC_` convention.

The module has outputs for future inventory and operational workflows:

- `project_name`
- `project_subdomain`
- `project_identifier`
- `public_environment_variable_keys`

The module intentionally declares no Cloudflare resources in this phase. Cloudflare dashboard configuration remains the source of truth until future import or migration work.

## Naming Conventions

Future Cloudflare Pages resources should preserve the existing project naming convention:

```text
placeholder-platform-[domain-name]
```

Examples:

| Domain      | Future Pages Project             |
| ----------- | -------------------------------- |
| `68tai.com` | `placeholder-platform-68tai-com` |
| `6gou8.com` | `placeholder-platform-6gou8-com` |
| `6xi8.com`  | `placeholder-platform-6xi8-com`  |

Predictable names support safer imports, operational clarity, rollback and debugging, and future automation.

## Current Directory Structure

The current validation skeleton uses:

```text
infra/
  terraform/
    versions.tf
    providers.tf
    modules/
      cloudflare-pages/
    environments/
    shared/
```

Provider resource design, backend configuration, production environments, imports, and credentials should wait until the safety model is reviewed.

## State Management Considerations

Terraform state can contain sensitive operational metadata, even when variables are not secret. Future state management should be reviewed before any state files exist.

Possible future approaches:

- remote state storage
- Cloudflare R2 or another reviewed backend
- GitHub Actions environments and secrets for controlled workflow access
- protected CI workflows for plan-only checks
- manual approval before apply workflows

Do not commit local state files, generated plans, provider credentials, or backend secrets.

## Future Import Mapping Preparation

Phase 5D maps existing manual Cloudflare Pages projects to reviewed Terraform address patterns before any import occurs.

Conceptual mapping examples:

| Existing Cloudflare Pages Project | Future Terraform Address                                             |
| --------------------------------- | -------------------------------------------------------------------- |
| `placeholder-platform-68tai-com`  | `module.cloudflare_pages["68tai-com"].cloudflare_pages_project.this` |
| `placeholder-platform-6gou8-com`  | `module.cloudflare_pages["6gou8-com"].cloudflare_pages_project.this` |
| `placeholder-platform-6xi8-com`   | `module.cloudflare_pages["6xi8-com"].cloudflare_pages_project.this`  |

These examples assume a future root configuration uses keyed module instances, such as `for_each`, keyed by domain identifiers with dots replaced by hyphens. The current module does not declare `cloudflare_pages_project.this`, so these addresses are planning examples only.

Do not execute imports, add import blocks, or migrate resources until a later phase adds reviewed Terraform resources, state handling, and approval controls.

## Terraform Authority Stages

Terraform authority should mature in explicit stages:

| Stage | Name                                          | Meaning                                                                                       |
| ----- | --------------------------------------------- | --------------------------------------------------------------------------------------------- |
| 0     | Manual Cloudflare / Terraform validation-only | Cloudflare dashboard is authoritative; Terraform validates structure and contracts only.      |
| 1     | Import planning / inventory                   | Manual Cloudflare configuration is recorded and mapped before any state operation.            |
| 2     | Read-only import rehearsal                    | Import behavior is rehearsed in a non-production or disposable context where possible.        |
| 3     | Controlled import into state                  | Existing resources are imported only after review, backup, and rollback planning.             |
| 4     | Plan-only drift review                        | Terraform plans are reviewed to understand differences before any apply is considered.        |
| 5     | Carefully reviewed apply, future only         | Applies are manually approved and limited to well-understood, reversible infrastructure work. |

This repository is currently between Stage 0 and Stage 1. Terraform validates contracts and documentation now; Cloudflare remains the operational source of truth.

## Safe Import Strategy

Future import work should onboard existing Cloudflare Pages projects without recreating them. Import should happen only after the manually managed project has been deployed, verified, and documented.

Safe import principles:

- Inventory the current Cloudflare dashboard configuration before writing Terraform resources.
- Confirm the Pages project is stable and follows `placeholder-platform-[domain-name]`.
- Model the existing resource shape in Terraform before attempting import.
- Import existing resources into state instead of allowing Terraform to create replacement resources.
- Review `terraform plan` output after import and resolve unexpected differences manually.
- Treat unknown drift as a review item, not as something Terraform should fix automatically.
- Keep the Cloudflare dashboard as the recovery path during early onboarding.

The manual inventory template is maintained in [Cloudflare Inventory Template](cloudflare-inventory.md).

## Import Readiness Checklist

Before any future import is attempted:

- [ ] Cloudflare Pages project exists and is stable.
- [ ] Project name follows `placeholder-platform-[domain-name]`.
- [ ] Production branch is confirmed.
- [ ] Build command is confirmed.
- [ ] Build output directory is confirmed.
- [ ] Required and optional `PUBLIC_` variables are inventoried.
- [ ] Preview and production variable differences are understood.
- [ ] Custom domains are inventoried.
- [ ] DNS records are inventoried.
- [ ] Rollback or break-glass path is documented.
- [ ] No secrets, API tokens, account IDs, or private metadata are stored in Terraform.
- [ ] Current manual Cloudflare configuration is exported, screenshotted, or recorded.
- [ ] Repository validation passes.
- [ ] Import behavior has been tested in a non-production or sandbox scenario when possible.

## Import Command Examples

The following commands are examples only. They are not ready-to-run instructions and must be verified against the Cloudflare Terraform provider documentation before use.

```sh
terraform import 'module.cloudflare_pages["68tai-com"].cloudflare_pages_project.this' '<account_id>/<project_name>'
terraform import 'module.cloudflare_pages["6gou8-com"].cloudflare_pages_project.this' '<account_id>/<project_name>'
terraform import 'module.cloudflare_pages["6xi8-com"].cloudflare_pages_project.this' '<account_id>/<project_name>'
```

The exact import ID format depends on the provider resource being imported. Do not place real account IDs, project IDs, API tokens, or state files in the repository.

## Drift and Reconciliation Strategy

After a future import, drift review should be plan-only until the team understands every difference.

Recommended review flow:

1. Capture the current Cloudflare dashboard configuration.
2. Import one project in a controlled context.
3. Run `terraform plan` without applying changes.
4. Compare Terraform output against the recorded dashboard configuration.
5. Resolve differences in code or manually in Cloudflare only after review.
6. Repeat for build settings, environment variables, custom domains, and DNS records.

Do not use Terraform to automatically remediate unknown drift. Differences in `PUBLIC_` variables, build commands, branches, custom domains, or DNS should be treated as operational findings until reviewed.

## Import Rollback and Break-Glass

If future import state is wrong, prefer state correction over infrastructure changes.

Conceptual recovery options:

```sh
terraform state rm 'module.cloudflare_pages["68tai-com"].cloudflare_pages_project.this'
```

- Remove the affected resource from Terraform state without destroying the Cloudflare resource.
- Restore from a reviewed backup state if state corruption occurs.
- Pause Terraform adoption for a specific project while continuing manual Cloudflare management.
- Keep dashboard access and existing rollback procedures available during early onboarding.

Do not run `terraform destroy` or destructive apply operations as part of initial import recovery.

## Phase 5 Roadmap

| Phase    | Goal                                | Success Definition                                                                                               |
| -------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 5B       | Terraform Validation Skeleton       | Terraform formatting and validation can run in CI without provisioning or modifying infrastructure.              |
| 5C       | Cloudflare Module Design            | Reusable module structure and provider strategy are documented or scaffolded safely without destructive changes. |
| 5D       | Safe Import / Migration Strategy    | Existing Cloudflare resources can be mapped to future Terraform state through a reviewed, reversible plan.       |
| 5E       | Optional Automation Helpers         | Helper tooling improves inventory or onboarding workflows without storing secrets or applying unmanaged changes. |
| Future 6 | Localization / Internationalization | Multilingual placeholder structure is planned or implemented with accessibility and UTF-8 considerations.        |
| Future 7 | Operational Expansion               | Optional features are evaluated without weakening the core low-cost, governance-first platform model.            |
