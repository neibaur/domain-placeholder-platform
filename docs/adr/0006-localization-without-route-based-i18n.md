# ADR 0006: Localization Without Route-Based i18n

## Status

Accepted

## Context

Phase 6 introduced a small typed localization contract for a static placeholder
page. At acceptance, the supported locales were English (`en`) and Simplified
Chinese (`zh-CN`). The platform needs multilingual readiness without adding
routing, browser language detection, user preference storage, or an external
i18n framework before those needs are proven.

Thai was identified as a future locale expansion candidate and intentionally
deferred from Phase 6D, which was architecture governance only.

## Decision

The platform supports multilingual rendering without route-based i18n. The root
`<html lang>` follows `PUBLIC_PRIMARY_LOCALE`, secondary content uses
locale-specific `lang` attributes, and unsupported locale values fail during
environment validation.

Language switching, locale-prefixed routes, browser language detection,
persisted language preferences, and per-locale sitemap entries are deferred.

## Consequences

- Localization remains static-first and easy to validate.
- English, Simplified Chinese, and future locale additions can render without
  duplicated route structures.
- Accessibility benefits from explicit root and content-level language metadata.
- SEO behavior remains tied to the existing canonical URL and sitemap model.
- Future localization features require deliberate design rather than implicit
  route expansion.

## Alternatives Considered

- Route-based i18n: deferred until localized URLs, locale-specific sitemap
  entries, or search behavior by locale become necessary.
- Browser language detection: deferred because static placeholder pages should
  remain deterministic and deployment-driven.
- External i18n framework: deferred because the current content surface is small
  enough for typed TypeScript content.
- Thai in Phase 6D: deferred because this phase is architecture governance only.

## Future Reconsideration Triggers

- A domain needs distinct URLs for each locale.
- SEO requirements call for per-locale sitemap entries or `hreflang` metadata.
- Content volume grows beyond the current typed mapping.
- User-controlled language switching becomes a real requirement.

## Phase 6E Implementation Note

Phase 6E adds Thai support using the `th` locale tag, Thai placeholder copy,
UTF-8 validation, `lang` metadata checks, focused tests, and the existing shared
multilingual layout. This update does not change the original decision to defer
route-based i18n, language switching, browser language detection, persisted
preferences, and per-locale sitemap entries.
