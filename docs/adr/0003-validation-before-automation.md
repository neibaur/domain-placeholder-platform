# ADR 0003: Validation Before Automation

## Status

Accepted

## Context

The platform is governance-first and intentionally avoids operational automation
that is not yet backed by repeatable validation. The repository already has
formatting, linting, build, environment, smoke, accessibility, security,
testing, coverage visibility, and Terraform validation checks.

Automation should not outpace operational understanding. A task should be easy
to validate manually and in CI before it becomes automated infrastructure or
deployment authority.

## Decision

Validation-before-automation is a core operating principle. The current
validation model includes:

- `pnpm validate` as the primary confidence command.
- `pnpm build:local` for local `.env` backed builds.
- `pnpm check:env` for Zod environment validation checks.
- `pnpm smoke` for production-output smoke validation.
- `pnpm check:a11y` for pa11y accessibility validation.
- `pnpm test` for focused Vitest tests.
- `pnpm test:coverage` for visible but non-gating coverage reporting.
- Gitleaks for secret scanning.
- CodeQL for security analysis.
- Dependabot for dependency update visibility.
- pa11y for automated accessibility checks.
- Vitest for deterministic TypeScript tests.
- Terraform validation workflow for formatting, backend-free initialization, and
  validation only.

Coverage is intentionally visible but non-gating. No coverage percentage
threshold is enforced yet.

## Consequences

- Contributors can run the same confidence checks locally and in CI.
- Missing environment variables, malformed locale values, and metadata issues
  fail before deployment.
- Accessibility and security checks remain part of normal development rather
  than late-stage review.
- Automation is added only after validation signals are clear and maintainable.
- Some future work may remain manual longer than a fully automated platform, by
  design.

## Alternatives Considered

- Automation-first deployment or infrastructure workflows: rejected for the
  current maturity level because they could create authority before the project
  has enough operational evidence.
- Hard coverage thresholds immediately after adding Vitest: deferred because the
  codebase is small and meaningful tests matter more than early percentages.
- Manual-only validation: rejected because it would make multi-domain
  governance inconsistent and harder to review.

## Future Reconsideration Triggers

- Validation scripts become too slow or unreliable for routine PR review.
- New runtime logic makes non-gating coverage insufficient.
- Deployment or infrastructure changes become frequent enough to justify
  additional plan-only or automated checks.
- A future phase introduces Terraform authority, deployment automation, or
  route-based localization that needs stronger validation gates.
