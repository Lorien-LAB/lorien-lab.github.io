import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { access } from 'node:fs/promises';
import {
  loadMasterDirectoryRepository,
  validateMasterDirectoryRepository,
} from '../scripts/validate-quant-interview-master-directory.mjs';

function firstMissingSource(directory) {
  return ['green-book', 'red-book', '150-most-frequently-asked']
    .find((source) => !directory.nodes.some((node) => node.source === source)
      || !directory.items.some((item) => item.source === source));
}

test('repository loader preserves 76/50 and reports the next enumeration gap', async () => {
  await access('src/data/quant-interview/master-directory.json');
  const inputs = await loadMasterDirectoryRepository(process.cwd());
  assert.equal(inputs.problemSlugs.size, 76);
  assert.equal(inputs.knowledgeSlugs.size, 50);
  const missingSource = firstMissingSource(inputs.directory);
  if (missingSource) {
    assert.throws(
      () => validateMasterDirectoryRepository(inputs),
      new RegExp(`master directory is missing ${missingSource} enumeration`, 'i'),
    );
  } else {
    assert.equal(validateMasterDirectoryRepository(inputs), true);
  }
});

test('master directory check CLI follows repository enumeration state', async () => {
  const inputs = await loadMasterDirectoryRepository(process.cwd());
  const missingSource = firstMissingSource(inputs.directory);
  const result = spawnSync(
    process.execPath,
    ['scripts/validate-quant-interview-master-directory.mjs', '--check'],
    { encoding: 'utf8' },
  );
  if (missingSource) {
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, new RegExp(`master directory is missing ${missingSource} enumeration`, 'i'));
  } else {
    assert.equal(result.status, 0, result.stderr);
  }
});

test('repository loader exposes the canonical three-source topic map', async () => {
  const { sourceTopicMap } = await loadMasterDirectoryRepository(process.cwd());
  assert.equal(sourceTopicMap.version, 1);
  assert.equal(sourceTopicMap.entries.filter(({ source }) => source === 'green-book').length, 190);
});

test('Green Book is completely represented in physical and canonical order', async () => {
  const { directory, tocs, sourceTopicMap } = await loadMasterDirectoryRepository(process.cwd());
  const greenNodes = directory.nodes.filter((node) => node.source === 'green-book');
  const greenItems = directory.items.filter((item) => item.source === 'green-book');
  assert.ok(greenNodes.length > 0);
  assert.ok(greenItems.length > 0);
  assert.equal(greenItems[0].key, 'green-book::1.1::guidance');
  assert.deepEqual(greenItems[0].questionPages, [{ startPage: 17, endPage: 17 }]);
  assert.equal(new Set(greenItems.map(({ key }) => key)).size, greenItems.length);
  const greenContentSections = sourceTopicMap.entries
    .filter(({ source, role }) => source === 'green-book' && role === 'content')
    .map(({ sourceSection }) => sourceSection);
  assert.equal(greenItems.length, 181);
  assert.deepEqual(
    new Set(greenItems.map(({ sourceSection }) => sourceSection)),
    new Set(greenContentSections),
  );

  const tocIds = new Set();
  const visit = (sections = []) => sections.forEach((section) => {
    tocIds.add(section.id);
    visit(section.children);
  });
  visit(tocs['green-book'].sections);
  for (const id of tocIds) {
    assert.equal(
      greenNodes.some((node) => node.sourceSection === id)
        || greenItems.some((item) => item.sourceSection === id),
      true,
      `missing Green TOC section ${id}`,
    );
  }
  for (const item of greenItems) {
    assert.ok(item.questionPages.length > 0, item.key);
    assert.equal(item.solutionPages.length, 0, item.key);
  }
});
