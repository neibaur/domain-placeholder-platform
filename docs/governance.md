# Governance

## Workflow

- Use trunk-based development with short-lived branches.
- Protect `main`.
- Require pull requests for all merges.
- Require passing validation checks before merge.
- Use conventional commits.
- Prefer documentation-first changes for architecture, deployment, security, and operational practices.

## Review Standards

Every PR should answer:

- What changed?
- How was it validated?
- Does it expose or imply private domain ownership metadata?
- Does it preserve environment-variable-driven rendering?
- Does it remain lightweight and maintainable?

## CI Gates

The validation workflow runs:

- Prettier check
- ESLint
- markdownlint
- Astro type checking
- Production build

CodeQL runs on pull requests, pushes to `main`, and a weekly schedule.
