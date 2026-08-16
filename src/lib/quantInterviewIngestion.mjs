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
  if (!manifest.sourceFile || typeof manifest.sourceFile !== 'string') {
    throw new Error('Edition-pinned manifests require a source file identity.');
  }

  const ids = new Set();
  let previousEndPage = 0;
  for (const batch of manifest.batches) {
    if (!batch || typeof batch !== 'object') throw new Error('Each ingestion batch must be an object.');
    if (!batch.id || typeof batch.id !== 'string') throw new Error('Each ingestion batch requires an id.');
    if (ids.has(batch.id)) throw new Error(`Duplicate batch id: ${batch.id}`);
    ids.add(batch.id);

    if (!Number.isInteger(batch.startPage) || !Number.isInteger(batch.endPage) || batch.startPage < 1 || batch.endPage < batch.startPage) {
      throw new Error(`Invalid page range for batch ${batch.id}.`);
    }
    if (!batch.sourceSection || typeof batch.sourceSection !== 'string') {
      throw new Error(`Batch ${batch.id} requires sourceSection.`);
    }
    if (batch.startPage <= previousEndPage) {
      throw new Error(`Overlapping or out-of-order page range at batch ${batch.id}.`);
    }
    previousEndPage = batch.endPage;
  }

  if (manifest.ingestionStatus === 'awaiting-source-file' && manifest.batches.length > 0) {
    throw new Error('A manifest with batches cannot remain awaiting-source-file.');
  }

  return true;
}
