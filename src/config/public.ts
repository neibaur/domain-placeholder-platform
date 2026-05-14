import { z } from "zod";

const languageCodeSchema = z
  .string()
  .regex(
    /^[a-z]{2}(-[A-Z]{2})?$/,
    "Use a BCP 47 language code such as en or zh-CN.",
  );

const optionalUrlSchema = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.string().url().optional(),
);

const optionalLanguageCodeSchema = z.preprocess(
  (value) => (value === "" ? undefined : value),
  languageCodeSchema.optional(),
);

export const publicConfigSchema = z.object({
  PUBLIC_SITE_URL: z
    .string()
    .url()
    .transform((value) => value.replace(/\/$/, "")),
  PUBLIC_SITE_NAME: z.string().min(1).max(80),
  PUBLIC_SITE_TITLE: z.string().min(1).max(120),
  PUBLIC_SITE_DESCRIPTION: z.string().min(1).max(180),
  PUBLIC_PRIMARY_LOCALE: languageCodeSchema,
  PUBLIC_SECONDARY_LOCALE: optionalLanguageCodeSchema,
  PUBLIC_CONTACT_URL: optionalUrlSchema,
  PUBLIC_ROBOTS_INDEX: z.enum(["true", "false"]).default("false"),
});

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
