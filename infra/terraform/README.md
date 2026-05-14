# Terraform Validation Skeleton

This directory is a validation-only Terraform foundation. Phase 5B introduces structure, formatting standards, and safe CI validation without provisioning, importing, modifying, or destroying infrastructure.

## Current Scope

- `terraform fmt -recursive -check`
- `terraform init -backend=false`
- `terraform validate`

No Cloudflare resources are declared here yet. Terraform is not authoritative for existing Cloudflare resources in this phase.

Phase 5C adds a reusable Cloudflare Pages module contract under [modules/cloudflare-pages](modules/cloudflare-pages/README.md). The module defines inputs, validation, and outputs only; it does not declare Cloudflare resources.

Phase 5D documents safe import and migration planning. It does not add import blocks, state files, remote backends, resources, apply workflows, or Cloudflare credentials.

## Local Validation

Install Terraform from HashiCorp's official installation guidance, then run:

```sh
cd infra/terraform
terraform fmt -recursive -check
terraform init -backend=false
terraform validate
terraform -chdir=modules/cloudflare-pages init -backend=false
terraform -chdir=modules/cloudflare-pages validate
```

These commands validate formatting and configuration only. They do not apply changes, create state in a remote backend, or provision Cloudflare resources.

## Safety Boundaries

- Do not commit Cloudflare credentials, account IDs, zone IDs, or API tokens.
- Do not add `terraform apply` or `terraform destroy` workflows.
- Do not configure remote state in this phase.
- Do not import existing Cloudflare resources in this phase.
- Keep Cloudflare dashboard configuration as the source of truth until a reviewed import or migration phase.

## Future Import Planning

Future imports should use reviewed keyed module addresses such as:

```text
module.cloudflare_pages["68tai-com"].cloudflare_pages_project.this
```

This address is conceptual until the root configuration declares keyed module instances and the module declares Cloudflare resources.

Before any future import, record the existing Cloudflare configuration, verify the project follows `placeholder-platform-[domain-name]`, and review the strategy in [Terraform and IaC Planning](../../docs/iac.md#safe-import-strategy).
