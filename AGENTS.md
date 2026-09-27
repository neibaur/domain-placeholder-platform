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

## Agent Operations Rails

These rails apply to every AI agent working in this repository and match the
`neibaur-labs/agent-ops` contract. Where another section of this file is
stricter, the stricter rule wins.

- **Commits, not merges.** Agents may commit and push their own work to feature
  branches. Agents never push to `main`, and never merge, approve, or close pull
  requests.
- **Protected paths: agents edit, the maintainer commits.** Agents may edit
  agent-instruction files (`AGENTS.md`, `CLAUDE.md`, and similar), `.github/**`,
  `LICENSE`, and skill directories, but the maintainer commits and pushes those
  changes. The agent keeps them out of its own commits, hands off the exact
  `git add`, `git commit`, and `git push` commands, waits for the maintainer's
  commit, then continues the task.
- **Dependencies.** Agents may add, upgrade, or remove dependencies when a task
  needs it. They make and verify the change, then wait for the maintainer's
  explicit authorization or hand off the commit. Keep dependency changes in
  their own commit, and list each one in the PR description with an exact
  version verified against a current source.
- **Pull request size.** One concern per pull request, or two when they are
  tightly coupled. There is no line cap; the ceiling is 20,000 changed lines,
  excluding lockfiles and generated files.
- **Secrets.** Agents never read, print, or commit secret-bearing files.
- **Labels.** Label agent-assisted pull requests `ai-assisted` and include
  `Co-authored-by` trailers.
