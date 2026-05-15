import { spawnSync } from "node:child_process";
import { getPublicConfig } from "../src/config/public";
import { smokeEnv } from "./shared/site-env.mjs";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

const positiveConfig = getPublicConfig({
  PUBLIC_SITE_URL: smokeEnv.PUBLIC_SITE_URL,
  PUBLIC_SITE_TITLE: smokeEnv.PUBLIC_SITE_TITLE,
});

assert(
  positiveConfig.PUBLIC_ROBOTS_INDEX === "false",
  "PUBLIC_ROBOTS_INDEX should default to false.",
);
assert(
  positiveConfig.PUBLIC_SITE_NAME === smokeEnv.PUBLIC_SITE_TITLE,
  "PUBLIC_SITE_NAME should default to PUBLIC_SITE_TITLE.",
);
assert(
  positiveConfig.PUBLIC_PRIMARY_LOCALE === "en",
  "PUBLIC_PRIMARY_LOCALE should default to en.",
);
assert(
  positiveConfig.PUBLIC_SECONDARY_LOCALE === "zh-CN",
  "PUBLIC_SECONDARY_LOCALE should default to zh-CN.",
);
assert(
  positiveConfig.PUBLIC_SITE_URL === "https://example.com",
  "PUBLIC_SITE_URL should normalize cleanly.",
);

try {
  getPublicConfig({
    ...smokeEnv,
    PUBLIC_SITE_URL: undefined,
  });
  throw new Error("Missing PUBLIC_SITE_URL should fail validation.");
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  assert(
    message.includes("Invalid PUBLIC_ environment configuration"),
    "Missing site URL error should name config failure.",
  );
  assert(
    message.includes("PUBLIC_SITE_URL"),
    "Missing site URL error should identify PUBLIC_SITE_URL.",
  );
}

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

try {
  getPublicConfig({
    ...smokeEnv,
    PUBLIC_PRIMARY_LOCALE: "fr",
  });
  throw new Error("Unsupported PUBLIC_PRIMARY_LOCALE should fail validation.");
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  assert(
    message.includes("PUBLIC_PRIMARY_LOCALE"),
    "Unsupported primary locale error should identify PUBLIC_PRIMARY_LOCALE.",
  );
  assert(
    message.includes("en, zh-CN, or th"),
    "Unsupported primary locale error should identify supported locales.",
  );
}

try {
  getPublicConfig({
    ...smokeEnv,
    PUBLIC_SECONDARY_LOCALE: "fr",
  });
  throw new Error(
    "Unsupported PUBLIC_SECONDARY_LOCALE should fail validation.",
  );
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  assert(
    message.includes("PUBLIC_SECONDARY_LOCALE"),
    "Unsupported secondary locale error should identify PUBLIC_SECONDARY_LOCALE.",
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
