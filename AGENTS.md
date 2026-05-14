# AGENTS.md

## Working Principles

This repository is governance-first. Prefer maintainable, documented, and reviewable changes over clever abstractions.

## Engineering Expectations

- Keep domain-specific values out of source code.
- Use `PUBLIC_` environment variables for rendered public values.
- Do not commit secrets, Cloudflare tokens, account IDs, registrant details, or private ownership metadata.
- Preserve static-site generation unless a future requirement clearly needs runtime rendering.
- Keep client-side JavaScript out of the placeholder experience unless there is a user-facing need.
- Add or update documentation alongside operational or architectural changes.
- Use conventional commits and small PRs against `main`.

## Protected-File Care

Use extra review care when editing GitHub Actions workflows, environment examples, Cloudflare deployment documentation, secret scanning configuration, or future Terraform/IaC files. These files can affect CI behavior, deployment safety, or secret-handling posture.

For AI-assisted changes, inspect diffs carefully before finalizing edits to `.github/workflows/`, `.env.example`, Cloudflare environment documentation, `.gitleaks` configuration, `.cursorignore`, `.cursorindexingignore`, or future Terraform/IaC files. Keep examples synthetic, avoid real account identifiers, and do not infer or copy values from local `.env` files.

Treat environment validation, canonical URL handling, robots/sitemap generation, deployment workflows, and future IaC as high-risk change areas. Prefer small reversible edits, and make sure deployment-specific values stay in Cloudflare project configuration rather than source code.

## Validation

Run before opening a pull request:

```sh
pnpm install
pnpm validate
```

## Future IaC Notes

TODO(terraform): Add Terraform modules for Cloudflare Pages projects, DNS records, environment variables, and branch deployment controls once the manual pilot is stable.
