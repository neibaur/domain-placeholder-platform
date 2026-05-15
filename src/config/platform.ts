import { z } from "zod";
import { supportedLocales } from "@/config/public";

const deploymentModel = "cloudflare-pages-git-integration";
const terraformAuthority = "validation-only-non-authoritative";
const contactStrategy = "email-routing-preferred";

export const platformMetadataSchema = z.object({
  platformName: z.string().min(1),
  purpose: z.string().min(1),
  supportedLocales: z.array(z.enum(supportedLocales)).nonempty(),
  architecture: z.object({
    staticFirst: z.literal(true),
    clientSideJavaScriptRequired: z.literal(false),
  }),
  deployment: z.object({
    model: z.literal(deploymentModel),
    hostingTarget: z.literal("cloudflare-pages"),
  }),
  terraform: z.object({
    authority: z.literal(terraformAuthority),
    canApplyChanges: z.literal(false),
  }),
  contact: z.object({
    strategy: z.literal(contactStrategy),
  }),
  generatedAt: z.iso.datetime(),
});

export type PlatformMetadata = z.infer<typeof platformMetadataSchema>;

export function createPlatformMetadata(
  generatedAt = new Date().toISOString(),
): PlatformMetadata {
  return platformMetadataSchema.parse({
    platformName: "Domain Placeholder Platform",
    purpose: "Reusable static placeholder pages for a small domain portfolio.",
    supportedLocales,
    architecture: {
      staticFirst: true,
      clientSideJavaScriptRequired: false,
    },
    deployment: {
      model: deploymentModel,
      hostingTarget: "cloudflare-pages",
    },
    terraform: {
      authority: terraformAuthority,
      canApplyChanges: false,
    },
    contact: {
      strategy: contactStrategy,
    },
    generatedAt,
  });
}
