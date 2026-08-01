#!/usr/bin/env node
/**
 * Converts computer-networks DAWRAT/exams.md from the custom bilingual
 * "### Question N" format into SCHEMA parseMCQ markdown so the site can render it.
 *
 * Usage (from repo root):
 *   node subjects/year-3/computer-networks/DAWRAT/fix-exams-to-schema.mjs
 *   node subjects/year-3/computer-networks/DAWRAT/fix-exams-to-schema.mjs --dry-run
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const EXAMS_PATH = path.join(HERE, 'exams.md');
const LECTURES_DIR = path.join(HERE, '../lectures');
const dryRun = process.argv.includes('--dry-run');

const LETTER_AR = { A: 'أ', B: 'ب', C: 'ج', D: 'د' };
const LETTER_EN = { أ: 'A', ب: 'B', ج: 'C', د: 'D', ا: 'A' };

function lectureTitles() {
  const titles = {};
  for (let n = 1; n <= 8; n++) {
    const p = path.join(LECTURES_DIR, `par${n}.md`);
    if (!existsSync(p)) continue;
    const head = readFileSync(p, 'utf8').split('\n')[0] || '';
    const m = head.match(/^#\s+المحاضرة\s+\d+\s*[—–-]\s*(.+)$/);
    titles[n] = m ? m[1].trim() : `المحاضرة ${n}`;
  }
  return titles;
}

function guessDifficulty(stem, explain) {
  const t = `${stem}\n${explain}`;
  if (/CRC|Hamming|Nyquist|Shannon|polynomial|كثير الحدود|حساب|×|÷|= \d|Kbps|Mbps.*Hz|تصادم|throughput/i.test(t)) {
    return 'صعب';
  }
  if (/يُسمّى|تُسمّى|ماذا يعني|تعريف|called:|is called|responsibility of the/i.test(stem)
    && stem.length < 120) {
    return 'سهل';
  }
  return 'متوسط';
}

function parseSourceSections(md) {
  /** @type {{ title: string, start: number, end: number }[]} */
  const sections = [];
  const re = /^## (.+)$/gm;
  let m;
  while ((m = re.exec(md))) {
    sections.push({ title: m[1].trim(), start: m.index, end: md.length });
  }
  for (let i = 0; i < sections.length - 1; i++) sections[i].end = sections[i + 1].start;
  return sections;
}

function sourceForIndex(sections, index) {
  for (const s of sections) {
    if (index >= s.start && index < s.end) return s.title;
  }
  return 'دورات سنوات سابقة';
}

function parseQuestions(md) {
  const sections = parseSourceSections(md);
  const re = /^### Question (\d+)\s*$/gm;
  const starts = [];
  let m;
  while ((m = re.exec(md))) {
    starts.push({ num: Number(m[1]), index: m.index, headingEnd: m.index + m[0].length });
  }

  const questions = [];
  for (let i = 0; i < starts.length; i++) {
    const start = starts[i];
    const end = i + 1 < starts.length ? starts[i + 1].index : md.length;
    const chunk = md.slice(start.headingEnd, end).trim();
    const source = sourceForIndex(sections, start.index);

    const enStemM = chunk.match(/^([\s\S]+?)(?=^[A-D]\.\s)/m);
    const enStem = (enStemM ? enStemM[1] : '').trim().replace(/\n+/g, ' ');

    const enOpts = [...chunk.matchAll(/^[A-D]\.\s+(.+)$/gm)].map((x) => ({
      enKey: x[0][0],
      enText: x[1].trim(),
    }));

    const arBlockM = chunk.match(/#### الترجمة العربية\s*\n+([\s\S]*?)\n+\*\*ترجمة الخيارات:\*\*/);
    const arStem = (arBlockM ? arBlockM[1] : '').trim().replace(/\n+/g, ' ');

    const arOpts = [...chunk.matchAll(/^- \*\*([A-D])\.\*\*\s+(.+)$/gm)].map((x) => ({
      enKey: x[1],
      arText: x[2].trim(),
    }));

    const ansM = chunk.match(/\*\*الإجابة الصحيحة:\s*([A-D])\b/i);
    const correctEn = ansM ? ansM[1].toUpperCase() : '';
    const correctAr = LETTER_AR[correctEn] || '';

    const lecM = chunk.match(/\*\*المحاضرة والصفحة:\*\*\s*(.+)/);
    const lecLine = lecM ? lecM[1].trim() : '';
    const lecNumM = lecLine.match(/المحاضرة\s+(\d+)/);
    const lectureNum = lecNumM ? Number(lecNumM[1]) : null;

    const explainM = chunk.match(/\*\*الشرح:\*\*\s*([\s\S]*?)(?=\n### Question |\n## |\n*$)/);
    let explain = (explainM ? explainM[1] : '').trim();
    // Drop trailing next-question bleed if any; keep note blockquotes that belong to this Q.
    explain = explain.replace(/\n### Question [\s\S]*$/, '').trim();

    const notes = [...chunk.matchAll(/^> \*\*ملاحظة[^*]*\*\*[^\n]*(?:\n> [^\n]*)*/gm)]
      .map((x) => x[0].replace(/^>\s?/gm, '').trim());
    if (notes.length) {
      explain += (explain ? '\n\n' : '') + notes.join('\n\n');
    }
    if (lecLine) {
      explain += (explain ? '\n\n' : '') + `المرجع في الملف الأصلي: ${lecLine}`;
    }

    const enByKey = Object.fromEntries(enOpts.map((o) => [o.enKey, o.enText]));
    const opts = (arOpts.length ? arOpts : enOpts.map((o) => ({
      enKey: o.enKey,
      arText: o.enText,
    }))).map((o) => ({
      key: LETTER_AR[o.enKey] || o.enKey,
      arText: o.arText || '',
      enText: enByKey[o.enKey] || '',
    }));

    const difficulty = guessDifficulty(arStem || enStem, explain);

    questions.push({
      source,
      lectureNum,
      arStem,
      enStem,
      opts,
      correctAr,
      correctEn,
      explain,
      difficulty,
      rawNum: start.num,
    });
  }
  return questions;
}

function renderQuestion(q, seq) {
  const lines = [];
  lines.push(`**المصدر:** [${q.source}]`);
  lines.push(`### السؤال ${seq} (${q.difficulty})`);

  // EN then AR on separate lines (exam is English; Arabic is the translation).
  if (q.enStem) {
    lines.push('**EN**');
    lines.push(q.enStem);
  }
  if (q.arStem) {
    if (q.enStem) lines.push('');
    lines.push('**AR**');
    lines.push(q.arStem);
  }
  if (!q.enStem && !q.arStem) {
    lines.push('TODO: missing stem');
  }

  lines.push('');
  for (const o of q.opts) {
    const ar = o.arText || o.enText || '';
    const en = o.enText || '';
    if (en && ar && en !== ar) {
      lines.push(`${o.key}) ${ar}`);
      lines.push(`EN: ${en}`);
    } else {
      lines.push(`${o.key}) ${ar || en}`);
    }
  }
  lines.push(`**الإجابة الصحيحة: ${q.correctAr || 'TODO'}**`);
  lines.push('**التعليل:**');
  lines.push(q.explain || 'TODO');
  lines.push('');
  return lines.join('\n');
}

function main() {
  const backupPath = path.join(HERE, 'exams.bilingual-source.md');
  const sourcePath = existsSync(backupPath) ? backupPath : EXAMS_PATH;
  if (!existsSync(sourcePath)) {
    console.error(`Not found: ${sourcePath}`);
    process.exit(1);
  }

  const md = readFileSync(sourcePath, 'utf8');
  if (!/^### Question \d+/m.test(md)) {
    console.error(`No bilingual ### Question N blocks in ${path.relative(process.cwd(), sourcePath)}`);
    process.exit(1);
  }
  console.log(`reading ${path.relative(process.cwd(), sourcePath)}`);

  const titles = lectureTitles();
  const questions = parseQuestions(md);
  if (!questions.length) {
    console.error('No ### Question N blocks found.');
    process.exit(1);
  }

  /** @type {Map<number|string, typeof questions>} */
  const byLec = new Map();
  for (const q of questions) {
    const key = (q.lectureNum && q.lectureNum >= 1 && q.lectureNum <= 8)
      ? q.lectureNum
      : 'all';
    if (!byLec.has(key)) byLec.set(key, []);
    byLec.get(key).push(q);
  }

  const out = [];
  out.push('# دورات سنوات سابقة — لغة تخصصية ١ (الشبكات وأمن البيانات)');
  out.push('');
  out.push('> ملف مُحوَّل تلقائياً من الصيغة الثنائية (إنجليزي + ترجمة) إلى صيغة SCHEMA القابلة للعرض على الموقع.');
  out.push('');

  let seq = 1;
  const orderedKeys = [...[...byLec.keys()].filter((k) => k !== 'all').sort((a, b) => a - b), 'all'];

  for (const key of orderedKeys) {
    const list = byLec.get(key);
    if (!list?.length) continue;
    if (key === 'all') {
      out.push('## المحاضرة الكل: أسئلة عامة');
    } else {
      out.push(`## المحاضرة ${key}: ${titles[key] || `المحاضرة ${key}`}`);
    }
    out.push('');
    for (const q of list) {
      out.push(renderQuestion(q, seq++));
    }
  }

  const result = `${out.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`;

  console.log(`parsed ${questions.length} questions → ${seq - 1} rendered`);
  console.log('sections:', orderedKeys.filter((k) => byLec.get(k)?.length).map((k) => {
    if (k === 'all') return `الكل(${byLec.get(k).length})`;
    return `L${k}(${byLec.get(k).length})`;
  }).join(', '));

  const missingAns = questions.filter((q) => !q.correctAr);
  const badOpts = questions.filter((q) => q.opts.length !== 4 && q.opts.length !== 2);
  if (missingAns.length) console.warn(`warn: ${missingAns.length} missing answers`);
  if (badOpts.length) console.warn(`warn: ${badOpts.length} odd option counts → ${badOpts.map((q) => `Q${q.rawNum}:${q.opts.length}`).join(', ')}`);

  if (dryRun) {
    console.log('\n--- preview (first 60 lines) ---');
    console.log(result.split('\n').slice(0, 60).join('\n'));
    return;
  }

  const backup = path.join(HERE, 'exams.bilingual-source.md');
  if (!existsSync(backup)) {
    writeFileSync(backup, md);
    console.log(`backed up original → ${path.relative(process.cwd(), backup)}`);
  }
  writeFileSync(EXAMS_PATH, result);
  console.log(`wrote ${path.relative(process.cwd(), EXAMS_PATH)}`);
}

main();
