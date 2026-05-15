import { describe, expect, it } from "vitest";
import { domainInventory } from "@/config/domains";
import {
  driftReviewWarning,
  getDriftReviewJson,
  getDriftReviewMarkdown,
  getDriftReviewRows,
} from "@/config/drift-review";

describe("drift review preparation", () => {
  it("generates complete manual review rows for each domain", () => {
    const rows = getDriftReviewRows();
    const expectedChecks = [
      "Domain custom mapping",
      "Pages project name",
      "Production branch",
      "Canonical site URL",
      "Site title",
      "Primary locale",
      "Secondary locale",
      "Robots indexing",
      "Contact routing",
      "Terraform authority",
    ];

    for (const entry of domainInventory) {
      const domainRows = rows.filter((row) => row.domain === entry.domain);

      expect(domainRows.map((row) => row.check)).toEqual(expectedChecks);
      expect(domainRows).toContainEqual(
        expect.objectContaining({
          publicVariable: "PUBLIC_SITE_URL",
          inventoryValue: `https://${entry.domain}`,
          valueClassification: "public",
        }),
      );
      expect(domainRows).toContainEqual(
        expect.objectContaining({
          publicVariable: "PUBLIC_ROBOTS_INDEX",
          inventoryValue: "false",
          valueClassification: "public",
        }),
      );
      expect(domainRows).toContainEqual(
        expect.objectContaining({
          publicVariable: "PUBLIC_SITE_TITLE",
          inventoryValue: "[REDACTED]",
          valueClassification: "redacted",
        }),
      );
    }
  });

  it("marks Terraform authority as governance-only", () => {
    const rows = getDriftReviewRows();
    const terraformRows = rows.filter(
      (row) => row.check === "Terraform authority",
    );

    expect(terraformRows).toHaveLength(domainInventory.length);
    expect(
      terraformRows.every((row) => row.futureAutomationCandidate === false),
    ).toBe(true);
    expect(terraformRows.every((row) => row.publicVariable === null)).toBe(
      true,
    );
  });

  it("renders deterministic markdown and JSON without live Cloudflare values", () => {
    const markdown = getDriftReviewMarkdown();
    const json = getDriftReviewJson();
    const parsedJson = JSON.parse(json);

    expect(markdown).toContain(driftReviewWarning);
    expect(markdown).toContain("| Domain | Check | Inventory Value |");
    expect(markdown).toContain("Classification");
    expect(markdown).toContain("| 68tai.com | Domain custom mapping |");
    expect(markdown).toContain("[REDACTED]");
    expect(markdown).toContain("Cloudflare Manual Location");
    expect(markdown).not.toContain("account_id");
    expect(markdown).not.toContain("api_token");

    expect(parsedJson).toEqual({
      warning: driftReviewWarning,
      rows: getDriftReviewRows(),
    });
  });
});
