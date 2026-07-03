#!/usr/bin/env node
import {
  parseParFilename,
  defaultSectionBadge,
  syncManifestFiles,
  toArabicDigits,
} from './scaffold-subject.mjs';

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

// parseParFilename
assert(parseParFilename('par1.md')?.num === 1 && parseParFilename('par1.md')?.sec === null, 'par1.md');
assert(parseParFilename('par5-sec2.md')?.num === 5 && parseParFilename('par5-sec2.md')?.sec === 2, 'par5-sec2');
assert(parseParFilename('foo.md') === null, 'reject non-par');

// Arabic section badges
assert(defaultSectionBadge(1, 1) === 'المحاضرة ١ — جزء ١', 'arabic badge');
assert(defaultSectionBadge(1, null) === null, 'no badge for whole lecture');
assert(toArabicDigits(12) === '١٢', 'arabic digits');

// sync new files with icons from manifest + section badges
const manifest = {
  lectureIcons: ['🔒', '⚙️', '📱'],
  lectureMatIcons: ['lock', 'settings', 'android'],
  files: [],
};
syncManifestFiles(manifest, ['par1-sec1.md', 'par1-sec2.md', 'par2.md']);
assert(manifest.files.length === 3, 'three files');
assert(manifest.files[0].path === 'par1-sec1.md' && manifest.files[0].icon === '🔒', 'sec1 icon');
assert(manifest.files[1].path === 'par1-sec2.md' && manifest.files[1].icon === '⚙️', 'sec2 icon');
assert(manifest.files[0].badge === 'المحاضرة ١ — جزء ١', 'sec1 badge');
assert(manifest.files[1].num === 1 && manifest.files[2].num === 2, 'lecture nums');
assert(manifest.files[2].badge === undefined, 'par2 no badge');

// preserve existing entries (no icon overwrite)
manifest.files[0].badge = 'Custom badge';
syncManifestFiles(manifest, ['par1-sec1.md', 'par1-sec2.md', 'par2.md', 'par3.md']);
assert(manifest.files[0].badge === 'Custom badge', 'keep custom badge');
assert(manifest.files.length === 4, 'added par3');
assert(manifest.files[3].icon === '🔒', 'par3 cycles icons (index 3 % 3)');

console.log('scaffold-subject tests: OK');
