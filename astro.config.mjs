import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { z } from "zod";

const configSchema = z.object({
  PUBLIC_SITE_URL: z
    .string()
    .url()
    .transform((value) => value.replace(/\/$/, "")),
});

const result = configSchema.safeParse(process.env);

if (!result.success) {
  const issues = result.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("\n");

  throw new Error(`Invalid public site configuration:\n${issues}`);
}

// Site is resolved at build time so the same source can be deployed to
// separate Cloudflare Pages projects with domain-specific PUBLIC_ values.
export default defineConfig({
  site: result.data.PUBLIC_SITE_URL,
  integrations: [sitemap()],
  output: "static",
});
