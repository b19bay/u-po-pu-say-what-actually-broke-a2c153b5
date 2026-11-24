import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Login failed: your session expired while you were typing your password. Sign in again. Type faster.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");

const readBack = readFileSync(target, "utf8");
if (readBack !== LINE) {
  throw new Error("read-back mismatch: entry.txt differs from the line");
}
if (readBack.length < 1 || readBack.length > 200) {
  throw new Error(`entry length ${readBack.length} is outside 1-200 characters`);
}
if (readBack.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (readBack.includes("\n") || readBack.includes("\r")) {
  throw new Error("entry must be a single line");
}
