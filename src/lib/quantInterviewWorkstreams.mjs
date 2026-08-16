import { flattenTopics } from './quantInterviewTopics.mjs';

const PILOT_SOURCES = new Set(['green-book', 'red-book', '150-most-frequently-asked']);
const STATUSES = new Set(['planned', 'active', 'complete']);

function requireObject(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object.`);
}

function requireString(value, label) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${label} must be a non-empty string.`);
}

function validateRanges(ranges, label) {
  if (!Array.isArray(ranges) || ranges.length === 0) throw new Error(`${label} requires evidencePageRanges.`);
  let previousEnd = 0;
  for (const [index, range] of ranges.entries()) {
    requireObject(range, `${label} evidence range ${index + 1}`);
    if (!Number.isInteger(range.startPage) || !Number.isInteger(range.endPage) || range.startPage < 1 || range.endPage < range.startPage) {
      throw new Error(`${label} has invalid evidence range ${index + 1}.`);
    }
    if (range.startPage <= previousEnd) throw new Error(`${label} evidence ranges must be sorted and non-overlapping within the source scope.`);
    previousEnd = range.endPage;
  }
}

export function validateTopicWorkstream(workstream, context) {
  requireObject(workstream, 'Topic workstream');
  requireObject(context, 'Topic workstream context');
  requireString(workstream.id, 'Topic workstream id');
  if (!STATUSES.has(workstream.status)) throw new Error(`Invalid topic workstream status: ${workstream.status}`);
  if (!Array.isArray(workstream.canonicalTopics) || workstream.canonicalTopics.length === 0) throw new Error('Topic workstream requires canonicalTopics.');
  if (!Array.isArray(workstream.sourceScopes) || workstream.sourceScopes.length === 0) throw new Error('Topic workstream requires sourceScopes.');

  const topicIds = new Set(flattenTopics(context.taxonomy).map((topic) => topic.id));
  for (const topic of workstream.canonicalTopics) {
    if (!topicIds.has(topic)) throw new Error(`Unknown canonical topic in workstream: ${topic}`);
  }

  const mapEntries = context.sourceTopicMap?.entries;
  if (!Array.isArray(mapEntries)) throw new Error('Topic workstream context requires sourceTopicMap entries.');
  const mapByKey = new Map(mapEntries.map((entry) => [`${entry.source}::${entry.sourceSection}`, entry]));
  const workstreamTopics = new Set(workstream.canonicalTopics);
  const seenSources = new Set();

  for (const scope of workstream.sourceScopes) {
    requireObject(scope, 'Topic workstream source scope');
    requireString(scope.source, 'Topic workstream source');
    if (seenSources.has(scope.source)) throw new Error(`Duplicate source scope in workstream: ${scope.source}`);
    seenSources.add(scope.source);

    const manifest = context.manifests?.[scope.source];
    if (!manifest) throw new Error(`Unknown source in workstream: ${scope.source}`);
    if (manifest.editionStatus !== 'edition-pinned' || !manifest.sourceFile) {
      throw new Error(`Unverified source in workstream: ${scope.source}`);
    }
    if (!Array.isArray(scope.sourceSections) || scope.sourceSections.length === 0) throw new Error(`Source scope ${scope.source} requires sourceSections.`);

    for (const section of scope.sourceSections) {
      requireString(section, `Source section for ${scope.source}`);
      const entry = mapByKey.get(`${scope.source}::${section}`);
      if (!entry) throw new Error(`Source section absent from source-topic map: ${scope.source} ${section}`);
      if (!entry.canonicalTopics?.some((topic) => workstreamTopics.has(topic))) {
        throw new Error(`Source section has no topic intersection with workstream: ${scope.source} ${section}`);
      }
    }

    validateRanges(scope.evidencePageRanges, `Source scope ${scope.source}`);
  }

  if (workstream.id === 'linear-algebra-covariance-correlation-psd-001') {
    for (const source of PILOT_SOURCES) {
      if (!seenSources.has(source)) throw new Error(`First pilot workstream requires verified source: ${source}`);
    }
  }

  return true;
}
