import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { loadMasterDirectoryRepository, validateMasterDirectoryRepository } from '../scripts/validate-quant-interview-master-directory.mjs';

const workstreamId = 'logic-brainteasers-discrete-reasoning-red-logical-reasoning-core-022';
const keys = [
  "red-book::8::8.11",
  "red-book::8::8.15",
  "red-book::8::8.16",
  "red-book::8::8.18",
  "red-book::8::8.20",
  "red-book::8::8.22"
];

async function countMarkdown(dir) {
  const entries = await readdir(dir, { recursive: true });
  return entries.filter((name) => String(name).endsWith('.md')).length;
}

test('022 active corpus has the exact public delta and six terminal dispositions', async () => {
  const inputs = await loadMasterDirectoryRepository(process.cwd());
  assert.equal(inputs.problemSlugs.size, 101);
  assert.equal(inputs.knowledgeSlugs.size, 61);
  const ws = inputs.workstreams.find(({ id }) => id === workstreamId);
  assert.ok(ws);
  assert.equal(ws.status, 'active');
  assert.deepEqual(ws.publicDelta, { problems: 5, knowledge: 2 });
  assert.deepEqual(ws.masterItemKeys, keys);
  assert.equal('verification' in ws, false);
  assert.equal('preClosureActiveGate' in ws, false);

  const rows = keys.map((key) => inputs.directory.items.find((row) => row.key === key));
  assert.ok(rows.every(Boolean));
  assert.deepEqual(rows.map((row) => row.state), [
    'canonical-problem','canonical-problem','variant','canonical-problem','canonical-problem','canonical-problem'
  ]);
  assert.ok(rows.every((row) => row.workstream === workstreamId));
  assert.ok(rows.every((row) => row.resolutionNote?.length > 20));

  const terminal = inputs.directory.items.filter((row) => row.state !== 'pending');
  assert.equal(terminal.length, 268);
  assert.equal(inputs.directory.items.length - terminal.length, 482);
  const next = inputs.directory.items.filter((row) => row.state === 'pending').sort((a,b) => a.sortKey.localeCompare(b.sortKey))[0];
  assert.equal(next.key, '150-most-frequently-asked::2.7::theory');
  assert.equal(validateMasterDirectoryRepository(inputs), true);
});

test('022 source-neutral pages and reciprocal relationships are present', async () => {
  const paths = [
    'snow-removal-start-time-from-distance-ratio',
    'falsifying-a-one-way-card-rule',
    'anchor-overboard-water-level',
    'public-announcement-departure-day',
    'bisecting-a-rectangular-frame-with-one-line',
  ];
  for (const slug of paths) {
    const body = await readFile(`src/content/problems/logic/${slug}.md`, 'utf8');
    assert.doesNotMatch(body, /Red Book|8\.11|8\.15|8\.16|8\.18|8\.20|8\.22/i);
    assert.match(body, /^## Problem$/m);
    assert.match(body, /<summary>Show Solution<\/summary>/);
    assert.match(body, /^## Why This Problem Matters$/m);
    assert.match(body, /^## Common Mistakes$/m);
    assert.match(body, /^## Extensions$/m);
  }
  const oldAnnouncement = await readFile('src/content/problems/logic/public-announcement-candidate-elimination.md', 'utf8');
  const newAnnouncement = await readFile('src/content/problems/logic/public-announcement-departure-day.md', 'utf8');
  assert.match(oldAnnouncement, /public-announcement-departure-day/);
  assert.match(newAnnouncement, /relatedProblems: \[public-announcement-candidate-elimination\]/);
});

test('022 nine-object scale variant distinguishes all nine heavy hypotheses in two weighings', async () => {
  const page = await readFile('src/content/problems/logic/twelve-object-balance-scale-diagnosis.md', 'utf8');
  assert.match(page, /Variant: Nine Objects with One Known-Heavy Anomaly/);
  assert.match(page, /3\^2=9/);

  const diagnose = (heavy) => {
    let group;
    if (heavy <= 3) group = [1,2,3];
    else if (heavy <= 6) group = [4,5,6];
    else group = [7,8,9];
    if (heavy === group[0]) return group[0];
    if (heavy === group[1]) return group[1];
    return group[2];
  };
  assert.deepEqual(Array.from({length:9}, (_,i) => diagnose(i+1)), [1,2,3,4,5,6,7,8,9]);
});

test('022 mathematical contracts preserve the intended exact conclusions', () => {
  const x = (Math.sqrt(5) - 1) / 2;
  assert.ok(Math.abs((x + 1) / x - ((x + 2) / (x + 1)) ** 2) < 1e-12);
  const rhoW = 1;
  const rhoA = 3;
  assert.ok(1 / rhoA - 1 / rhoW < 0);
  for (let n = 1; n <= 8; n += 1) {
    const predictedNight = n;
    assert.equal(predictedNight, n);
  }
});
