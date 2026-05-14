import { spawn } from "node:child_process";
import { startStaticServer } from "./shared/static-server.mjs";
import { smokeEnv, withSmokeEnv } from "./shared/site-env.mjs";

function run(command, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, {
      env: withSmokeEnv(options.env),
      shell: true,
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} exited with code ${code}`));
    });
  });
}

function assertIncludes(value, expected, label) {
  if (!value.includes(expected)) {
    throw new Error(`${label} did not include expected value: ${expected}`);
  }
}

async function getText(origin, path) {
  const response = await fetch(`${origin}${path}`);

  if (!response.ok) {
    throw new Error(`${path} returned HTTP ${response.status}`);
  }

  return response.text();
}

await run("pnpm build");

const server = await startStaticServer("dist");

try {
  const html = await getText(server.origin, "/");
  const robots = await getText(server.origin, "/robots.txt");
  const sitemap = await getText(server.origin, "/sitemap-index.xml");

  assertIncludes(html, smokeEnv.PUBLIC_SITE_TITLE, "Rendered HTML");
  assertIncludes(html, smokeEnv.PUBLIC_SITE_DESCRIPTION, "Rendered HTML");
  assertIncludes(
    html,
    "A lightweight domain placeholder is being prepared.",
    "Rendered HTML",
  );
  assertIncludes(html, "轻量域名占位页正在准备中。", "Rendered HTML");
  assertIncludes(html, 'class="locale-card" lang="en"', "Rendered HTML");
  assertIncludes(html, 'class="locale-card" lang="zh-CN"', "Rendered HTML");
  assertIncludes(html, 'lang="en"', "Rendered HTML");
  assertIncludes(html, 'lang="zh-CN"', "Rendered HTML");
  assertIncludes(html, "example.com", "Rendered HTML");
  assertIncludes(
    html,
    '<link rel="canonical" href="https://example.com/">',
    "Canonical metadata",
  );
  assertIncludes(
    html,
    '<meta name="robots" content="noindex,nofollow">',
    "Robots metadata",
  );
  assertIncludes(robots, "Disallow: /", "robots.txt");
  assertIncludes(
    robots,
    "Sitemap: https://example.com/sitemap-index.xml",
    "robots.txt",
  );
  assertIncludes(sitemap, "https://example.com/sitemap-0.xml", "sitemap index");

  console.log("Production smoke test passed.");
} finally {
  await server.close();
}
