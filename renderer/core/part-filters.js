/** Matches guide-config checklist part headings — hidden from student HTML only. */
const CHECKLIST_TITLE_RE = /Checklist|قائمة فحص|قائمة المراجعة/i;

/** @param {{ title?: string }} part */
export function isChecklistPart(part) {
  return CHECKLIST_TITLE_RE.test(part.title || '');
}
