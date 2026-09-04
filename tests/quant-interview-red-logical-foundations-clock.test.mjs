import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { load as loadYaml } from 'js-yaml';

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const pagePath = path.join(
  testDirectory,
  '..',
  'src',
  'content',
  'problems',
  'logic',
  'clock-hand-angles-and-relative-motion.md',
);

const expectedMetadata = {
  problemId: 'logic-logical-deduction-012',
  title: 'Clock Hand Angles and Relative Motion',
  description:
    'Compute clock-hand separations with continuous angular motion and locate neighboring coincidence times by relative speed.',
  date: '2026-09-05',
  domain: 'Mathematics & Statistics',
  category: 'Discrete Mathematics',
  subcategories: ['Relative Motion', 'Modular Angles'],
  tags: ['Logical Deduction', 'Clocks', 'Relative Motion', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  concepts: [
    'logical-deduction-constraint-propagation-and-case-elimination',
    'small-cases-recurrence-and-structural-simplification',
  ],
  techniques: [],
  prerequisites: [],
  relatedProblems: ['shortest-path-on-cube-surface'],
  family: 'clock-relative-motion',
  mathDifficulty: 1,
  insightDifficulty: 3,
  interviewDifficulty: 3,
  estimatedMinutes: 12,
  status: 'solved',
  featured: false,
};

const parsePage = (page) => {
  const match = page.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  assert.ok(match, 'page must contain YAML front matter followed by Markdown');
  return { metadata: loadYaml(match[1]), body: match[2] };
};

test('publishes the clock relative-motion problem with solved-page guidance', async () => {
  const page = await readFile(pagePath, 'utf8');
  const { metadata, body } = parsePage(page);
  assert.deepEqual(metadata, expectedMetadata);

  for (const section of [
    '## Problem',
    '## Think Before Revealing',
    '## Solution',
    '## Why This Problem Matters',
    '## Common Mistakes',
    '## Extensions',
  ]) {
    assert.match(body, new RegExp(`^${section}$`, 'm'), `missing ${section}`);
  }

  const disclosure = '<summary>Show Solution</summary>';
  const disclosureIndex = body.indexOf(disclosure);
  assert.ok(disclosureIndex > 0, 'solution disclosure must follow the hints');
  const beforeDisclosure = body.slice(0, disclosureIndex);
  const hintMatches = [...beforeDisclosure.matchAll(/<summary>Hint\b[^<]*<\/summary>/g)];
  assert.equal(hintMatches.length, 2, 'there must be exactly two hints before disclosure');
  assert.deepEqual(
    hintMatches.map((match) => match[0]),
    ['<summary>Hint 1</summary>', '<summary>Hint 2</summary>'],
  );
  for (const answer of ['7.5', '37.5', '1440/11', '2160/11']) {
    assert.equal(
      beforeDisclosure.includes(answer),
      false,
      `answer ${answer} must not appear before the solution disclosure`,
    );
  }
  const afterDisclosure = body.slice(disclosureIndex);
  assert.match(afterDisclosure, /At 3:15,[\s\S]*?\*\*7\.5 degrees\*\*/);
  assert.match(afterDisclosure, /At 4:15,[\s\S]*?\*\*37\.5 degrees\*\*/);

  const minuteFormula = body.match(
    /The minute hand advances[\s\S]*?so its angle from 12 is\s*\$\$\s*([^$]+?)\s*\$\$/,
  );
  assert.equal(minuteFormula?.[1].trim(), '6m.');
  const hourFormula = body.match(
    /The hour hand advances[\s\S]*?so its angle is\s*\$\$\s*([^$]+?)\s*\$\$/,
  );
  assert.equal(hourFormula?.[1].trim(), '30h+0.5m.');
  assert.match(
    body,
    /min\s*\(\s*(?:delta|\\delta|Δ)\s*,\s*360\s*-\s*(?:delta|\\delta|Δ)\s*\)/i,
    'smaller-angle normalization must compare the separation with its wraparound',
  );
  assert.match(body, /5\.5\s*(?:degrees?|°)\s*(?:per|\/)\s*minute/i);
  assert.match(body, /1440\s*\/\s*11\s*(?:minutes?)?\s+after\s+12:00/i);
  assert.match(body, /2160\s*\/\s*11\s*(?:minutes?)?\s+after\s+12:00/i);
});

test('keeps the independently calculated clock checks true', () => {
  const angle = (hour, minute) => {
    const raw = Math.abs(6 * minute - (30 * (hour % 12) + 0.5 * minute)) % 360;
    return Math.min(raw, 360 - raw);
  };

  assert.equal(angle(3, 15), 7.5);
  assert.equal(angle(4, 15), 37.5);
  assert.equal(angle(11, 59), 5.5);
  assert.equal(720 * 2 / 11 < 195, true);
  assert.equal(720 * 3 / 11 > 195, true);
});
