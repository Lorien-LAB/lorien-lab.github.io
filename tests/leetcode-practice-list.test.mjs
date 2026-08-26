import test from 'node:test';
import assert from 'node:assert/strict';
import { leetcodeProblems } from '../src/data/leetcodeProblems.ts';

const minimum25 = [1, 3, 15, 20, 33, 49, 53, 56, 121, 128, 139, 198, 200, 207, 209, 215, 238, 239, 283, 322, 347, 560, 704, 739, 973];
const quant15 = [76, 152, 309, 380, 384, 416, 480, 528, 643, 714, 721, 901, 912, 981, 986];

test('LeetCode syllabus contains the exact 55-problem track split', () => {
  assert.equal(leetcodeProblems.length, 55);
  assert.equal(new Set(leetcodeProblems.map(({ number }) => number)).size, 55);
  assert.equal(leetcodeProblems.filter(({ track }) => track === 'core').length, 40);
  assert.equal(leetcodeProblems.filter(({ track }) => track === 'quant').length, 15);
  assert.deepEqual(leetcodeProblems.filter(({ minimum25: value }) => value).map(({ number }) => number).sort((a, b) => a - b), minimum25);
  assert.deepEqual(leetcodeProblems.filter(({ track }) => track === 'quant').map(({ number }) => number).sort((a, b) => a - b), quant15);
});

test('every syllabus item has complete original metadata and an official URL', () => {
  for (const problem of leetcodeProblems) {
    assert.match(problem.slug, /^[a-z0-9-]+$/);
    assert.match(problem.url, new RegExp(`^https://leetcode\\.com/problems/${problem.slug}/$`));
    assert.ok(['Easy', 'Medium', 'Hard'].includes(problem.difficulty));
    assert.ok(problem.pattern.trim().length > 0);
    assert.ok(problem.quantApplication.trim().length > 0);
    assert.ok(Number.isInteger(problem.week) && problem.week >= 1 && problem.week <= 5);
  }
});
