import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const files = {
  small: 'src/content/knowledge/concepts/small-cases-recurrence-and-structural-simplification.md',
  fermi: 'src/content/knowledge/concepts/fermi-estimation-assumption-decomposition.md',
};
const topics = ['logic-brainteasers-discrete-reasoning', 'problem-simplification'];

const smallMetadata = {
  title: 'Small Cases, Recurrence & Structural Simplification',
  description: 'Reduce complex interview problems to valid base cases, derive recurrences or structural invariants, prove the emerging pattern, and lift it back to the original scale.',
  date: '2026-08-30', type: 'concept', domain: 'Mathematics & Statistics',
  category: 'Problem Solving Techniques', status: 'growing',
  tags: ['Problem Simplification', 'Recurrence', 'Induction', 'Interview'],
  quantInterviewTopics: topics, featured: false,
  related: ['recursion-problem-solving', 'problem-framing-clarification-assumption-management', 'fermi-estimation-assumption-decomposition'],
  relatedNotes: [],
};
const fermiMetadata = {
  title: 'Fermi Estimation & Assumption Decomposition',
  description: 'Build auditable Fermi estimates by defining units, decomposing assumptions, bounding sensitive factors, cross-checking independently, and planning validation.',
  date: '2026-08-30', type: 'concept', domain: 'Mathematics & Statistics',
  category: 'Problem Solving Techniques', status: 'growing',
  tags: ['Fermi Estimation', 'Assumptions', 'Sensitivity', 'Interview'],
  quantInterviewTopics: topics, featured: false,
  related: ['small-cases-recurrence-and-structural-simplification', 'problem-framing-clarification-assumption-management'],
  relatedNotes: [],
};

async function page(path) {
  const text = await readFile(path, 'utf8');
  assert.equal(text.startsWith('---\n'), true);
  return {
    text,
    metadata: parseYaml(text.split(/^---$/m)[1] ?? '', { schema: JSON_SCHEMA }),
  };
}

function section(text, heading) {
  return text.split(new RegExp(`^## ${heading}$`, 'm'))[1]?.split(/^## /m)[0] ?? '';
}

function levelTwoHeadings(text) {
  return [...text.matchAll(/^## (.+)$/gm)].map((match) => match[1]);
}

function assertNonemptySections(text, headings) {
  for (const heading of headings) {
    assert.notEqual(section(text, heading).trim(), '', `${heading} must contain content`);
  }
}

function numberedItems(text, heading) {
  return (section(text, heading).match(/^\d+\. .+$/gm) ?? [])
    .map((item) => item.replace(/^\d+\. /, ''));
}

const compact = (text) => text.replace(/[`$\\\s]/g, '');

test('small-cases Knowledge teaches a complete simplification-to-proof loop', async () => {
  const { text, metadata } = await page(files.small);
  assert.deepEqual(metadata, smallMetadata);
  const headings = ['Core Idea', 'Seven-Step Workflow', 'Four Simplification Modes', 'From Pattern to Proof', 'Recognition Signals', 'Common Mistakes', 'Interview Checks'];
  assert.deepEqual(levelTwoHeadings(text), headings);
  assertNonemptySections(text, headings);
  const workflow = section(text, 'Seven-Step Workflow').match(/^\d+\. .+$/gm) ?? [];
  assert.equal(workflow.length, 7);
  for (const pattern of [/preserve.*rules/i, /base cases?/i, /solve.*completely/i, /increase.*one step/i, /state transitions?/i, /conjecture/i, /prove.*original/i]) {
    assert.match(workflow.join('\n'), pattern);
  }
  const modes = section(text, 'Four Simplification Modes');
  for (const pattern of [/size reduction/i, /backward induction/i, /state compression/i, /algebraic.*geometric re-expression/i]) assert.match(modes, pattern);
  const proof = section(text, 'From Pattern to Proof');
  for (const pattern of [/recurrence.*valid/i, /base cases?/i, /induction hypothesis.*strong enough/i, /tie-breaking/i, /adversarial.*preferences?/i, /resource bounds/i, /worst-case.*average-case/i]) assert.match(proof, pattern);
  const checks = numberedItems(text, 'Interview Checks');
  assert.equal(checks.length, 8);

  const cubeExercise = compact(checks[0]);
  assert.match(cubeExercise, /compute15\^3/i);
  assert.match(cubeExercise, /(?:15=10\+5|\(10\+5\)\^3)/i);

  const recurrenceExercise = compact(checks[1]);
  assert.match(recurrenceExercise, /x_t=2x_\(t-1\)/i);
  assert.match(recurrenceExercise, /x_8=640/i);
  assert.match(checks[1], /one quarter|quarter of/i);
  assert.match(checks[1], /which (?:earlier )?period/i);

  assert.match(checks.join('\n'), /constant width|fall through/i);
});

test('Fermi Knowledge is auditable, range-based, and validation-driven', async () => {
  const { text, metadata } = await page(files.fermi);
  assert.deepEqual(metadata, fermiMetadata);
  const headings = ['Core Idea', 'Define the Estimate', 'Assumption Tree', 'Ranges and Units', 'Sensitivity', 'Independent Cross-Check', 'Validation Plan', 'Common Mistakes', 'Interview Checks'];
  assert.deepEqual(levelTwoHeadings(text), headings);
  assertNonemptySections(text, headings);
  assert.match(section(text, 'Define the Estimate'), /target quantity.*unit.*time horizon.*boundary/i);
  assert.match(section(text, 'Assumption Tree'), /multiplicative assumption tree/i);
  const ranges = section(text, 'Ranges and Units');
  for (const pattern of [/low.*base.*high/i, /stock.*flow/i]) assert.match(ranges, pattern);
  assert.match(section(text, 'Sensitivity'), /rank.*assumptions.*sensitivity/i);
  const crossCheck = section(text, 'Independent Cross-Check');
  for (const pattern of [/independent.*cross-check/i, /reconcile disagreement/i]) assert.match(crossCheck, pattern);
  const validation = section(text, 'Validation Plan');
  for (const pattern of [/authoritative|first-party/i, /current-data/i, /observation.*reduce uncertainty/i, /assumption.*replace first/i]) assert.match(validation, pattern);
  const mistakes = section(text, 'Common Mistakes');
  for (const pattern of [/memorized answers/i, /false precision/i]) assert.match(mistakes, pattern);
  const checks = numberedItems(text, 'Interview Checks');
  assert.equal(checks.length, 6);

  const locationExercise = checks.find((item) => /estimate how many.*locations?/i.test(item));
  assert.ok(locationExercise, 'location-count exercise must ask for an estimate');
  for (const pattern of [/geographic boundary/i, /target unit/i, /low.*base.*high/i, /per .*year/i, /location range/i]) {
    assert.match(locationExercise, pattern);
  }

  const providerExercise = checks.find((item) => /estimate how many specialized.*(?:technicians|providers)/i.test(item));
  assert.ok(providerExercise, 'specialized-provider exercise must ask for an estimate');
  for (const pattern of [/low.*base.*high/i, /demand.*capacity/i, /cross-check/i, /per .*year/i]) {
    assert.match(providerExercise, pattern);
  }
  assert.doesNotMatch(text, /United Kingdom|Oxford|petrol station|piano tuner|12,?000|60 tuners/i);
});

test('both Knowledge pages are source-neutral', async () => {
  for (const path of Object.values(files)) {
    const { text } = await page(path);
    assert.doesNotMatch(text, /Green Book|Red Book|150 Most Frequently Asked|Question 8\.|Question 30|PDF page|source item|source answer/i);
  }
});
