import { access } from "node:fs/promises";
import pa11y from "pa11y";
import { startStaticServer } from "./shared/static-server.mjs";

const browserCandidates =
  process.platform === "win32"
    ? [
        process.env.PA11Y_CHROME_PATH,
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
        "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
      ]
    : [
        process.env.PA11Y_CHROME_PATH,
        "/usr/bin/google-chrome",
        "/usr/bin/google-chrome-stable",
        "/usr/bin/chromium",
        "/usr/bin/chromium-browser",
      ];

async function findBrowser() {
  for (const candidate of browserCandidates.filter(Boolean)) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Keep looking for a browser pa11y can drive.
    }
  }

  throw new Error(
    "Unable to find Chrome, Chromium, or Edge for pa11y. Set PA11Y_CHROME_PATH to a browser executable.",
  );
}

const browserPath = await findBrowser();
const server = await startStaticServer("dist");

try {
  const result = await pa11y(server.origin, {
    chromeLaunchConfig: {
      executablePath: browserPath,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
    runners: ["htmlcs"],
    standard: "WCAG2AA",
    timeout: 30000,
  });

  if (result.issues.length > 0) {
    for (const issue of result.issues) {
      console.error(`${issue.type}: ${issue.code}`);
      console.error(issue.message);
      console.error(issue.selector);
    }

    throw new Error(
      `pa11y found ${result.issues.length} accessibility issue(s).`,
    );
  }

  console.log("Accessibility check passed.");
} finally {
  await server.close();
}
