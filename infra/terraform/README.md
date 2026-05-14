# Terraform Validation Skeleton

This directory is a validation-only Terraform foundation. Phase 5B introduces structure, formatting standards, and safe CI validation without provisioning, importing, modifying, or destroying infrastructure.

## Current Scope

- `terraform fmt -recursive -check`
- `terraform init -backend=false`
- `terraform validate`

No Cloudflare resources are declared here yet. Terraform is not authoritative for existing Cloudflare resources in this phase.

## Local Validation

Install Terraform from HashiCorp's official installation guidance, then run:

```sh
cd infra/terraform
terraform fmt -recursive -check
terraform init -backend=false
terraform validate
```

These commands validate formatting and configuration only. They do not apply changes, create state in a remote backend, or provision Cloudflare resources.

## Safety Boundaries

- Do not commit Cloudflare credentials, account IDs, zone IDs, or API tokens.
- Do not add `terraform apply` or `terraform destroy` workflows.
- Do not configure remote state in this phase.
- Do not import existing Cloudflare resources in this phase.
- Keep Cloudflare dashboard configuration as the source of truth until a reviewed import or migration phase.
