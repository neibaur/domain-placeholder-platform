# domain-placeholder-platform

Reusable, governance-first placeholder platform for multiple domains using Astro, TypeScript, Cloudflare Pages, and GitHub Actions.

Initial pilot domains:

- `68tai.com`
- `6gou8.com`
- `6xi8.com`

Domain-specific values are intentionally not hardcoded. Each Cloudflare Pages project should provide `PUBLIC_` environment variables at build time.

## Local Development

```sh
pnpm install
cp .env.example .env
pnpm dev
```

Local development reads `PUBLIC_` values from `.env`. Keep this file private and use [.env.example](.env.example) as the documented contract.

## Validation

```sh
pnpm validate
```

This is the main local confidence command. It runs:

- Prettier formatting checks
- ESLint
- markdownlint
- Zod environment validation checks
- Astro type checking and production build
- production smoke tests against generated `dist/` output
- automated accessibility checks against the served production output

Useful focused commands:

```sh
pnpm check:env
pnpm smoke
pnpm check:a11y
pnpm build
```

## Accessibility Validation

`pnpm check:a11y` runs pa11y against the built site served locally from `dist/`. It checks practical WCAG 2.2 AA issues including landmark usage, heading structure, semantic HTML concerns, image alternative text when images exist, and detectable color contrast issues.

Automated checks are useful but incomplete. They cannot fully prove usability with screen readers, keyboard-only workflows, cognitive accessibility, translation quality, or whether visible content is contextually clear. Manual review should remain part of any production launch.

If pa11y cannot locate a browser locally, set:

```sh
PA11Y_CHROME_PATH="C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
```

## Smoke Testing

`pnpm smoke` builds the project, serves `dist/` locally, and verifies:

- expected placeholder text renders
- the configured site URL appears in rendered output
- canonical metadata is present
- `PUBLIC_ROBOTS_INDEX=false` produces non-indexing metadata and `robots.txt`
- sitemap output references the configured canonical site URL

Run `pnpm build` before `pnpm check:a11y` when using the accessibility command by itself.

## Environment Variables

See [.env.example](.env.example) for the public build-time variables expected by the platform.

Required:

- `PUBLIC_SITE_URL`
- `PUBLIC_SITE_NAME`
- `PUBLIC_SITE_TITLE`
- `PUBLIC_SITE_DESCRIPTION`
- `PUBLIC_PRIMARY_LOCALE`

Optional:

- `PUBLIC_SECONDARY_LOCALE`
- `PUBLIC_CONTACT_URL`
- `PUBLIC_ROBOTS_INDEX` defaults to `false` and must be explicitly set to `true` to allow indexing.

## Project Structure

```text
src/
  components/       Reusable Astro components
  config/           Zod-validated public configuration
  content/          Locale-ready copy modules
  layouts/          Document and metadata shell
  pages/            Static routes
  styles/           Shared CSS
docs/               Governance and operating documentation
```

## Recommended First Commit

```sh
git add .
git commit -m "chore: initialize governance-first Astro platform"
```
