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

test('Red Book questions and solutions are completely paired', async () => {
  const { directory, tocs } = await loadMasterDirectoryRepository(process.cwd());
  const redNodes = directory.nodes.filter((node) => node.source === 'red-book');
  const redItems = directory.items.filter((item) => item.source === 'red-book');
  assert.ok(redNodes.length > 0);
  assert.ok(redItems.length > 0);
  assert.equal(new Set(redItems.map(({ key }) => key)).size, redItems.length);
  const questionItems = redItems.filter((item) => item.kind === 'question');
  assert.equal(redItems.length, 318);
  assert.equal(questionItems.length, 272);
  for (const item of questionItems) {
    assert.ok(item.questionPages.length > 0, `${item.key} question pages`);
    assert.ok(
      item.questionPages[0].endPage - item.questionPages[0].startPage <= 3,
      `${item.key} question evidence must not cross into another chapter`,
    );
    if (item.sourceSection === '9.3') {
      assert.equal(item.solutionPages.length, 0, `${item.key} intentionally has no source solution`);
    } else {
      assert.ok(item.solutionPages.length > 0, `${item.key} solution pages`);
    }
  }
  assert.equal(questionItems.filter(({ sourceSection }) => sourceSection === '10.2').length, 10);
  const chapterCounts = {};
  for (const item of questionItems.filter(({ sourceSection }) => sourceSection !== '10.2')) {
    const chapter = item.sourceItem.split('.')[0];
    chapterCounts[chapter] = (chapterCounts[chapter] ?? 0) + 1;
  }
  assert.deepEqual(chapterCounts, {
    2: 60,
    3: 54,
    4: 7,
    5: 20,
    6: 26,
    7: 35,
    8: 26,
    9: 34,
  });

  const tocIds = new Set();
  const visit = (sections = []) => sections.forEach((section) => {
    tocIds.add(section.id);
    visit(section.children);
  });
  visit(tocs['red-book'].sections);
  for (const id of tocIds) {
    assert.equal(
      redNodes.some((node) => node.sourceSection === id)
        || redItems.some((item) => item.sourceSection === id),
      true,
      `missing Red TOC section ${id}`,
    );
  }
});

test('150 Questions has complete numbered question and solution pairs', async () => {
  const { directory, sourceManifests } = await loadMasterDirectoryRepository(process.cwd());
  const items = directory.items.filter((item) => item.source === '150-most-frequently-asked');
  assert.ok(items.length > 0);
  assert.equal(sourceManifests['150-most-frequently-asked'].sourceFileMeta.arabicPageOffset, 10);
  assert.equal(new Set(items.map(({ key }) => key)).size, items.length);

  const questions = items.filter((item) => item.kind === 'question');
  assert.equal(items.length, 175);
  assert.equal(questions.length, 160);
  for (const item of questions) {
    assert.match(item.sourceItem ?? '', /^\d+(?:\.\d+)*$/);
    assert.ok(item.questionPages.length > 0, `${item.key} question pages`);
    assert.ok(item.solutionPages.length > 0, `${item.key} solution pages`);
    assert.ok(
      item.questionPages[0].endPage - item.questionPages[0].startPage <= 3,
      `${item.key} question evidence must remain inside its source section`,
    );
  }
  assert.equal(items.some((item) => item.key === '150-most-frequently-asked::1::1'), true);
  assert.equal(items.some((item) => item.key === '150-most-frequently-asked::2.7::1'), true);
  const sectionCounts = {};
  for (const item of questions) {
    sectionCounts[item.sourceSection] = (sectionCounts[item.sourceSection] ?? 0) + 1;
  }
  assert.deepEqual(sectionCounts, {
    1: 10,
    '2.1': 15,
    '2.2': 10,
    '2.3': 23,
    '2.4': 32,
    '2.5': 9,
    '2.6': 29,
    '2.7': 32,
  });
  assert.equal(questions.filter(({ sourceSection }) => sourceSection !== '1').length, 150);
});
