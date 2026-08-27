import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
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
const normalizeNewlines = (text) => text.replace(/\r\n?/g, '\n');
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
      coordinatorRewriteSharedOrDurableHistoryAllowed: false,
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
      ? [{ path: path.replaceAll('\\', '/').replace(/^\.\//, ''), text: normalizeNewlines(await readFile(path, 'utf8')) }]
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
    const entrypoint = normalizeNewlines(await readFile(path, 'utf8'));

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

test('deterministic policy validation rejects coordinator history rewriting', () => {
  const coordinatorHistoryRewriteAllowed = clonePolicy();
  coordinatorHistoryRewriteAllowed.repository.historySafety.coordinatorRewriteSharedOrDurableHistoryAllowed = true;

  assert.equal(policyIsExact(coordinatorHistoryRewriteAllowed), false);
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
const workstream011Path = 'src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json';
const workstream012Path = 'src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json';
const workstream013Path = 'src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json';
const orderedGates = ['npm run test', 'npm run check', 'npm run build'];

function section(handoff, heading) {
  return handoff.split(new RegExp(`## ${heading}`, 'i'))[1]?.split(/\n## /)[0] ?? '';
}

function assertFactual012Closure(workstream, handoff) {
  const gate = workstream.preClosureActiveGate;
  const verification = workstream.verification;
  assert.match(gate?.commit ?? '', /^[0-9a-f]{40}$/);
  assert.match(gate?.environment ?? '', /^(?:linux-native-lf-node24|wsl-native-lf-node24)$/);
  assert.deepEqual(gate?.commands, orderedGates);
  assert.equal(gate?.conclusion, 'success');
  assert.equal(verification?.commit, gate.commit);
  assert.ok(Number.isInteger(verification?.runId) && verification.runId > 0);
  assert.deepEqual(verification?.commands, orderedGates);
  assert.equal(verification?.conclusion, 'success');
  assert.match(handoff, new RegExp(gate.commit));
  assert.match(handoff, new RegExp(String(verification.runId)));
  assert.match(handoff, new RegExp(gate.environment));
  assert.match(handoff, /76[^\n]*Problems[^\n]*48[^\n]*Knowledge/i);
  assert.match(handoff, /20[^\n]*12[^\n]*canonical-problem[^\n]*6[^\n]*merged-duplicate[^\n]*2[^\n]*knowledge-only/i);
}

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

test('handoff preserves exact reservations while 012 advances through its lifecycle', async () => {
  const handoff = await readFile(handoffPath, 'utf8');
  const coordination = section(handoff, 'Parallel workstream coordination');
  const rows = reservationRows(coordination);
  const workstream011 = JSON.parse(await readFile(workstream011Path, 'utf8'));
  const workstream012 = JSON.parse(await readFile(workstream012Path, 'utf8'));
  const workstream013 = JSON.parse(await readFile(workstream013Path, 'utf8'));

  assert.ok(coordination, 'HANDOFF missing parallel workstream coordination');
  assert.match(coordination, /maximum active candidates[^\n]*3/i);
  assert.equal(workstream011.status, 'complete');
  assert.match(workstream012.status, /^(?:active|complete)$/);
  assert.deepEqual(
    rows.map(({ state, ...identity }) => identity),
    reservations.map(({ state, ...identity }, index) => ({ queue: String(index + 1), ...identity })),
  );
  assert.equal(rows[0]?.state, 'complete');
  assert.equal(rows[1]?.state, workstream012.status);
  assert.equal(rows[2]?.state, workstream013.status);
  assert.match(coordination, /completed queue entr(?:y|ies)[^\n]*011/i);
  if (workstream012.status === 'active') {
    assert.match(coordination, /remaining integration queue[^\n]*012[^\n]*013/i);
    assert.doesNotMatch(coordination, /completed queue entr(?:y|ies)[^.\n]*012/i);
  } else {
    assertFactual012Closure(workstream012, handoff);
    assert.match(coordination, /completed queue entr(?:y|ies)[^\n]*011[^\n]*012/i);
    if (workstream013.status === 'active') {
      assert.match(coordination, /remaining integration queue[^\n]*013/i);
      assert.doesNotMatch(coordination, /completed queue entr(?:y|ies)[^\n]*013/i);
    } else {
      assert.equal(workstream013.status, 'complete');
      assert.doesNotMatch(coordination, /remaining integration queue[^\n]*013/i);
      assert.match(coordination, /completed queue entr(?:y|ies)[^\n]*011[^\n]*012[^\n]*013/i);
    }
    assert.doesNotMatch(coordination, /remaining integration queue[^\n]*012/i);
  }
});

test('authoritative current topic follows factual 012 lifecycle', async () => {
  const handoff = await readFile(handoffPath, 'utf8');
  const current = handoff.split(/Current bounded topic:/i)[1]?.split(/\n## /)[0] ?? '';
  const currentTitle = current.split(/\r?\n/).find((line) => /\*\*/.test(line)) ?? '';
  const workstream012 = JSON.parse(await readFile(workstream012Path, 'utf8'));
  if (workstream012.status === 'active') {
    assert.match(current, /Calculus & Differential Equations/i);
    assert.match(current, /Limits & Derivatives/i);
    assert.doesNotMatch(current, /Reasoning & Communication/i);
  } else {
    assert.equal(workstream012.status, 'complete');
    assertFactual012Closure(workstream012, handoff);
    assert.match(current, /Interview Strategy & Communication/i);
    assert.match(current, /Reasoning & Communication/i);
    assert.doesNotMatch(currentTitle, /Limits & Derivatives/i);
  }
});

test('governance admits 012 and protects 013 until factual 012 closure', async () => {
  const files = await readdir('src/data/quant-interview/workstreams');
  assert.ok(files.includes('stochastic-processes-random-walks-markov-chains-011.json'));
  assert.ok(files.includes('calculus-differential-equations-limits-derivatives-012.json'));
  const workstream011 = JSON.parse(await readFile(workstream011Path, 'utf8'));
  const workstream012 = JSON.parse(await readFile(workstream012Path, 'utf8'));
  assert.equal(workstream011.status, 'complete');
  assert.match(workstream012.status, /^(?:active|complete)$/);
  const has013 = files.includes('interview-strategy-communication-reasoning-communication-013.json');
  if (workstream012.status === 'active') {
    assert.equal(has013, false);
    await assert.rejects(access(workstream013Path));
  } else {
    const handoff = await readFile(handoffPath, 'utf8');
    assertFactual012Closure(workstream012, handoff);
    if (has013) {
      const workstream013 = JSON.parse(await readFile(workstream013Path, 'utf8'));
      assert.match(workstream013.status, /^(?:active|complete)$/);
    }
  }
});
