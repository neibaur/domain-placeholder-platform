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

## Validation

Run before opening a pull request:

```sh
pnpm install
pnpm validate
```

## Future IaC Notes

TODO(terraform): Add Terraform modules for Cloudflare Pages projects, DNS records, environment variables, and branch deployment controls once the manual pilot is stable.
