import {
  getDriftReviewJson,
  getDriftReviewMarkdown,
} from "../src/config/drift-review";

const format = process.argv.includes("--json") ? "json" : "markdown";

process.stdout.write(
  format === "json" ? getDriftReviewJson() : getDriftReviewMarkdown(),
);
