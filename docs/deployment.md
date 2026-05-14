# Deployment

## Cloudflare Pages

Create one Cloudflare Pages project per deployed domain when isolated configuration, branch controls, or future operational ownership boundaries are useful.

Recommended build settings:

- Framework preset: `Astro`
- Build command: `pnpm build`
- Build output directory: `dist`
- Node.js version: `22`
- Package manager: `pnpm`

## Environment Variables

Set these in each Cloudflare Pages project:

```text
PUBLIC_SITE_URL=https://68tai.com
PUBLIC_SITE_NAME=Domain Placeholder
PUBLIC_SITE_TITLE=Domain Placeholder
PUBLIC_SITE_DESCRIPTION=A lightweight placeholder page for a reserved domain.
PUBLIC_PRIMARY_LOCALE=en
PUBLIC_SECONDARY_LOCALE=zh-CN
PUBLIC_ROBOTS_INDEX=false
```

Repeat with the appropriate `PUBLIC_SITE_URL` for `6gou8.com` and `6xi8.com`.

## Privacy Notes

Avoid storing registrant names, contact emails, account IDs, or private business context in repository files. Public contact URLs may be configured only when intentionally published.

## Future Terraform Integration

TODO(terraform): Manage Cloudflare Pages projects, custom domains, DNS records, and environment variables through reviewed infrastructure code.
