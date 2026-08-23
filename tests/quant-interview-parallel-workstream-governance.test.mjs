import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { isDeepStrictEqual } from 'node:util';

const protocolPath = 'docs/quant-interview/AGENT_PROTOCOL.md';
const readmePath = 'docs/quant-interview/README.md';
const designPath = 'docs/superpowers/specs/2026-08-23-quant-interview-parallel-workstream-governance-design.md';
const planPath = 'docs/superpowers/plans/2026-08-23-quant-interview-parallel-workstream-governance.md';
const policyPath = 'docs/quant-interview/parallel-workstream-policy.json';
const policyId = 'quant-interview.parallel-workstream-governance';
const policyVersion = '1.0.0';
const policyReferenceStart = '<!-- parallel-workstream-policy-reference:start -->';
const policyReferenceEnd = '<!-- parallel-workstream-policy-reference:end -->';
const policyReferenceBlock = `<!-- parallel-workstream-policy-reference:start -->
> Canonical parallel-workstream policy: \`${policyId}\` at \`${policyPath}\`.
>
> The JSON policy is normative and the sole source of truth for parallel-workstream governance. Surrounding prose is explanatory and cannot override it.
<!-- parallel-workstream-policy-reference:end -->`;

const governanceEntrypoints = {
  AGENT_PROTOCOL: protocolPath,
  README: readmePath,
  design: designPath,
  plan: planPath,
};

const expectedPolicy = {
  policyId,
  version: policyVersion,
  authority: {
    status: 'normative',
    sourceOfTruth: 'sole',
    scope: 'parallel-workstream-governance',
  },
  repository: {
    main: {
      protected: true,
      mayBeModified: false,
    },
    historySafety: {
      candidateForceUpdateSharedOrDurableHistoryAllowed: false,
      candidateRewriteSharedOrDurableHistoryAllowed: false,
      integrationOwner: 'coordinator',
      coordinatorIntegrationForceUpdateAllowed: false,
    },
  },
  candidates: {
    maxActive: 3,
    isolationRequired: true,
    approvedModulesPerBranch: 1,
    approvedModulesPerWorktree: 1,
    implementationRequiresApprovedWrittenDesignSpec: true,
    preApprovalActivities: [
      'design',
      'source-audit',
    ],
    allowedResponsibilities: [
      'module-scoped-public-knowledge-content',
      'module-scoped-public-problem-content',
      'module-specific-tests',
      'report-proposed-shared-file-deltas',
    ],
    responsibilityConstraints: {
      moduleScopedPublicContent: {
        creationOrigin: 'candidate-created',
        moduleScope: 'approved-module-only',
      },
      moduleSpecificTests: {
        moduleScope: 'approved-module-only',
        excludedCoordinatorSurfaceIds: [
          'exact-global-registry-count-regression-tests',
          'handoff-and-handoff-tests',
          'prior-workstream-completion-tests',
        ],
      },
      sharedSurfaceDeltas: {
        mode: 'report-proposal-only',
        candidateEditAllowed: false,
      },
    },
    forbiddenSharedResponsibilities: [
      'coverage-ledgers',
      'source-topic-map',
      'exact-global-registry-count-regressions',
      'handoff',
      'workstream-completion-metadata-manifests',
      'ci-workflows',
    ],
    postVerificationState: 'active',
    activeStateIsCompletion: false,
    mayDeclareCompletion: false,
  },
  coordinator: {
    ownsAllSharedState: true,
    reconciliationBase: 'latest-durable-base',
    integrationMode: 'serialized-one-at-a-time',
    closureMode: 'serialized-one-at-a-time',
    sharedState: {
      ownership: 'coordinator-only',
      candidateEditAllowed: false,
      candidateProposalMode: 'report-only',
      surfaces: [
        {
          id: 'coverage-ledgers',
          pathPatterns: [
            'src/data/quant-interview/coverage/*.json',
          ],
        },
        {
          id: 'source-topic-map',
          pathPatterns: [
            'src/data/quant-interview/topics/source-topic-map.json',
          ],
        },
        {
          id: 'exact-global-registry-count-regression-tests',
          pathPatterns: [
            'tests/quant-interview-source-neutral-content.test.mjs',
          ],
        },
        {
          id: 'handoff-and-handoff-tests',
          pathPatterns: [
            'docs/quant-interview/HANDOFF.md',
            'tests/quant-interview-handoff.test.mjs',
          ],
        },
        {
          id: 'workstream-completion-metadata-manifests',
          pathPatterns: [
            'src/data/quant-interview/workstreams/*.json',
          ],
        },
        {
          id: 'prior-workstream-completion-tests',
          pathPatterns: [
            'tests/quant-interview-*-completion.test.mjs',
          ],
        },
        {
          id: 'ci-workflows',
          pathPatterns: [
            '.github/workflows/*.yml',
            '.github/workflows/*.yaml',
          ],
        },
        {
          id: 'base-existing-knowledge-problem-reciprocal-links',
          pathPatterns: [
            'src/content/knowledge/**/*.md',
            'src/content/problems/**/*.md',
          ],
          selection: {
            existenceAtCandidateBase: true,
            editKind: 'reciprocal-link',
          },
        },
      ],
    },
    queue: [
      '011',
      '012',
      '013',
    ],
  },
  reservations: [
    {
      ordinal: '011',
      topic: 'random-walks-markov-chains',
      branch: 'chatgpt/quant-interview-workstream-random-walks-markov-chains-2026-08-23',
    },
    {
      ordinal: '012',
      topic: 'limits-derivatives',
      branch: 'chatgpt/quant-interview-workstream-limits-derivatives-2026-08-23',
    },
    {
      ordinal: '013',
      topic: 'reasoning-communication',
      branch: 'chatgpt/quant-interview-workstream-reasoning-communication-2026-08-23',
    },
  ],
};

const occurrenceCount = (text, needle) => text.split(needle).length - 1;
const policyIsExact = (policy) => isDeepStrictEqual(policy, expectedPolicy);
const clonePolicy = () => JSON.parse(JSON.stringify(expectedPolicy));

function hasExactlyOneCanonicalReference(text) {
  return occurrenceCount(text, policyReferenceBlock) === 1
    && occurrenceCount(text, policyReferenceStart) === 1
    && occurrenceCount(text, policyReferenceEnd) === 1
    && occurrenceCount(text, policyId) === 1
    && occurrenceCount(text, policyPath) === 1;
}

const excludedPolicyScanDirectories = new Set([
  '.git',
  '.superpowers',
  '.astro',
  'coverage',
  'dist',
  'node_modules',
]);

async function repositoryTextArtifacts(directory = '.') {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      return excludedPolicyScanDirectories.has(entry.name)
        ? []
        : repositoryTextArtifacts(path);
    }
    return ['.json', '.md'].includes(extname(entry.name).toLowerCase())
      ? [{ path: path.replaceAll('\\', '/').replace(/^\.\//, ''), text: await readFile(path, 'utf8') }]
      : [];
  }));
  return nested.flat();
}

function parsedJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function policyTopologyIsValid(files) {
  const expectedArtifactPaths = [policyPath, ...Object.values(governanceEntrypoints)].sort();
  const artifactPaths = files
    .filter(({ text }) => text.includes(policyId) || text.includes(policyReferenceStart) || text.includes(policyReferenceEnd))
    .map(({ path }) => path)
    .sort();
  const normativeDeclarations = files
    .filter(({ path }) => extname(path).toLowerCase() === '.json')
    .filter(({ text }) => {
      const value = parsedJson(text);
      return value?.policyId === policyId
        || (value?.authority?.status === 'normative' && value?.authority?.scope === 'parallel-workstream-governance');
    })
    .map(({ path }) => path)
    .sort();
  const referencePaths = files
    .filter(({ text }) => text.includes(policyReferenceStart) || text.includes(policyReferenceEnd))
    .map(({ path }) => path)
    .sort();

  return isDeepStrictEqual(artifactPaths, expectedArtifactPaths)
    && isDeepStrictEqual(normativeDeclarations, [policyPath])
    && isDeepStrictEqual(referencePaths, Object.values(governanceEntrypoints).sort())
    && Object.values(governanceEntrypoints).every((path) => {
      const entrypoint = files.find((file) => file.path === path);
      return entrypoint && hasExactlyOneCanonicalReference(entrypoint.text);
    });
}

test('canonical parallel-workstream policy exactly matches the complete typed contract', async () => {
  const policy = JSON.parse(await readFile(policyPath, 'utf8'));

  assert.deepEqual(policy, expectedPolicy);
});

for (const [name, path] of Object.entries(governanceEntrypoints)) {
  test(`${name} contains exactly one canonical policy reference block`, async () => {
    const entrypoint = await readFile(path, 'utf8');

    assert.equal(hasExactlyOneCanonicalReference(entrypoint), true);
  });
}

test('deterministic policy validation rejects typed invariant and reservation mutations', () => {
  const alteredMax = clonePolicy();
  alteredMax.candidates.maxActive = 2;
  const reorderedReservations = clonePolicy();
  reorderedReservations.reservations.reverse();
  const mismatchedReservation = clonePolicy();
  mismatchedReservation.reservations[1].branch = 'chatgpt/wrong-branch';

  assert.equal(policyIsExact(expectedPolicy), true);
  assert.equal(policyIsExact(alteredMax), false);
  assert.equal(policyIsExact(reorderedReservations), false);
  assert.equal(policyIsExact(mismatchedReservation), false);
});

test('deterministic policy validation rejects weakened history safety', () => {
  const historyRewriteAllowed = clonePolicy();
  historyRewriteAllowed.repository.historySafety.candidateRewriteSharedOrDurableHistoryAllowed = true;

  assert.equal(policyIsExact(historyRewriteAllowed), false);
});

test('deterministic policy validation rejects a changed coordinator-only surface path', () => {
  const missingHandoffTest = clonePolicy();
  const handoffSurface = missingHandoffTest.coordinator.sharedState.surfaces
    .find(({ id }) => id === 'handoff-and-handoff-tests');
  handoffSurface.pathPatterns = ['docs/quant-interview/HANDOFF.md'];

  assert.equal(policyIsExact(missingHandoffTest), false);
});

test('repository declares one normative policy and only the four canonical references', async () => {
  assert.equal(policyTopologyIsValid(await repositoryTextArtifacts()), true);
});

test('deterministic topology validation rejects duplicate declarations and references', () => {
  const canonicalFiles = [
    { path: policyPath, text: JSON.stringify(expectedPolicy) },
    ...Object.values(governanceEntrypoints).map((path) => ({ path, text: policyReferenceBlock })),
  ];
  const duplicateDeclaration = [
    ...canonicalFiles,
    { path: 'docs/quant-interview/duplicate-policy.json', text: JSON.stringify(expectedPolicy) },
  ];
  const duplicateReference = canonicalFiles.map((file) => (
    file.path === readmePath ? { ...file, text: `${file.text}\n${policyReferenceBlock}` } : file
  ));
  const mismatchedReference = canonicalFiles.map((file) => (
    file.path === designPath ? { ...file, text: file.text.replace(policyId, 'wrong.policy-id') } : file
  ));

  assert.equal(policyTopologyIsValid(canonicalFiles), true);
  assert.equal(policyTopologyIsValid(duplicateDeclaration), false);
  assert.equal(policyTopologyIsValid(duplicateReference), false);
  assert.equal(policyTopologyIsValid(mismatchedReference), false);
});

const handoffPath = 'docs/quant-interview/HANDOFF.md';

const reservations = [
  {
    ordinal: '011',
    topic: 'random-walks-markov-chains',
    branch: 'chatgpt/quant-interview-workstream-random-walks-markov-chains-2026-08-23',
    state: 'design-audit',
  },
  {
    ordinal: '012',
    topic: 'limits-derivatives',
    branch: 'chatgpt/quant-interview-workstream-limits-derivatives-2026-08-23',
    state: 'design-audit',
  },
  {
    ordinal: '013',
    topic: 'reasoning-communication',
    branch: 'chatgpt/quant-interview-workstream-reasoning-communication-2026-08-23',
    state: 'design-audit',
  },
];

const normalizeCell = (cell) => cell.trim().replace(/^`|`$/g, '').replace(/\s+/g, ' ');

function reservationRows(coordination) {
  return coordination
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^\|\s*\d+\s*\|\s*\d{3}\s*\|/.test(line))
    .map((line) => line.split('|').slice(1, -1).map(normalizeCell))
    .map(([queue, ordinal, topic, branch, state]) => ({ queue, ordinal, topic, branch, state }));
}

test('handoff reserves the first parallel wave without claiming candidate completion', async () => {
  const handoff = await readFile(handoffPath, 'utf8');
  const coordination = handoff.split(/## Parallel workstream coordination/i)[1]?.split(/## /)[0] ?? '';

  assert.ok(coordination, 'HANDOFF missing parallel workstream coordination');
  assert.match(coordination, /maximum active candidates[^\n]*3/i);
  assert.match(coordination, /integration queue[^\n]*011[^\n]*012[^\n]*013/i);
  assert.match(coordination, /candidate[^\n]*active[^\n]*not[^\n]*complete/i);
  assert.deepEqual(
    reservationRows(coordination),
    reservations.map((reservation, index) => ({ queue: String(index + 1), ...reservation })),
  );
});

test('parallel reservations preserve Random Walks as the authoritative current topic', async () => {
  const handoff = await readFile(handoffPath, 'utf8');
  const current = handoff.split(/Current bounded topic:/i)[1]?.split(/## /)[0] ?? '';

  assert.match(current, /Random Walks & Markov Chains/i);
  assert.doesNotMatch(current, /Limits & Derivatives|Reasoning & Communication/i);
});

test('governance does not create product workstream manifests early', async () => {
  const files = await readdir('src/data/quant-interview/workstreams');
  const reservedOrdinals = new Set(reservations.map(({ ordinal }) => ordinal));
  const prematureManifests = files.filter((file) => {
    const suffix = file.match(/(\d{3})\.json$/)?.[1];
    return suffix && reservedOrdinals.has(suffix);
  });

  assert.deepEqual(prematureManifests, []);
});
