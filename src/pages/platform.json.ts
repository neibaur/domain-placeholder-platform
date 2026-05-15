import { createPlatformMetadata } from "@/config/platform";

/* v8 ignore start -- Astro route wrapper is validated by production smoke tests. */
export function GET() {
  return new Response(JSON.stringify(createPlatformMetadata(), null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
/* v8 ignore stop */
