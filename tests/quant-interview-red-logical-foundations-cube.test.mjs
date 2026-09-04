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

const expectedSimpleStripBounds = [
  ['2 faces', '$x=0 \\to y=1$', '$(1,2)$ or $(2,1)$', '$\\sqrt{5}$'],
  [
    '3 faces, terminal repeats first axis',
    '$x=0 \\to y=0 \\to x=1$',
    '$(1,2)$ or $(2,1)$',
    '$\\sqrt{5}$',
  ],
  [
    '3 faces, all axes distinct',
    '$x=0 \\to y=0 \\to z=1$',
    '$(1,2)$ or $(2,1)$',
    '$\\sqrt{5}$',
  ],
  [
    '4 faces, terminal repeats first axis',
    '$x=0 \\to y=0 \\to z=0 \\to x=1$',
    '$(1,2)$ or $(2,1)$',
    '$\\sqrt{5}$',
  ],
  [
    '4 faces, terminal repeats second axis',
    '$x=0 \\to y=0 \\to z=0 \\to y=1$',
    '$(1,2)$ or $(2,1)$',
    '$\\sqrt{5}$',
  ],
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

const parseTableRows = (text) => {
  const lines = text.split(/\r?\n/).filter((line) => /^\|.*\|$/.test(line.trim()));
  assert.ok(lines.length >= 5, 'table must have a header, divider, and three data rows');
  return lines.slice(2).map((line) =>
    line
      .slice(1, -1)
      .split('|')
      .map((cell) => cell.trim()),
  );
};

const parseModelRows = (body) => parseTableRows(section(body, '### Model Separation'));

const assertReducedSimpleStripProof = (global) => {
  const reductionHeading = '#### 1. Reduce Repeated Faces';
  const enumerationHeading = '#### 2. Enumerate Simple Face Strips';
  const reductionIndex = global.indexOf(reductionHeading);
  const enumerationIndex = global.indexOf(enumerationHeading);
  assert.ok(
    reductionIndex >= 0,
    'global proof must reduce repeated faces before enumerating developed strips',
  );
  assert.ok(
    enumerationIndex > reductionIndex,
    'repeated-face reduction must precede the finite simple-strip bound',
  );

  const reduction = global.slice(reductionIndex, enumerationIndex);
  assert.match(reduction, /same square face[\s\S]*convex/i);
  assert.match(reduction, /first[\s\S]*last visit[\s\S]*(?:chord|straight segment)/i);
  assert.match(reduction, /no longer/i);

  const enumeration = global.slice(enumerationIndex);
  assert.match(enumeration, /first face incident to \$B\$/i);
  assert.match(enumeration, /only three faces incident to \$A\$/i);
  const simpleStripRows = parseTableRows(enumeration);
  assert.deepEqual(simpleStripRows, expectedSimpleStripBounds);
  assert.doesNotMatch(
    global,
    /every developed image of \$B\$/i,
    'the proof must not extend the simple-strip label bound to repeated-face developments',
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
  assert.match(global, /at least\s*\$?\\sqrt\{5\}\$?/i);
  assertReducedSimpleStripProof(global);
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

test('rejects the prior universal development argument before repeated faces are reduced', () => {
  const priorFalseProof = `
All developed faces lie on the unit square lattice. Put A at (0,0) and a developed copy of B at (a,b).
Following the cube labels across each reflected square shows that every developed image of $B$ satisfies
$a^2+b^2\\ge 5$.
The face-strip classification then assigns repeated-face strips the same lower bound.
`;

  assert.throws(
    () => assertReducedSimpleStripProof(priorFalseProof),
    /reduce repeated faces before enumerating developed strips/,
  );
});
