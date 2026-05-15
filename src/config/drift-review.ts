import {
  domainInventory,
  type DomainInventory,
  type DomainInventoryEntry,
} from "@/config/domains";

export type DriftReviewRow = {
  domain: string;
  check: string;
  inventoryValue: string;
  valueClassification: "public" | "redacted";
  cloudflareManualLocation: string;
  publicVariable: string | null;
  futureAutomationCandidate: boolean;
  notes: string;
};

export const driftReviewWarning =
  "Manual inventory-derived review only. No Cloudflare API calls, secrets, live settings, or remediation are used.";

function publicValue(
  value: string,
): Pick<DriftReviewRow, "inventoryValue" | "valueClassification"> {
  return {
    inventoryValue: value,
    valueClassification: "public",
  };
}

function redactedValue(): Pick<
  DriftReviewRow,
  "inventoryValue" | "valueClassification"
> {
  return {
    inventoryValue: "[REDACTED]",
    valueClassification: "redacted",
  };
}

function booleanIntent(value: boolean): string {
  return value ? "enabled" : "disabled";
}

function robotsValue(value: boolean): string {
  return value ? "true" : "false";
}

function rowsForDomain(entry: DomainInventoryEntry): DriftReviewRow[] {
  return [
    {
      domain: entry.domain,
      check: "Domain custom mapping",
      ...publicValue(entry.domain),
      cloudflareManualLocation: "Pages > Custom domains and DNS records",
      publicVariable: null,
      futureAutomationCandidate: true,
      notes: "Confirm the domain maps to the expected Pages project.",
    },
    {
      domain: entry.domain,
      check: "Pages project name",
      ...publicValue(entry.pagesProjectName),
      cloudflareManualLocation: "Cloudflare Pages project list",
      publicVariable: null,
      futureAutomationCandidate: true,
      notes: "Project names should follow placeholder-platform-[domain-name].",
    },
    {
      domain: entry.domain,
      check: "Production branch",
      ...publicValue("main"),
      cloudflareManualLocation: "Pages > Settings > Builds & deployments",
      publicVariable: null,
      futureAutomationCandidate: true,
      notes: "The platform convention is production deployments from main.",
    },
    {
      domain: entry.domain,
      check: "Canonical site URL",
      ...publicValue(`https://${entry.domain}`),
      cloudflareManualLocation: "Pages > Settings > Environment variables",
      publicVariable: "PUBLIC_SITE_URL",
      futureAutomationCandidate: true,
      notes: "Controls canonical URLs, Open Graph URLs, and sitemap output.",
    },
    {
      domain: entry.domain,
      check: "Site title",
      ...redactedValue(),
      cloudflareManualLocation: "Pages > Settings > Environment variables",
      publicVariable: "PUBLIC_SITE_TITLE",
      futureAutomationCandidate: true,
      notes:
        "Review manually; values not explicitly classified public are redacted by default.",
    },
    {
      domain: entry.domain,
      check: "Primary locale",
      ...publicValue(entry.primaryLocale),
      cloudflareManualLocation: "Pages > Settings > Environment variables",
      publicVariable: "PUBLIC_PRIMARY_LOCALE",
      futureAutomationCandidate: true,
      notes: "Controls root html lang and primary copy.",
    },
    {
      domain: entry.domain,
      check: "Secondary locale",
      ...publicValue(entry.secondaryLocales.join(", ")),
      cloudflareManualLocation: "Pages > Settings > Environment variables",
      publicVariable: "PUBLIC_SECONDARY_LOCALE",
      futureAutomationCandidate: true,
      notes: "Current runtime accepts one configured secondary locale.",
    },
    {
      domain: entry.domain,
      check: "Robots indexing",
      ...publicValue(robotsValue(entry.robotsIndexingEnabled)),
      cloudflareManualLocation: "Pages > Settings > Environment variables",
      publicVariable: "PUBLIC_ROBOTS_INDEX",
      futureAutomationCandidate: true,
      notes: "Inventory value is intended governance posture, not live parity.",
    },
    {
      domain: entry.domain,
      check: "Contact routing",
      ...publicValue(booleanIntent(entry.contactRoutingEnabled)),
      cloudflareManualLocation: "Email Routing rules and routing status",
      publicVariable: null,
      futureAutomationCandidate: true,
      notes: "Confirm only public-safe routing intent here.",
    },
    {
      domain: entry.domain,
      check: "Terraform authority",
      ...publicValue(entry.terraformAuthority),
      cloudflareManualLocation: "Repository IaC governance docs",
      publicVariable: null,
      futureAutomationCandidate: false,
      notes: "This is governance posture, not a Cloudflare dashboard setting.",
    },
  ];
}

export function getDriftReviewRows(
  inventory: DomainInventory = domainInventory,
): DriftReviewRow[] {
  return inventory.flatMap(rowsForDomain);
}

export function getDriftReviewJson(
  inventory: DomainInventory = domainInventory,
): string {
  return `${JSON.stringify(
    {
      warning: driftReviewWarning,
      rows: getDriftReviewRows(inventory),
    },
    null,
    2,
  )}\n`;
}

export function getDriftReviewMarkdown(
  inventory: DomainInventory = domainInventory,
): string {
  const rows = getDriftReviewRows(inventory);
  const lines = [
    `> ${driftReviewWarning}`,
    "",
    "| Domain | Check | Inventory Value | Classification | Cloudflare Manual Location | PUBLIC_ Variable | Future Automation Candidate | Notes |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...rows.map(
      (row) =>
        `| ${[
          row.domain,
          row.check,
          row.inventoryValue,
          row.valueClassification,
          row.cloudflareManualLocation,
          row.publicVariable ?? "N/A",
          row.futureAutomationCandidate ? "Yes" : "No",
          row.notes,
        ].join(" | ")} |`,
    ),
  ];

  return `${lines.join("\n")}\n`;
}
