// Your AI Therapist's Diagnosis — make.fun entry.
//
// Writes the chosen one-line diagnosis to /output/entry.txt with no
// trailing newline. The line is a fixed string: the writing is the entry.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Diagnosis: severe overthinking, complicated by Googling your symptoms at 3 a.m. Prognosis: guarded \u2014 you're asking a chatbot for therapy.";

// Guard: the gate requires UTF-8 text of 1-200 characters, not only
// whitespace, on a single line.
const codePoints = [...LINE];
if (codePoints.length < 1 || codePoints.length > 200) {
  throw new Error(`entry is ${codePoints.length} characters, must be 1-200`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back what was written and confirm it is exactly the validated
// line, so a partial write or an unexpected /output state fails loudly
// instead of silently entering a wrong text.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: /output/entry.txt differs from LINE");
}
