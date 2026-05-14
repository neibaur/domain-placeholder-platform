locals {
  normalized_project_name = lower(var.project_name)
  project_subdomain       = "${local.normalized_project_name}.pages.dev"

  public_environment_variables = {
    for key, value in var.environment_variables : key => value
    if startswith(key, "PUBLIC_")
  }
}
