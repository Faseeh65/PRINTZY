import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve(".output");
const placeholderPattern =
  /\[\s*(?:confirm\b|MOQ\b|X-Y\b|couriers?\b|sample policy\b|export terms\b|city:|year:|founder\b|full facility\b|nominal courier\b|sample fee\b)[^\]\r\n]*\]|\bTODO\s*:|TODO_FACTS|\blorem\b/i;
const scannedFiles = [];

async function scanDirectory(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error?.code === "ENOENT") return;
    throw error;
  }

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await scanDirectory(entryPath);
    } else if (/\.(?:html?|m?js)$/i.test(entry.name)) {
      scannedFiles.push(entryPath);
    }
  }
}

await scanDirectory(outputDir);

if (scannedFiles.length === 0) {
  console.error("Placeholder audit could not find built HTML or JavaScript in .output.");
  process.exitCode = 1;
} else {
  const matches = [];
  for (const file of scannedFiles) {
    const content = await readFile(file, "utf8");
    if (placeholderPattern.test(content)) matches.push(path.relative(process.cwd(), file));
    placeholderPattern.lastIndex = 0;
  }

  if (matches.length > 0) {
    console.error("Build output contains visible placeholder text:");
    for (const file of matches) console.error(`- ${file}`);
    process.exitCode = 1;
  } else {
    console.log(`Placeholder audit passed (${scannedFiles.length} built files scanned).`);
  }
}
