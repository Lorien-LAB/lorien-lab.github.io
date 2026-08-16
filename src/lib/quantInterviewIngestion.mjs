const ALLOWED_EDITION_STATUS = new Set(['work-identified', 'edition-pinned']);
const ALLOWED_INGESTION_STATUS = new Set([
  'awaiting-source-file',
  'manifest-ready',
  'ingesting',
  'complete',
]);

export function validateIngestionManifest(manifest) {
  if (!manifest || typeof manifest !== 'object') throw new Error('Ingestion manifest must be an object.');
  if (!manifest.source || typeof manifest.source !== 'string') throw new Error('Ingestion manifest requires a source slug.');
  if (!manifest.canonicalTitle || typeof manifest.canonicalTitle !== 'string') throw new Error('Ingestion manifest requires canonicalTitle.');
  if (!ALLOWED_EDITION_STATUS.has(manifest.editionStatus)) throw new Error(`Unsupported editionStatus: ${manifest.editionStatus}`);
  if (!ALLOWED_INGESTION_STATUS.has(manifest.ingestionStatus)) throw new Error(`Unsupported ingestionStatus: ${manifest.ingestionStatus}`);
  if (!Array.isArray(manifest.batches)) throw new Error('Ingestion manifest batches must be an array.');

  if (manifest.editionStatus !== 'edition-pinned') {
    if (manifest.batches.length > 0) {
      throw new Error('Pin an exact edition before adding ingestion batches.');
    }
    if (manifest.edition !== null || manifest.isbn !== null || manifest.sourceFile !== null) {
      throw new Error('Work-identified manifests must keep edition-specific fields null until the edition is pinned.');
    }
    return true;
  }

  if (!manifest.edition || typeof manifest.edition !== 'string') {
    throw new Error('Edition-pinned manifests require an exact edition label.');
  }

  const hasSourceFile = typeof manifest.sourceFile === 'string' && manifest.sourceFile.trim().length > 0;
  if (!hasSourceFile) {
    if (manifest.batches.length > 0) {
      throw new Error('A verified source file identity is required before adding ingestion batches.');
    }
    if (manifest.ingestionStatus !== 'awaiting-source-file') {
      throw new Error('Edition-pinned manifests without a source file must remain awaiting-source-file.');
    }
    return true;
  }

  const ids = new Set();
  const ownership = new Set();
  for (const batch of manifest.batches) {
    if (!batch || typeof batch !== 'object') throw new Error('Each ingestion batch must be an object.');
    if (!batch.id || typeof batch.id !== 'string') throw new Error('Each ingestion batch requires an id.');
    if (ids.has(batch.id)) throw new Error(`Duplicate batch id: ${batch.id}`);
    ids.add(batch.id);

    if (!batch.sourceSection || typeof batch.sourceSection !== 'string') {
      throw new Error(`Batch ${batch.id} requires sourceSection.`);
    }
    if (!Array.isArray(batch.expectedProblemScope) || batch.expectedProblemScope.length === 0) {
      throw new Error(`Batch ${batch.id} requires a non-empty expectedProblemScope.`);
    }
    for (const sourceProblem of batch.expectedProblemScope) {
      if (typeof sourceProblem !== 'string' || !sourceProblem.trim()) {
        throw new Error(`Batch ${batch.id} has an invalid source problem identifier.`);
      }
      const key = `${batch.sourceSection}::${sourceProblem}`;
      if (ownership.has(key)) throw new Error(`Duplicate source problem ownership: ${key}`);
      ownership.add(key);
    }

    if (!Array.isArray(batch.evidencePageRanges) || batch.evidencePageRanges.length === 0) {
      throw new Error(`Batch ${batch.id} requires evidencePageRanges.`);
    }
    let previousEnd = 0;
    for (const range of batch.evidencePageRanges) {
      if (!Number.isInteger(range?.startPage) || !Number.isInteger(range?.endPage) || range.startPage < 1 || range.endPage < range.startPage) {
        throw new Error(`Invalid evidence page range for batch ${batch.id}.`);
      }
      if (range.startPage <= previousEnd) {
        throw new Error(`Unsorted or overlapping evidence ranges inside batch ${batch.id}.`);
      }
      previousEnd = range.endPage;
    }
  }

  if (manifest.ingestionStatus === 'awaiting-source-file' && manifest.batches.length > 0) {
    throw new Error('A manifest with batches cannot remain awaiting-source-file.');
  }

  return true;
}
