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

## Validation

```sh
pnpm validate
```

This runs formatting checks, ESLint, markdownlint, Astro type checking, and a production build.

## Environment Variables

See [.env.example](.env.example) for the public build-time variables expected by the platform.

Required:

- `PUBLIC_SITE_URL`
- `PUBLIC_SITE_NAME`
- `PUBLIC_SITE_TITLE`
- `PUBLIC_SITE_DESCRIPTION`
- `PUBLIC_PRIMARY_LOCALE`
- `PUBLIC_ROBOTS_INDEX`

Optional:

- `PUBLIC_SECONDARY_LOCALE`
- `PUBLIC_CONTACT_URL`

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
