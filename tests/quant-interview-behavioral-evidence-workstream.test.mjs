import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  getNextPendingItem,
  TERMINAL_STATES,
} from '../src/lib/quantInterviewMasterDirectory.mjs';
import {
  loadMasterDirectoryRepository,
  validateMasterDirectoryRepository,
} from '../scripts/validate-quant-interview-master-directory.mjs';

const manifestPath =
  'src/data/quant-interview/workstreams/interview-strategy-communication-soft-interview-behavioral-evidence-017.json';
const workstreamId =
  'interview-strategy-communication-soft-interview-behavioral-evidence-017';
const knowledgePath =
  'src/content/knowledge/concepts/behavioral-interview-evidence-and-authenticity.md';
const keys = [
  'red-book::9.2::guidance',
  ...Array.from({ length: 22 }, (_, index) => `red-book::9.2::9.${index + 1}`),
];
const newSlug = 'behavioral-interview-evidence-and-authenticity';
const roleSlug = 'quant-role-and-employer-fit';
const prepSlug = 'quant-interview-preparation-breadth-and-practice';
const thinkSlug = 'structured-think-aloud-reasoning';
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

const mappings = [
  ['knowledge-only', [newSlug]],
  ['knowledge-only', [newSlug, roleSlug]],
  ['knowledge-only', [newSlug]],
  ['interview-guidance', []],
  ['knowledge-only', [newSlug, roleSlug]],
  ['knowledge-only', [newSlug]],
  ['knowledge-only', [newSlug]],
  ['knowledge-only', [newSlug]],
  ['interview-guidance', []],
  ['knowledge-only', [newSlug, roleSlug]],
  ['knowledge-only', [newSlug, roleSlug]],
  ['knowledge-only', [newSlug, thinkSlug]],
  ['interview-guidance', []],
  ['knowledge-only', [newSlug]],
  ['knowledge-only', [newSlug]],
  ['interview-guidance', []],
  ['interview-guidance', []],
  ['knowledge-only', [newSlug]],
  ['knowledge-only', [newSlug, prepSlug]],
  ['knowledge-only', [newSlug, roleSlug]],
  ['knowledge-only', [newSlug, roleSlug]],
  ['knowledge-only', [newSlug]],
  ['knowledge-only', [newSlug, roleSlug]],
];

const notes = [
  'Red Book 9.2 provides reusable behavioral-prompt families that resolve to the canonical evidence-and-authenticity Knowledge page.',
  'Red Book 9.1 motivation and role-fit evidence resolve to the behavioral-evidence and role-fit Knowledge pages.',
  'Red Book 9.2 CV evidence, contribution, relevance, and learning resolve to the behavioral-evidence Knowledge page.',
  'Red Book 9.3 relies on workplace-culture and swearing stereotypes; it remains target-free interview guidance.',
  'Red Book 9.4 career-change motivation resolves to the behavioral-evidence and role-fit Knowledge pages.',
  'Red Book 9.5 difficult-collaboration evidence resolves to the behavioral-evidence Knowledge page without preserving manipulative source tactics.',
  'Red Book 9.6 honest weakness and improvement evidence resolve to the behavioral-evidence Knowledge page.',
  'Red Book 9.7 deadline evidence and execution under constraints resolve to the behavioral-evidence Knowledge page.',
  'Red Book 9.8 asks for time-sensitive current share-price data and remains target-free interview guidance.',
  'Red Book 9.9 organization-specific research evidence resolves to the behavioral-evidence and role-fit Knowledge pages without publishing current facts.',
  'Red Book 9.10 career-direction evidence resolves to the behavioral-evidence and role-fit Knowledge pages.',
  'Red Book 9.11 audience-adapted technical explanation resolves to the behavioral-evidence and think-aloud Knowledge pages.',
  'Red Book 9.12 uses share ownership as an outdated interest proxy and remains target-free interview guidance.',
  'Red Book 9.13 nontechnical strengths supported by examples resolve to the behavioral-evidence Knowledge page.',
  'Red Book 9.14 collaborator feedback and self-awareness evidence resolve to the behavioral-evidence Knowledge page.',
  'Red Book 9.15 is an irrelevant food-preference prompt and remains target-free interview guidance.',
  'Red Book 9.16 depends on a source-specific hidden first-day answer and remains target-free interview guidance.',
  'Red Book 9.17 initiative and impact evidence resolve to the behavioral-evidence Knowledge page.',
  'Red Book 9.18 learning and building evidence resolve to the behavioral-evidence and preparation Knowledge pages.',
  'Red Book 9.19 organization-fit research resolves to the behavioral-evidence and role-fit Knowledge pages.',
  'Red Book 9.20 independent-versus-collaborative work preferences resolve to the behavioral-evidence and role-fit Knowledge pages.',
  'Red Book 9.21 leadership evidence and measurable outcomes resolve to the behavioral-evidence Knowledge page.',
  'Red Book 9.22 unfamiliar-tool adaptability and transferable-skill trade-offs resolve to the behavioral-evidence and role-fit Knowledge pages.',
];

const activeManifest = {
  id: workstreamId,
  canonicalTopics: [
    'interview-strategy-communication',
    'soft-interview',
  ],
  status: 'active',
  masterItemKeys: keys,
  sourceScopes: [
    {
      source: 'red-book',
      sourceSections: ['9.2'],
      evidencePageRanges: [{ startPage: 309, endPage: 315 }],
      reviewOutcome: 'selective-behavioral-knowledge-and-guidance',
      reviewNote:
        'Twenty-three consecutive soft-interview records resolve to one source-neutral evidence framework, approved existing Knowledge links, and five target-free guidance rows.',
    },
  ],
  publicDelta: { problems: 0, knowledge: 1 },
  knowledgeSlugs: [newSlug],
};

const page = (startPage, endPage = startPage) => [{ startPage, endPage }];
const fixtureRows = [
  ['red-book::9.2::guidance', 'guidance', null, page(309, 315), [], '01.04|02|0043|red-book::9.2::guidance'],
  ['red-book::9.2::9.1', 'question', '9.1', page(309, 310), page(309, 310), '01.04|02|1228|red-book::9.2::9.1'],
  ['red-book::9.2::9.2', 'question', '9.2', page(310), page(310, 311), '01.04|02|1229|red-book::9.2::9.2'],
  ['red-book::9.2::9.3', 'question', '9.3', page(310, 311), page(310, 311), '01.04|02|1230|red-book::9.2::9.3'],
  ['red-book::9.2::9.4', 'question', '9.4', page(311), page(311), '01.04|02|1231|red-book::9.2::9.4'],
  ['red-book::9.2::9.5', 'question', '9.5', page(311), page(311), '01.04|02|1232|red-book::9.2::9.5'],
  ['red-book::9.2::9.6', 'question', '9.6', page(311, 312), page(311, 312), '01.04|02|1233|red-book::9.2::9.6'],
  ['red-book::9.2::9.7', 'question', '9.7', page(312), page(312), '01.04|02|1234|red-book::9.2::9.7'],
  ['red-book::9.2::9.8', 'question', '9.8', page(312), page(312), '01.04|02|1235|red-book::9.2::9.8'],
  ['red-book::9.2::9.9', 'question', '9.9', page(312), page(312), '01.04|02|1236|red-book::9.2::9.9'],
  ['red-book::9.2::9.10', 'question', '9.10', page(312), page(312), '01.04|02|1237|red-book::9.2::9.10'],
  ['red-book::9.2::9.11', 'question', '9.11', page(312, 313), page(312, 313), '01.04|02|1238|red-book::9.2::9.11'],
  ['red-book::9.2::9.12', 'question', '9.12', page(313), page(312, 313), '01.04|02|1239|red-book::9.2::9.12'],
  ['red-book::9.2::9.13', 'question', '9.13', page(313), page(313, 314), '01.04|02|1240|red-book::9.2::9.13'],
  ['red-book::9.2::9.14', 'question', '9.14', page(313, 314), page(313, 314), '01.04|02|1241|red-book::9.2::9.14'],
  ['red-book::9.2::9.15', 'question', '9.15', page(314), page(314), '01.04|02|1242|red-book::9.2::9.15'],
  ['red-book::9.2::9.16', 'question', '9.16', page(314), page(314), '01.04|02|1243|red-book::9.2::9.16'],
  ['red-book::9.2::9.17', 'question', '9.17', page(314), page(314), '01.04|02|1244|red-book::9.2::9.17'],
  ['red-book::9.2::9.18', 'question', '9.18', page(314), page(314), '01.04|02|1245|red-book::9.2::9.18'],
  ['red-book::9.2::9.19', 'question', '9.19', page(314, 315), page(314, 315), '01.04|02|1246|red-book::9.2::9.19'],
  ['red-book::9.2::9.20', 'question', '9.20', page(315), page(315), '01.04|02|1247|red-book::9.2::9.20'],
  ['red-book::9.2::9.21', 'question', '9.21', page(315), page(315), '01.04|02|1248|red-book::9.2::9.21'],
  ['red-book::9.2::9.22', 'question', '9.22', page(315, 316), page(315), '01.04|02|1249|red-book::9.2::9.22'],
];

const preEditIdentityFixtures = fixtureRows.map(([
  key,
  kind,
  sourceItem,
  questionPages,
  solutionPages,
  sortKey,
]) => ({
  key,
  kind,
  source: 'red-book',
  sourceSection: '9.2',
  sourceItem,
  questionPages,
  solutionPages,
  primaryTopic: 'soft-interview',
  canonicalTopics: [
    'interview-strategy-communication',
    'soft-interview',
  ],
  sortKey,
}));

const pageRepairs = new Map([
  ['red-book::9.2::9.2::solutionPages', page(310)],
  ['red-book::9.2::9.3::questionPages', page(310)],
  ['red-book::9.2::9.3::solutionPages', page(310)],
  ['red-book::9.2::9.6::questionPages', page(311)],
  ['red-book::9.2::9.6::solutionPages', page(311)],
  ['red-book::9.2::9.12::solutionPages', page(313)],
  ['red-book::9.2::9.13::solutionPages', page(313)],
  ['red-book::9.2::9.14::questionPages', page(313)],
  ['red-book::9.2::9.14::solutionPages', page(313)],
  ['red-book::9.2::9.22::questionPages', page(315)],
]);

const approvedPrompts = [
  'Why are you pursuing quantitative work and this role now?',
  'Choose one CV item: what did you contribute, why is it relevant, and what did you learn?',
  'Why are you leaving or changing your previous direction?',
  'Describe a difficult collaboration and the concrete actions you took.',
  'What genuine weakness are you improving, and what evidence shows progress?',
  'Give an example of meeting an important deadline under constraints.',
  'What direction do you want your work to take over the next several years, and why does this role fit?',
  'Explain your research first to a non-specialist and then to a technical expert.',
  'What useful qualities do you bring beyond technical ability, and how have you demonstrated them?',
  'What would close collaborators say about your working style, and what examples support that view?',
  'What achievement best demonstrates unusual initiative or impact?',
  'What have you studied or built that demonstrates genuine interest in finance or quantitative work?',
  'What recent development at this organization is relevant to the role, and why?',
  'Why does this organization or team fit your goals better than plausible alternatives?',
  'In what situations do you work best independently, and when does collaboration improve the result?',
  'Describe a time you led others toward a measurable outcome.',
  'How would you evaluate and adapt to an unfamiliar internal language or tool while protecting transferable skills?',
];

const publicPromptByKey = new Map([
  ['red-book::9.2::9.1', approvedPrompts[0]],
  ['red-book::9.2::9.2', approvedPrompts[1]],
  ['red-book::9.2::9.4', approvedPrompts[2]],
  ['red-book::9.2::9.5', approvedPrompts[3]],
  ['red-book::9.2::9.6', approvedPrompts[4]],
  ['red-book::9.2::9.7', approvedPrompts[5]],
  ['red-book::9.2::9.9', approvedPrompts[12]],
  ['red-book::9.2::9.10', approvedPrompts[6]],
  ['red-book::9.2::9.11', approvedPrompts[7]],
  ['red-book::9.2::9.13', approvedPrompts[8]],
  ['red-book::9.2::9.14', approvedPrompts[9]],
  ['red-book::9.2::9.17', approvedPrompts[10]],
  ['red-book::9.2::9.18', approvedPrompts[11]],
  ['red-book::9.2::9.19', approvedPrompts[13]],
  ['red-book::9.2::9.20', approvedPrompts[14]],
  ['red-book::9.2::9.21', approvedPrompts[15]],
  ['red-book::9.2::9.22', approvedPrompts[16]],
]);

const skippedKeys = [
  'red-book::9.2::9.3',
  'red-book::9.2::9.8',
  'red-book::9.2::9.12',
  'red-book::9.2::9.15',
  'red-book::9.2::9.16',
];

test('017 active manifest is exact and contains no closure evidence', async () => {
  assert.deepEqual(await readJson(manifestPath), activeManifest);
});

test('017 exclusively owns exact mirrored Red 9.2 decisions', async () => {
  const [manifest, inputs, red] = await Promise.all([
    readJson(manifestPath),
    loadMasterDirectoryRepository(process.cwd()),
    readJson('src/data/quant-interview/coverage/red-book.json'),
  ]);

  const redIdentities = red.entries.map(({ sourceSection, sourceItem }) =>
    JSON.stringify([sourceSection, sourceItem]));
  assert.equal(
    new Set(redIdentities).size,
    redIdentities.length,
    'Red coverage identities must be globally unique before identity lookup',
  );

  const redRows = red.entries.filter(({ sourceSection }) => sourceSection === '9.2');
  assert.equal(redRows.length, 23, '017 adds exactly 22 item rows beside the guidance row');
  assert.deepEqual(
    redRows.map(({ sourceItem }) => sourceItem),
    [null, ...Array.from({ length: 22 }, (_, index) => `9.${index + 1}`)],
  );

  const ownersByKey = new Map();
  for (const workstream of inputs.workstreams) {
    for (const key of workstream.masterItemKeys ?? []) {
      const owners = ownersByKey.get(key) ?? [];
      owners.push(workstream.id);
      ownersByKey.set(key, owners);
    }
  }
  for (const key of keys) {
    assert.deepEqual(ownersByKey.get(key), [workstreamId], key);
  }
  assert.deepEqual(
    inputs.directory.items
      .filter((item) => item.workstream === manifest.id)
      .map((item) => item.key),
    keys,
    'reverse master ownership must equal the manifest scope',
  );

  for (const [index, key] of keys.entries()) {
    const master = inputs.directory.items.find((item) => item.key === key);
    const coverage = red.entries.find(
      (entry) =>
        entry.sourceSection === master.sourceSection &&
        entry.sourceItem === master.sourceItem,
    );
    const [state, targets] = mappings[index];
    assert.equal(master.state, state, key);
    assert.equal(coverage.state, state, key);
    assert.deepEqual(master.canonicalProblems, [], key);
    assert.deepEqual(coverage.canonicalProblems, [], key);
    assert.deepEqual(master.canonicalKnowledge, targets, key);
    assert.deepEqual(coverage.canonicalKnowledge, targets, key);
    assert.equal(master.workstream, manifest.id, key);
    assert.equal(master.resolutionNote, notes[index], key);
    assert.equal(coverage.resolutionNote, notes[index], key);
    assert.deepEqual(coverage.canonicalTopics, ['soft-interview'], key);
  }

  assert.equal(
    keys.filter((_, index) => mappings[index][0] === 'knowledge-only').length,
    18,
  );
  assert.equal(
    keys.filter((_, index) => mappings[index][0] === 'interview-guidance').length,
    5,
  );
  assert.equal(validateMasterDirectoryRepository(inputs), true);
});

test('017 preserves literal pre-edit identity and changes only ten approved page fields', async () => {
  const inputs = await loadMasterDirectoryRepository(process.cwd());
  const actual = keys.map((key) => {
    const item = inputs.directory.items.find((candidate) => candidate.key === key);
    return {
      key: item.key,
      kind: item.kind,
      source: item.source,
      sourceSection: item.sourceSection,
      sourceItem: item.sourceItem,
      questionPages: item.questionPages,
      solutionPages: item.solutionPages,
      primaryTopic: item.primaryTopic,
      canonicalTopics: item.canonicalTopics,
      sortKey: item.sortKey,
    };
  });

  const withoutPages = ({ questionPages, solutionPages, ...identity }) => identity;
  assert.deepEqual(
    actual.map(withoutPages),
    preEditIdentityFixtures.map(withoutPages),
  );

  const changedPageFields = [];
  for (const [index, fixture] of preEditIdentityFixtures.entries()) {
    for (const field of ['questionPages', 'solutionPages']) {
      const repairKey = `${fixture.key}::${field}`;
      if (!pageRepairs.has(repairKey)) {
        assert.deepEqual(actual[index][field], fixture[field], repairKey);
        continue;
      }
      assert.notDeepEqual(actual[index][field], fixture[field], repairKey);
      assert.deepEqual(actual[index][field], pageRepairs.get(repairKey), repairKey);
      changedPageFields.push(repairKey);
    }
  }
  assert.deepEqual(changedPageFields, [...pageRepairs.keys()]);
  assert.equal(changedPageFields.length, 10);
});

test('017 binds exactly 17 relevant source items to exact public prompt semantics', async () => {
  const text = await readFile(knowledgePath, 'utf8');
  const promptBlock =
    text.split(/^## Practice Prompts$/m)[1]?.split(/^## /m)[0] ?? '';
  const publicPrompts = [...promptBlock.matchAll(/^\d+\. (.+)$/gm)].map(
    ([, prompt]) => prompt,
  );
  assert.deepEqual(publicPrompts, approvedPrompts);
  assert.deepEqual(
    [...publicPromptByKey.keys()],
    keys.slice(1).filter((key) => !skippedKeys.includes(key)),
  );
  assert.equal(publicPromptByKey.size, 17);
  assert.deepEqual(
    [...publicPromptByKey.values()].toSorted(),
    approvedPrompts.toSorted(),
  );
  for (const key of skippedKeys) {
    assert.equal(publicPromptByKey.has(key), false, key);
  }
});

test('017 yields exact 76/54, 228/522, and Green 2.1 next without 018', async () => {
  const inputs = await loadMasterDirectoryRepository(process.cwd());
  assert.equal(inputs.problemSlugs.size, 76);
  assert.equal(inputs.knowledgeSlugs.size, 54);
  assert.equal(
    inputs.directory.items.filter((item) => TERMINAL_STATES.has(item.state))
      .length,
    228,
  );
  assert.equal(
    inputs.directory.items.filter((item) => item.state === 'pending').length,
    522,
  );
  assert.equal(getNextPendingItem(inputs.directory)?.key, 'green-book::2.1::theory');
  assert.equal(inputs.workstreams.some(({ id }) => /-018$/.test(id)), false);
});
