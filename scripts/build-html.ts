import { readFileSync, writeFileSync } from "fs";
import { createHash } from "crypto";
import { dirname } from "path";
// import { argv } from "process";
// const filename = argv[argv.length - 1];

const filename = "dist/index.html";
const directory = dirname(filename);
let html = readFileSync(filename).toString();
for (const match of html.match(/(href|src)="(.*?)"/g) ?? []) {
  const regexp = /"(.*)"/;
  const filename = match.match(regexp)![1];
  try {
    const content = readFileSync(`${directory}/${filename}`).toString();
    const hex = createHash("sha256").update(content).digest("hex");
    const value = match.replace(regexp, `"${filename}?${hex.substring(0, 8)}"`);
    html = html.replace(match, value);
  } catch (_) {}
}
writeFileSync(filename, html);
