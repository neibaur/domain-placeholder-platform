import { z } from "zod";
import { supportedLocales } from "@/config/public";

export const operationalStatuses = [
  "active",
  "maintenance",
  "retired",
  "planned",
] as const;

export const terraformAuthorityStages = [
  "stage-0-validation-only",
  "stage-1-import-planned",
  "stage-2-imported-readonly",
  "stage-3-authoritative",
] as const;

const domainSchema = z
  .string()
  .regex(
    /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/,
    "Use a lower-case public domain name.",
  );

const supportedLocaleSchema = z.enum(supportedLocales);

export function getExpectedPagesProjectName(domain: string): string {
  return `placeholder-platform-${domain.replaceAll(".", "-")}`;
}

export const domainInventoryEntrySchema = z
  .object({
    domain: domainSchema,
    pagesProjectName: z.string().min(1),
    primaryLocale: supportedLocaleSchema,
    secondaryLocales: z.array(supportedLocaleSchema),
    robotsIndexingEnabled: z.boolean(),
    contactRoutingEnabled: z.boolean(),
    terraformAuthority: z.enum(terraformAuthorityStages),
    operationalStatus: z.enum(operationalStatuses),
    notes: z.string().min(1).max(240),
  })
  .superRefine((entry, context) => {
    const expectedProjectName = getExpectedPagesProjectName(entry.domain);

    if (entry.pagesProjectName !== expectedProjectName) {
      context.addIssue({
        code: "custom",
        path: ["pagesProjectName"],
        message: `Expected ${expectedProjectName}.`,
      });
    }

    if (entry.secondaryLocales.includes(entry.primaryLocale)) {
      context.addIssue({
        code: "custom",
        path: ["secondaryLocales"],
        message: "Secondary locales must not include the primary locale.",
      });
    }

    if (
      new Set(entry.secondaryLocales).size !== entry.secondaryLocales.length
    ) {
      context.addIssue({
        code: "custom",
        path: ["secondaryLocales"],
        message: "Secondary locales must not contain duplicates.",
      });
    }
  });

export const domainInventorySchema = z
  .array(domainInventoryEntrySchema)
  .nonempty()
  .superRefine((entries, context) => {
    const seenDomains = new Set<string>();

    entries.forEach((entry, index) => {
      if (seenDomains.has(entry.domain)) {
        context.addIssue({
          code: "custom",
          path: [index, "domain"],
          message: `Duplicate domain: ${entry.domain}.`,
        });
      }

      seenDomains.add(entry.domain);
    });
  });

export type OperationalStatus = (typeof operationalStatuses)[number];
export type TerraformAuthorityStage = (typeof terraformAuthorityStages)[number];
export type DomainInventoryEntry = z.infer<typeof domainInventoryEntrySchema>;
export type DomainInventory = z.infer<typeof domainInventorySchema>;

export function validateDomainInventory(inventory: unknown): DomainInventory {
  return domainInventorySchema.parse(inventory);
}

export const domainInventory = validateDomainInventory([
  {
    domain: "68tai.com",
    pagesProjectName: "placeholder-platform-68tai-com",
    primaryLocale: "en",
    secondaryLocales: ["zh-CN", "th"],
    robotsIndexingEnabled: false,
    contactRoutingEnabled: false,
    terraformAuthority: "stage-0-validation-only",
    operationalStatus: "active",
    notes:
      "Initial platform domain; verify live Cloudflare settings before promotion.",
  },
  {
    domain: "6gou8.com",
    pagesProjectName: "placeholder-platform-6gou8-com",
    primaryLocale: "en",
    secondaryLocales: ["zh-CN", "th"],
    robotsIndexingEnabled: false,
    contactRoutingEnabled: false,
    terraformAuthority: "stage-0-validation-only",
    operationalStatus: "active",
    notes:
      "Initial platform domain; verify live Cloudflare settings before promotion.",
  },
  {
    domain: "6xi8.com",
    pagesProjectName: "placeholder-platform-6xi8-com",
    primaryLocale: "en",
    secondaryLocales: ["zh-CN", "th"],
    robotsIndexingEnabled: false,
    contactRoutingEnabled: false,
    terraformAuthority: "stage-0-validation-only",
    operationalStatus: "active",
    notes:
      "Initial platform domain; verify live Cloudflare settings before promotion.",
  },
]);
