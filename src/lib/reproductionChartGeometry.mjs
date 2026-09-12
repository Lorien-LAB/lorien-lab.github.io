export function chartGeometry(containerWidth) {
  return {
    width: containerWidth,
    navHeight: containerWidth < 600 ? 280 : 360,
    drawdownHeight: 155,
    left: 54,
    right: 18,
    top: 18,
    bottom: 32,
    fontSize: 11,
  };
}

export function dateTickIndices(sampleCount, plotWidth) {
  if (sampleCount < 1) return [];
  if (sampleCount === 1) return [0];
  const count = Math.min(sampleCount, Math.max(2, Math.min(6, Math.floor(plotWidth / 120))));
  return Array.from({ length: count }, (_, index) => Math.round(index * (sampleCount - 1) / (count - 1)));
}

export function nearestPointIndex(pointerX, plotLeft, plotRight, sampleCount) {
  const index = Math.round((pointerX - plotLeft) / (plotRight - plotLeft) * (sampleCount - 1));
  return Math.max(0, Math.min(sampleCount - 1, index));
}
