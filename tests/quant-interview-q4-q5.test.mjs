import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const manifestPath = 'src/data/quant-interview/150-most-frequently-asked.json';
const q4Path = 'src/content/problems/150-most-frequently-asked/ants-crossing-line.md';
const q5Path = 'src/content/problems/150-most-frequently-asked/correlation-matrix-parameter-range.md';

test('second bounded batch registers First Look Questions 4-5 only', async () => {
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  const batch = manifest.batches.find((item) => item.id === '150-first-look-q04-q05');
  assert.deepEqual(batch, {
    id: '150-first-look-q04-q05',
    startPage: 7,
    endPage: 9,
    sourceSection: '1 First Look: Ten Questions',
    expectedProblemScope: ['4', '5'],
    status: 'active',
  });
});

test('Questions 4-5 are independently authored as S3-plus problem records', async () => {
  for (const file of [q4Path, q5Path]) {
    await access(file);
    const text = await readFile(file, 'utf8');
    assert.match(text, /^originType:\s*book$/m);
    assert.match(text, /^source:\s*150-most-frequently-asked$/m);
    assert.match(text, /^status:\s*solved$/m);
    for (const marker of ['## Problem', '## Think Before Revealing', '<summary>Hint 1</summary>', '<summary>Show Solution</summary>', '## Solution', '## Why This Problem Matters', '## Common Mistakes', '## Extensions']) {
      assert.ok(text.includes(marker), `${file} missing ${marker}`);
    }
  }
});

test('Question 4 teaches identity swapping / crossing invariance rather than simulating collisions', async () => {
  const text = await readFile(q4Path, 'utf8');
  assert.match(text, /swap identities|exchange labels|pass through/i);
  assert.match(text, /1000/);
});

test('Question 5 maps correlation validity to positive semidefiniteness and checks the admissible rho interval', async () => {
  const text = await readFile(q5Path, 'utf8');
  assert.match(text, /positive semidefinite/i);
  assert.match(text, /0\.9432/);
  assert.match(text, /0\.5832/);
});
