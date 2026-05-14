variable "project_name" {
  type        = string
  description = "Cloudflare Pages project name. Must follow placeholder-[domain-name], with dots replaced by hyphens."

  validation {
    condition     = can(regex("^placeholder-[a-z0-9]+(-[a-z0-9]+)*$", var.project_name))
    error_message = "project_name must follow placeholder-[domain-name], using lowercase letters, numbers, and hyphens."
  }
}

variable "production_branch" {
  type        = string
  description = "Git branch intended for future Cloudflare Pages production deployments."
  default     = "main"

  validation {
    condition     = length(trimspace(var.production_branch)) > 0
    error_message = "production_branch must not be empty."
  }
}

variable "build_command" {
  type        = string
  description = "Build command intended for Cloudflare Pages."
  default     = "pnpm build"

  validation {
    condition     = length(trimspace(var.build_command)) > 0
    error_message = "build_command must not be empty."
  }
}

variable "build_output_directory" {
  type        = string
  description = "Build output directory intended for Cloudflare Pages."
  default     = "dist"

  validation {
    condition     = length(trimspace(var.build_output_directory)) > 0
    error_message = "build_output_directory must not be empty."
  }
}

variable "environment_variables" {
  type        = map(string)
  description = "Future Cloudflare Pages environment variables. Public rendered values should use PUBLIC_ keys."
  default     = {}

  validation {
    condition = alltrue([
      for key in keys(var.environment_variables) : can(regex("^PUBLIC_[A-Z0-9_]+$", key))
    ])
    error_message = "environment_variables keys must use the PUBLIC_ prefix and uppercase snake case."
  }
}
