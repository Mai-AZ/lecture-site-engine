#!/usr/bin/env node
import { createParser } from '../index.js';

const md = `## بطاقات سؤال وجواب

**Q1:** ما الفرق بين \`database\` و\`DBMS\`؟
A: البيانات مقابل البرنامج المدير.

---

**Q2:** سؤال ثانٍ؟
**A:** إجابة بصيغة bold قديمة — يجب أن تُقرأ أيضاً.
`;

const { parseBlocks } = createParser();
const blocks = parseBlocks(md);
const cards = blocks.filter(b => b.type === 'qa-card');

if (cards.length !== 2) throw new Error(`expected 2 qa cards, got ${cards.length}`);
if (cards[0].question.includes('**')) throw new Error('question should not keep stray **');
if (!cards[0].answer.includes('البيانات')) throw new Error('plain A: not parsed');
if (!cards[1].answer.includes('bold')) throw new Error('**A:** not parsed');

console.log('qa-card parser test: OK');
