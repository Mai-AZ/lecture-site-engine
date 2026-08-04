/** Stable URL/DOM fragment from Arabic+Latin heading text. */
export function slugify(text) {
  return String(text).replace(/[^\w\u0600-\u06FF]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
}

/**
 * Past-exam banks sometimes repeat the same lecture as "## … (تابع)" when more
 * questions are appended later. Collapse those to one TOC/page section.
 */
export function normalizeMcqSection(section) {
  if (!section) return '';
  return String(section)
    .replace(/\s*\(تابع(?:\s+\d+)?\)\s*$/u, '')
    .trim();
}

/** TOC / heading id suffix for an MCQ "## المحاضرة N: …" section divider. */
export function mcqSectionAnchor(section) {
  return `sec-${slugify(normalizeMcqSection(section) || section)}`;
}

/** Normalize a "**المصدر:**" / نمط tag for use in ids and sort keys. */
export function normalizeMcqPattern(source) {
  return String(source || '')
    .replace(/^\[|\]$/g, '')
    .replace(/^المصدر:\s*/u, '')
    .trim();
}

/** Short slug of the exam pattern (e.g. نمط 2022-2023 — الفصل الثاني). */
export function mcqPatternSlug(source) {
  const label = normalizeMcqPattern(source);
  return label ? slugify(label).slice(0, 48) : '';
}

/**
 * DOM id for an MCQ card. Identity is pattern (نمط / year sitting) + question
 * number, plus the lecture section when present so deep-links stay unique.
 */
export function mcqCardDomId(partId, qOrNum, subNum) {
  const num = typeof qOrNum === 'object' && qOrNum != null ? qOrNum.num : qOrNum;
  const section =
    typeof qOrNum === 'object' && qOrNum != null
      ? normalizeMcqSection(qOrNum.section)
      : '';
  const source =
    typeof qOrNum === 'object' && qOrNum != null
      ? qOrNum.source
      : '';
  const sec = section ? `${mcqSectionAnchor(section)}-` : '';
  const pat = mcqPatternSlug(source);
  const patPart = pat ? `pat-${pat}-` : '';
  const base = `${partId}-${sec}${patPart}q${num}`;
  return subNum != null && subNum !== '' ? `${base}-${subNum}` : base;
}
