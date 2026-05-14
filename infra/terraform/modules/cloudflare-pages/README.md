# Cloudflare Pages Module Design

This module is a validation-safe interface contract for future Cloudflare Pages project management. It does not create, import, modify, or destroy Cloudflare resources in Phase 5C.

## Purpose

The module defines the reusable inputs and outputs expected for a future one-domain-per-project Cloudflare Pages model.

## Inputs

| Name                     | Purpose                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `project_name`           | Cloudflare Pages project name following `placeholder-[domain-name]`.               |
| `production_branch`      | Git branch intended for production deployments.                                    |
| `build_command`          | Build command used by Cloudflare Pages.                                            |
| `build_output_directory` | Output directory deployed by Cloudflare Pages.                                     |
| `environment_variables`  | Public project variables aligned with the platform's `PUBLIC_` rendering contract. |

## Non-Destructive Status

This module currently contains no resources. It exists to validate naming, input shape, and future interface stability before any infrastructure is onboarded.

Cloudflare dashboard configuration remains the source of truth until a later import or migration phase.
