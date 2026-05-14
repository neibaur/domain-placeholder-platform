output "project_name" {
  description = "Validated Cloudflare Pages project name."
  value       = local.normalized_project_name
}

output "project_subdomain" {
  description = "Expected Cloudflare Pages preview subdomain shape."
  value       = local.project_subdomain
}

output "project_identifier" {
  description = "Stable future inventory identifier for this project."
  value       = local.normalized_project_name
}

output "public_environment_variable_keys" {
  description = "PUBLIC_ environment variable keys accepted by the module contract."
  value       = sort(keys(local.public_environment_variables))
}
