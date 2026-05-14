export const smokeEnv: {
  PUBLIC_SITE_URL: string;
  PUBLIC_SITE_NAME: string;
  PUBLIC_SITE_TITLE: string;
  PUBLIC_SITE_DESCRIPTION: string;
  PUBLIC_PRIMARY_LOCALE: string;
  PUBLIC_SECONDARY_LOCALE: string;
  PUBLIC_ROBOTS_INDEX: string;
};

export function withSmokeEnv(
  overrides?: Record<string, string | undefined>,
): Record<string, string | undefined>;
