import { getPublicConfig } from "@/config/public";

const fallbackContactComment =
  "# Contact: Use the public communication channel associated with this domain.";

export function formatPreferredLanguages(
  secondaryLocale: string | undefined,
): string {
  const normalizedSecondaryLocale = secondaryLocale?.trim();

  return normalizedSecondaryLocale && normalizedSecondaryLocale !== "en"
    ? `en, ${normalizedSecondaryLocale}`
    : "en";
}

export function formatSecurityTxt(config: {
  PUBLIC_CONTACT_URL: string;
  PUBLIC_SECONDARY_LOCALE?: string;
}): string {
  const contactLine = config.PUBLIC_CONTACT_URL
    ? `Contact: ${config.PUBLIC_CONTACT_URL}`
    : fallbackContactComment;
  const preferredLanguages = formatPreferredLanguages(
    config.PUBLIC_SECONDARY_LOCALE,
  );

  return `${contactLine}\nPreferred-Languages: ${preferredLanguages}\n`;
}

/* v8 ignore start -- Astro route wrapper is validated by production smoke tests. */
export function GET() {
  const config = getPublicConfig(import.meta.env);

  return new Response(
    formatSecurityTxt({
      PUBLIC_CONTACT_URL: config.PUBLIC_CONTACT_URL,
      PUBLIC_SECONDARY_LOCALE: import.meta.env.PUBLIC_SECONDARY_LOCALE,
    }),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
}
/* v8 ignore stop */
