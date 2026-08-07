#!/usr/bin/env node
/**
 * Verifies a subject's DAWRAT/exams.md parses correctly with the repo's
 * real parseMCQ before you ship it — a malformed line silently corrupts
 * parsing for everything after it in that chunk with no error message.
 *
 * Usage: node scripts/verify-dawrat.mjs <year-N>/<subject-id>
 */
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, '../../../..');

const subject = process.argv[2];
if (!subject) {
  console.error('Usage: node scripts/verify-dawrat.mjs <year-N>/<subject-id>');
  process.exit(1);
}

const examsPath = path.join(REPO_ROOT, 'subjects', subject, 'DAWRAT/exams.md');
if (!existsSync(examsPath)) {
  console.error(`Not found: ${examsPath}`);
  process.exit(1);
}

const { parseMCQ } = await import(path.join(REPO_ROOT, 'parser/parts/handlers.js'));

const md = readFileSync(examsPath, 'utf8');
const arabicKey = { أ: 'a', ا: 'a', ب: 'b', ج: 'c', د: 'd', ه: 'e', a: 'a', b: 'b', c: 'c', d: 'd', e: 'e' };
const parsed = parseMCQ(md, { arabicKey });

// Flatten Case-2 groups so every individually-answerable question is checked.
const questions = parsed.flatMap(q => (q.type === 'group' ? q.questions : [q]));

const missingCorrect = questions.filter(q => !q.correct);
const missingExplain = questions.filter(q => !q.explain);
const unknownNum = questions.filter(q => q.num === '?');
// 2 = True/False, 4 = standard MCQ, 5 = MCQ with هـ — flag anything else.
const badOptionCount = questions.filter(q => ![2, 4, 5].includes(q.options.length));
const nums = questions.map(q => q.num);
const dupNums = [...new Set(nums.filter((n, i) => nums.indexOf(n) !== i))];

const sections = [];
for (const q of questions) {
  if (q.section && sections[sections.length - 1] !== q.section) sections.push(q.section);
}

console.log(`total questions: ${questions.length}`);
console.log(`sections (in order): ${JSON.stringify(sections, null, 2)}`);
console.log(`missing correct answer: ${missingCorrect.length}${missingCorrect.length ? ' → nums ' + missingCorrect.map(q => q.num).join(', ') : ''}`);
console.log(`missing التعليل: ${missingExplain.length}${missingExplain.length ? ' → nums ' + missingExplain.map(q => q.num).join(', ') : ''}`);
console.log(`heading missing (difficulty) → num came back '?': ${unknownNum.length}`);
console.log(`suspicious option count (not 2, 4, or 5): ${badOptionCount.length}${badOptionCount.length ? ' → ' + badOptionCount.map(q => `${q.num}:${q.options.length}`).join(', ') : ''}`);
console.log(`duplicate question numbers: ${dupNums.length ? dupNums.join(', ') : 'none'}`);

const ok = !missingCorrect.length && !missingExplain.length && !unknownNum.length && !badOptionCount.length && !dupNums.length;
console.log(ok ? '\n✓ looks good' : '\n✗ fix the issues above before building');
process.exit(ok ? 0 : 1);
