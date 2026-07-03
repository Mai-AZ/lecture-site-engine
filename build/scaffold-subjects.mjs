#!/usr/bin/env node
/**
 * Scaffold missing subject files (lectures/, manifest.json, guide-config.js).
 *
 * Usage:
 *   node build/scaffold-subjects.mjs --all
 *   node build/scaffold-subjects.mjs --subject year-4/os-2-theory
 */
import { scaffoldSubjects } from './lib/scaffold-subject.mjs';

function parseArgs(argv) {
  const args = { all: false, subjects: [] };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--all') args.all = true;
    else if (argv[i] === '--subject' && argv[i + 1]) {
      args.subjects.push(argv[++i].replace(/^subjects\//, ''));
    } else if (!argv[i].startsWith('-')) {
      args.subjects.push(argv[i].replace(/^subjects\//, ''));
    }
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv);
  const targets = args.all || !args.subjects.length ? undefined : args.subjects;
  const results = await scaffoldSubjects(targets);

  if (!results.length) {
    console.log('✓ All subjects already scaffolded.');
    return;
  }

  for (const { subject, actions } of results) {
    console.log(`\n${subject}:`);
    for (const a of actions) console.log(`  + ${a}`);
  }
  console.log(`\n✓ Scaffolded ${results.length} subject(s).`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
