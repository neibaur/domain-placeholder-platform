export const smokeEnv = {
  PUBLIC_SITE_URL: "https://example.com",
  PUBLIC_SITE_NAME: "Domain Placeholder",
  PUBLIC_SITE_TITLE: "Domain Placeholder",
  PUBLIC_SITE_DESCRIPTION:
    "A lightweight placeholder page for a reserved domain.",
  PUBLIC_PRIMARY_LOCALE: "en",
  PUBLIC_SECONDARY_LOCALE: "zh-CN",
  PUBLIC_ROBOTS_INDEX: "false",
};

export function withSmokeEnv(overrides = {}) {
  return {
    ...process.env,
    ...smokeEnv,
    ...overrides,
  };
}
