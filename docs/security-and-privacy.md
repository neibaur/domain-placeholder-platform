# Security and Privacy

## Public Configuration Boundary

`PUBLIC_` variables are public by design. Values may appear in HTML, metadata, generated files, or browser-visible assets.

The platform should minimize unnecessary exposure of operational metadata. Keep private ownership, account, deployment, and contact details out of source control unless they are intentionally public and reviewed.

Do not store these values in `PUBLIC_` variables:

- API tokens
- Cloudflare account IDs
- private contact details
- registrant details
- billing information
- operational escalation contacts that are not intended to be public

## Secret Scanning Readiness

Recommended GitHub settings:

- Enable secret scanning.
- Enable push protection.
- Enable Dependabot alerts.
- Enable Dependabot security updates.
- Review CodeQL alerts before merging security-sensitive changes.

## Editor and AI Tool Hygiene

Ignore files such as `.cursorignore` reduce accidental indexing of local-only files by supporting tools, but they are best-effort hygiene only. They are not a security boundary and do not replace GitHub secret scanning, push protection, code review, or careful local handling of credentials.

Generated output, dependency folders, local env files, logs, and credential-like local files should stay out of commits and out of tool indexing where practical.

## Responsible Disclosure Placeholder

`public/.well-known/security.txt` is a placeholder only. Replace its URLs with intentionally public policy endpoints before production use, or remove it until a public security contact exists.

TODO(security): Decide whether each pilot domain should publish security contact metadata.
