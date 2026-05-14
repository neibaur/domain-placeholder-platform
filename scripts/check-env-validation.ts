import { spawnSync } from "node:child_process";
import { getPublicConfig } from "../src/config/public";
import { smokeEnv } from "./shared/site-env.mjs";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

const positiveConfig = getPublicConfig({
  ...smokeEnv,
  PUBLIC_ROBOTS_INDEX: undefined,
});

assert(
  positiveConfig.PUBLIC_ROBOTS_INDEX === "false",
  "PUBLIC_ROBOTS_INDEX should default to false.",
);
assert(
  positiveConfig.PUBLIC_SITE_URL === "https://example.com",
  "PUBLIC_SITE_URL should normalize cleanly.",
);

try {
  getPublicConfig({
    ...smokeEnv,
    PUBLIC_SITE_TITLE: undefined,
  });
  throw new Error("Missing PUBLIC_SITE_TITLE should fail validation.");
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  assert(
    message.includes("Invalid PUBLIC_ environment configuration"),
    "Missing variable error should name config failure.",
  );
  assert(
    message.includes("PUBLIC_SITE_TITLE"),
    "Missing variable error should identify PUBLIC_SITE_TITLE.",
  );
}

try {
  getPublicConfig({
    ...smokeEnv,
    PUBLIC_SITE_URL: "not-a-url",
  });
  throw new Error("Malformed PUBLIC_SITE_URL should fail validation.");
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  assert(
    message.includes("PUBLIC_SITE_URL"),
    "Malformed URL error should identify PUBLIC_SITE_URL.",
  );
}

const buildCheck = spawnSync("pnpm build", {
  env: {
    ...process.env,
    ...smokeEnv,
    PUBLIC_SITE_TITLE: "",
  },
  shell: true,
  encoding: "utf8",
});

const buildOutput = `${buildCheck.stdout}\n${buildCheck.stderr}`;
assert(
  buildCheck.status !== 0,
  "Build should fail when a required PUBLIC_ value is missing.",
);
assert(
  buildOutput.includes("Invalid PUBLIC_ environment configuration") &&
    buildOutput.includes("PUBLIC_SITE_TITLE"),
  "Build failure should include an actionable PUBLIC_SITE_TITLE validation error.",
);

console.log("Environment validation checks passed.");
