# Security and Privacy

## Public Configuration Boundary

`PUBLIC_` variables are public by design. Values may appear in HTML, metadata, generated files, or browser-visible assets.

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

## Responsible Disclosure Placeholder

`public/.well-known/security.txt` is a placeholder only. Replace its URLs with intentionally public policy endpoints before production use, or remove it until a public security contact exists.

TODO(security): Decide whether each pilot domain should publish security contact metadata.
