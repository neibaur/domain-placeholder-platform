import { z } from "zod";

export const supportedLocales = ["en", "zh-CN", "th"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

const supportedLocaleSchema = z.enum(supportedLocales, {
  error: "Use a supported locale: en, zh-CN, or th.",
});

const secondaryLocaleSchema = z.preprocess(
  (value) => (value === "" ? undefined : value),
  supportedLocaleSchema.default("zh-CN"),
);

const siteNameSchema = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.string().min(1).max(80).optional(),
);

const contactUrlSchema = z.union([z.literal(""), z.url()]).default("");

export const publicConfigSchema = z
  .object({
    PUBLIC_SITE_URL: z.url().transform((value) => value.replace(/\/$/, "")),
    PUBLIC_SITE_TITLE: z.string().min(1).max(120),
    PUBLIC_SITE_NAME: siteNameSchema,
    PUBLIC_SITE_DESCRIPTION: z
      .string()
      .min(1)
      .max(180)
      .default("A lightweight placeholder page for a reserved domain."),
    PUBLIC_PRIMARY_LOCALE: supportedLocaleSchema.default("en"),
    PUBLIC_SECONDARY_LOCALE: secondaryLocaleSchema,
    PUBLIC_CONTACT_URL: z.preprocess(
      (value) => (value === undefined ? "" : value),
      contactUrlSchema,
    ),
    PUBLIC_ROBOTS_INDEX: z.enum(["true", "false"]).default("false"),
  })
  .transform((config) => ({
    ...config,
    // Site name is display metadata; when omitted, keep it aligned with the
    // required identity title rather than failing deployment.
    PUBLIC_SITE_NAME: config.PUBLIC_SITE_NAME ?? config.PUBLIC_SITE_TITLE,
  }));

export type PublicConfig = z.infer<typeof publicConfigSchema>;

export function getPublicConfig(
  env: Record<string, string | undefined>,
): PublicConfig {
  const result = publicConfigSchema.safeParse(env);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    throw new Error(`Invalid PUBLIC_ environment configuration:\n${issues}`);
  }

  return result.data;
}

export function shouldIndex(
  config: Pick<PublicConfig, "PUBLIC_ROBOTS_INDEX">,
): boolean {
  return config.PUBLIC_ROBOTS_INDEX === "true";
}
