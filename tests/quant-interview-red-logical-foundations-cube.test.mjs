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
  'shortest-path-on-cube-surface.md',
);

const expectedMetadata = {
  problemId: 'logic-logical-deduction-013',
  title: 'Shortest Path on a Cube Surface',
  description:
    'Unfold a unit cube to find and prove the shortest surface path between opposite vertices while separating surface, edge, and interior models.',
  date: '2026-09-05',
  domain: 'Mathematics & Statistics',
  category: 'Discrete Mathematics',
  subcategories: ['Geometry', 'Shortest Paths'],
  tags: ['Logical Deduction', 'Geometry', 'Unfolding', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  concepts: [
    'constraint-reframing-and-latent-state',
    'logical-deduction-constraint-propagation-and-case-elimination',
  ],
  techniques: [],
  prerequisites: [],
  relatedProblems: ['clock-hand-angles-and-relative-motion'],
  family: 'surface-unfolding',
  mathDifficulty: 2,
  insightDifficulty: 3,
  interviewDifficulty: 3,
  estimatedMinutes: 15,
  status: 'solved',
  featured: false,
};

const expectedModelRows = [
  ['Surface', 'Cube faces only; crossing edges is allowed', '$\\sqrt{5}$'],
  ['Edges only', 'Cube edges only', '$3$'],
  ['Interior', 'Any point inside the cube', '$\\sqrt{3}$'],
];

const parsePage = (page) => {
  const match = page.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  assert.ok(match, 'page must contain YAML front matter followed by Markdown');
  return { metadata: loadYaml(match[1]), body: match[2] };
};

const section = (body, heading) => {
  const start = body.indexOf(heading);
  assert.ok(start >= 0, `missing ${heading}`);
  const rest = body.slice(start + heading.length);
  const nextHeading = rest.search(/^#{2,3} /m);
  return nextHeading < 0 ? rest : rest.slice(0, nextHeading);
};

const parseModelRows = (body) => {
  const modelSection = section(body, '### Model Separation');
  const lines = modelSection.split(/\r?\n/).filter((line) => /^\|.*\|$/.test(line.trim()));
  assert.ok(lines.length >= 5, 'model table must have a header, divider, and three model rows');
  return lines.slice(2).map((line) =>
    line
      .slice(1, -1)
      .split('|')
      .map((cell) => cell.trim()),
  );
};

const assertGlobalSurfaceProof = (body) => {
  const feasible = section(body, '### Feasible Surface Route');
  assert.match(feasible, /two adjacent faces/i);
  assert.match(feasible, /1(?:-by-|\s+by\s+|\s*\\times\s*)2/i);
  assert.match(feasible, /straight (?:line )?segment/i);
  assert.match(feasible, /fold(?:ing|ed)? back[\s\S]*legal surface path/i);

  const global = section(body, '### Global Surface Minimality');
  assert.match(global, /classif(?:y|ies|ication)[\s\S]*face strips/i);
  assert.match(global, /simple, non-repeating strip/i);
  assert.match(global, /longer wrap|repeated-face/i);
  assert.match(global, /straight-line lower bound/i);
  assert.match(global, /a\^2\+b\^2\s*\\ge\s*5/);
  assert.match(global, /at least\s*\$?\\sqrt\{5\}\$?/i);
};

test('publishes the cube-surface problem with a feasible route and global proof', async () => {
  const page = await readFile(pagePath, 'utf8');
  const { metadata, body } = parsePage(page);
  assert.deepEqual(metadata, expectedMetadata);

  for (const heading of [
    '## Problem',
    '## Think Before Revealing',
    '## Solution',
    '## Why This Problem Matters',
    '## Common Mistakes',
    '## Extensions',
  ]) {
    assert.match(body, new RegExp(`^${heading}$`, 'm'), `missing ${heading}`);
  }

  const disclosure = '<summary>Show Solution</summary>';
  const disclosureIndex = body.indexOf(disclosure);
  assert.ok(disclosureIndex > 0, 'solution disclosure must follow the hints');
  const beforeDisclosure = body.slice(0, disclosureIndex);
  const hintMatches = [...beforeDisclosure.matchAll(/<summary>Hint\b[^<]*<\/summary>/g)];
  assert.deepEqual(
    hintMatches.map((match) => match[0]),
    ['<summary>Hint 1</summary>', '<summary>Hint 2</summary>'],
  );
  assert.doesNotMatch(beforeDisclosure, /sqrt\s*\(?\s*5\s*\)?|\\sqrt\{5\}|2\.236/i);

  assert.deepEqual(parseModelRows(body), expectedModelRows);
  assertGlobalSurfaceProof(body);
});

test('keeps the independently calculated cube distances ordered by model', () => {
  const distances = {
    surface: Math.hypot(1, 2),
    edgesOnly: 3,
    interior: Math.sqrt(3),
  };

  assert.equal(distances.surface, Math.sqrt(5));
  assert.ok(distances.interior < distances.surface && distances.surface < distances.edgesOnly);
  for (const [width, height] of [[1, 2], [2, 1]]) {
    assert.equal(Math.hypot(width, height), Math.sqrt(5));
  }
});
