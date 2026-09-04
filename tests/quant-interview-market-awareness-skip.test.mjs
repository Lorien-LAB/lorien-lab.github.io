import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { TERMINAL_STATES } from '../src/lib/quantInterviewMasterDirectory.mjs';
import {
  loadMasterDirectoryRepository,
  validateMasterDirectoryRepository,
} from '../scripts/validate-quant-interview-master-directory.mjs';

const auditMarker = 'excluded from the durable public technical question bank';
const expectedNotes = new Map([
  ['red-book::9::guidance', 'Red Book chapter 9 is a mixed soft-interview and current-finance container; it is excluded from the durable public technical question bank and has no independent public target.'],
  ['red-book::9.3::guidance', 'Red Book 9.3 is a collection of time-sensitive market-awareness prompts; it is excluded from the durable public technical question bank by explicit user direction.'],
  ['red-book::9.3::9.23', 'The current equity-benchmark level is time-sensitive market data and is excluded from the durable public technical question bank.'],
  ['red-book::9.3::9.24', 'The current commodity price is time-sensitive market data and is excluded from the durable public technical question bank.'],
  ['red-book::9.3::9.25', 'The current yield-curve snapshot is time-sensitive market data and is excluded from the durable public technical question bank.'],
  ['red-book::9.3::9.26', 'The current US policy-rate prompt is time-sensitive market data and is excluded from the durable public technical question bank.'],
  ['red-book::9.3::9.27', 'The current UK policy-rate prompt is time-sensitive market data and is excluded from the durable public technical question bank.'],
  ['red-book::9.3::9.28', 'The current euro-area policy-rate prompt is time-sensitive market data and is excluded from the durable public technical question bank.'],
  ['red-book::9.3::9.29', 'The source-era crisis current-affairs prompt is excluded from the durable public technical question bank by explicit user direction.'],
  ['red-book::9.3::9.30', 'The current foreign-exchange rate is time-sensitive market data and is excluded from the durable public technical question bank.'],
  ['red-book::9.3::9.31', 'The current labor-market comparison is time-sensitive market data and is excluded from the durable public technical question bank.'],
  ['red-book::9.3::9.32', 'The current US central-bank office-holder prompt is time-sensitive and is excluded from the durable public technical question bank.'],
  ['red-book::9.3::9.33', 'The current UK central-bank office-holder prompt is time-sensitive and is excluded from the durable public technical question bank.'],
  ['red-book::9.3::9.34', 'The source-era UK regulatory-architecture prompt is obsolete current-affairs material and is excluded from the durable public technical question bank.'],
]);
const expectedRows = [
  {
    key: 'red-book::9::guidance',
    kind: 'guidance',
    source: 'red-book',
    sourceSection: '9',
    sourceItem: null,
    sortKey: '01.01|02|0042|red-book::9::guidance',
    canonicalTopics: ['interview-strategy-communication', 'interview-preparation'],
    coverageCanonicalTopics: ['interview-strategy-communication'],
    questionPages: [{ startPage: 309, endPage: 309 }],
    solutionPages: [],
  },
  {
    key: 'red-book::9.3::guidance',
    kind: 'guidance',
    source: 'red-book',
    sourceSection: '9.3',
    sourceItem: null,
    sortKey: '01.01|02|0044|red-book::9.3::guidance',
    canonicalTopics: [
      'interview-strategy-communication',
      'interview-preparation',
      'fixed-income-rates-general-finance',
    ],
    coverageCanonicalTopics: ['interview-preparation', 'fixed-income-rates-general-finance'],
    questionPages: [{ startPage: 315, endPage: 316 }],
    solutionPages: [],
  },
  ...[
    ['9.23', '01.01|02|1250|red-book::9.3::9.23'],
    ['9.24', '01.01|02|1251|red-book::9.3::9.24'],
    ['9.25', '01.01|02|1252|red-book::9.3::9.25'],
    ['9.26', '01.01|02|1253|red-book::9.3::9.26'],
    ['9.27', '01.01|02|1254|red-book::9.3::9.27'],
    ['9.28', '01.01|02|1255|red-book::9.3::9.28'],
    ['9.29', '01.01|02|1256|red-book::9.3::9.29'],
    ['9.30', '01.01|02|1257|red-book::9.3::9.30'],
    ['9.31', '01.01|02|1258|red-book::9.3::9.31'],
    ['9.32', '01.01|02|1259|red-book::9.3::9.32'],
    ['9.33', '01.01|02|1260|red-book::9.3::9.33'],
    ['9.34', '01.01|02|1261|red-book::9.3::9.34'],
  ].map(([sourceItem, sortKey]) => ({
    key: `red-book::9.3::${sourceItem}`,
    kind: 'question',
    source: 'red-book',
    sourceSection: '9.3',
    sourceItem,
    sortKey,
    canonicalTopics: [
      'interview-strategy-communication',
      'interview-preparation',
      'fixed-income-rates-general-finance',
    ],
    coverageCanonicalTopics: ['interview-preparation', 'fixed-income-rates-general-finance'],
    questionPages: [{ startPage: 316, endPage: 316 }],
    solutionPages: [],
  })),
];
const keys = [...expectedNotes.keys()];
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const coverageIdentity = ({ sourceSection, sourceItem }) =>
  `red-book::${sourceSection}::${sourceItem ?? 'guidance'}`;
const stripMarkdownCode = (value) => value.replace(/^`|`$/g, '');

test('market-awareness skip owns exactly fourteen ordered and exclusively marked records', async () => {
  const inputs = await loadMasterDirectoryRepository(process.cwd());
  const selected = inputs.directory.items.filter((item) => keys.includes(item.key));
  assert.deepEqual(expectedRows.map(({ key }) => key), keys);
  assert.deepEqual(selected.map((item) => item.key), keys);
  assert.equal(selected.length, 14);
  assert.deepEqual(
    inputs.directory.items
      .filter((item) => item.resolutionNote?.includes(auditMarker))
      .map((item) => item.key),
    keys,
  );
});

test('all fourteen rows preserve identity and exact target-free guidance decisions', async () => {
  const [inputs, red] = await Promise.all([
    loadMasterDirectoryRepository(process.cwd()),
    readJson('src/data/quant-interview/coverage/red-book.json'),
  ]);
  const coverageIdentities = red.entries.map(coverageIdentity);
  assert.equal(new Set(coverageIdentities).size, coverageIdentities.length);
  assert.deepEqual(
    red.entries
      .filter((entry) => entry.resolutionNote?.includes(auditMarker))
      .map(coverageIdentity),
    keys,
  );
  for (const expected of expectedRows) {
    const master = inputs.directory.items.find((item) => item.key === expected.key);
    const coverage = red.entries.find((entry) =>
      entry.sourceSection === expected.sourceSection
        && entry.sourceItem === expected.sourceItem,
    );
    assert.deepEqual(
      {
        key: master.key,
        kind: master.kind,
        source: master.source,
        sourceSection: master.sourceSection,
        sourceItem: master.sourceItem,
        sortKey: master.sortKey,
        canonicalTopics: master.canonicalTopics,
        questionPages: master.questionPages,
        solutionPages: master.solutionPages,
      },
      {
        key: expected.key,
        kind: expected.kind,
        source: expected.source,
        sourceSection: expected.sourceSection,
        sourceItem: expected.sourceItem,
        sortKey: expected.sortKey,
        canonicalTopics: expected.canonicalTopics,
        questionPages: expected.questionPages,
        solutionPages: expected.solutionPages,
      },
      expected.key,
    );
    assert.equal(master.state, 'interview-guidance', expected.key);
    assert.equal(coverage.state, 'interview-guidance', expected.key);
    assert.deepEqual(master.canonicalProblems, [], expected.key);
    assert.deepEqual(master.canonicalKnowledge, [], expected.key);
    assert.deepEqual(coverage.canonicalProblems, [], expected.key);
    assert.deepEqual(coverage.canonicalKnowledge, [], expected.key);
    assert.deepEqual(coverage.canonicalTopics, expected.coverageCanonicalTopics, expected.key);
    assert.equal(master.workstream, null, expected.key);
    assert.equal(master.resolutionNote, expectedNotes.get(expected.key), expected.key);
    assert.equal(coverage.resolutionNote, expectedNotes.get(expected.key), expected.key);
  }
  assert.equal(validateMasterDirectoryRepository(inputs), true);
});

test('skip audit repairs pages and remains intact in the current corpus', async () => {
  const inputs = await loadMasterDirectoryRepository(process.cwd());
  const section = inputs.directory.items.find(
    (item) => item.key === 'red-book::9.3::guidance',
  );
  assert.deepEqual(section.questionPages, [{ startPage: 315, endPage: 316 }]);
  for (const key of keys.slice(2)) {
    const item = inputs.directory.items.find((entry) => entry.key === key);
    assert.deepEqual(item.questionPages, [{ startPage: 316, endPage: 316 }], key);
    assert.deepEqual(item.solutionPages, [], key);
  }
  const terminal = inputs.directory.items.filter((item) => TERMINAL_STATES.has(item.state));
  const pending = inputs.directory.items.filter((item) => item.state === 'pending');
  assert.equal(terminal.length, 262);
  assert.equal(pending.length, 488);
  assert.equal(inputs.problemSlugs.size, 96);
  assert.equal(inputs.knowledgeSlugs.size, 59);
});

test('skip audit creates no public market-awareness artifact', async () => {
  const [knowledgeFiles, problemFiles, knowledgeCatalog] = await Promise.all([
    readdir('src/content/knowledge', { recursive: true }),
    readdir('src/content/problems', { recursive: true }),
    readJson('src/data/quant-interview/topics/knowledge-catalog.json'),
  ]);
  const files = [...knowledgeFiles, ...problemFiles];
  assert.equal(
    files.some((file) => /market-awareness|current-market-data/i.test(String(file))),
    false,
  );
  await assert.rejects(
    access('src/content/knowledge/concepts/financial-market-awareness-for-quant-interviews.md'),
    (error) => error?.code === 'ENOENT',
  );
  const forbiddenModuleIdentities = [
    /\b(?:financial )?market awareness(?: for quant interviews?)?\b/,
    /\bcurrent market data(?: for quant interviews?)?\b/,
  ];
  for (const module of knowledgeCatalog.modules) {
    for (const identity of [module.slug, module.title]) {
      const normalizedIdentity = identity.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
      for (const forbidden of forbiddenModuleIdentities) {
        assert.doesNotMatch(normalizedIdentity, forbidden, `${module.slug}: ${identity}`);
      }
    }
  }
  const publicMarkdownFiles = [
    ...knowledgeFiles
      .filter((file) => /\.md$/i.test(String(file)))
      .map((file) => `src/content/knowledge/${String(file).replaceAll('\\', '/')}`),
    ...problemFiles
      .filter((file) => /\.md$/i.test(String(file)))
      .map((file) => `src/content/problems/${String(file).replaceAll('\\', '/')}`),
  ];
  const publicMarkdown = await Promise.all(
    publicMarkdownFiles.map(async (file) => [file, await readFile(file, 'utf8')]),
  );
  const redBookProvenance = [
    /\bRed Book\b[^\r\n]{0,160}\b(?:Section\s+)?9\.3\b/i,
    /\bSection\s+9\.3\b[^\r\n]{0,160}\bRed Book\b/i,
    /\bRed Book\b[^\r\n]{0,160}\bQuestions?\s+9\.(?:2[3-9]|3[0-4])\b/i,
    /\bQuestions?\s+9\.(?:2[3-9]|3[0-4])\b[^\r\n]{0,160}\bRed Book\b/i,
  ];
  assert.equal(
    redBookProvenance.some((provenance) => provenance.test('Red Book 9.3')),
    true,
    'bare Red Book 9.3 provenance must be rejected',
  );
  for (const [file, markdown] of publicMarkdown) {
    for (const key of keys) {
      assert.equal(markdown.includes(key), false, `${file}: ${key}`);
    }
    assert.doesNotMatch(
      markdown,
      /financial-market-awareness-for-quant-interviews/i,
      file,
    );
    for (const provenance of redBookProvenance) {
      assert.doesNotMatch(markdown, provenance, file);
    }
  }
});

test('HANDOFF and generated directory record the target-free skip audit', async () => {
  const [handoff, directory] = await Promise.all([
    readFile('docs/quant-interview/HANDOFF.md', 'utf8'),
    readFile('docs/quant-interview/KNOWLEDGE_DIRECTORY.md', 'utf8'),
  ]);
  const normalizedHandoff = handoff.replace(/\r\n/g, '\n');
  const handoffHeading = '## Skipped source audit — Red Book market awareness';
  const handoffStart = normalizedHandoff.indexOf(handoffHeading);
  assert.notEqual(handoffStart, -1);
  const handoffContentStart = handoffStart + handoffHeading.length;
  const nextHandoffHeading = normalizedHandoff.indexOf('\n## ', handoffContentStart);
  const handoffBlock = normalizedHandoff
    .slice(
      handoffContentStart,
      nextHandoffHeading === -1 ? normalizedHandoff.length : nextHandoffHeading,
    )
    .trim();
  assert.deepEqual(
    handoffBlock,
    `The exact 14-record block \`red-book::9::guidance\`, \`red-book::9.3::guidance\`, and \`red-book::9.3::9.23\` through \`red-book::9.3::9.34\` was terminalized as internal \`interview-guidance\` by explicit user direction.

These 14 records contain time-sensitive market snapshots, source-era office holders, current-affairs prompts, and obsolete regulatory details. They produce exactly **+0 Problems / +0 Knowledge**, have no public target, and do not represent public coverage. Section 9.3 evidence was corrected to PDF pages 315–316.

No workstream ordinal was consumed. Workstream 016 is not active and remains available for the next substantive scope.`,
  );
  assert.match(directory, /Terminal master records: 262/);
  assert.match(directory, /Pending master records: 488/);
  for (const key of keys) {
    const rows = directory
      .split(/\r?\n/)
      .filter((line) => line.startsWith(`| \`${key}\` |`));
    assert.equal(rows.length, 1, key);
    const cells = rows[0]
      .split('|')
      .slice(1, -1)
      .map((cell) => stripMarkdownCode(cell.trim()));
    assert.equal(cells.length, 5, key);
    assert.equal(cells[1], 'interview-guidance', key);
    assert.equal(cells.at(-1), 'None', key);
  }
});
