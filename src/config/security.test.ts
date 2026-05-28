import { describe, expect, it } from "vitest";
import {
  formatPreferredLanguages,
  formatSecurityTxt,
} from "@/pages/.well-known/security.txt";

describe("security.txt generation", () => {
  it("emits a configured contact URL", () => {
    expect(
      formatSecurityTxt({
        PUBLIC_CONTACT_URL: "mailto:hello@example.com",
        PUBLIC_SECONDARY_LOCALE: "th",
      }),
    ).toBe("Contact: mailto:hello@example.com\nPreferred-Languages: en, th\n");
  });

  it("emits a non-identifying contact comment when contact URL is empty", () => {
    expect(
      formatSecurityTxt({
        PUBLIC_CONTACT_URL: "",
      }),
    ).toBe(
      "# Contact: Use the public communication channel associated with this domain.\nPreferred-Languages: en\n",
    );
  });

  it.each([
    [undefined, "en"],
    ["", "en"],
    ["en", "en"],
    ["th", "en, th"],
    ["zh-CN", "en, zh-CN"],
  ])(
    "formats preferred languages for secondary locale %s",
    (secondaryLocale, expected) => {
      expect(formatPreferredLanguages(secondaryLocale)).toBe(expected);
    },
  );
});
