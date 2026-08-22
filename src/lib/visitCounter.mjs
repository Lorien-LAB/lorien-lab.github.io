const GOATCOUNTER_CODE_PATTERN = /^(?:[a-z0-9]|[a-z0-9][a-z0-9-]{0,61}[a-z0-9])$/;

export function getGoatCounterConfig(value) {
  if (typeof value !== 'string') return null;

  const code = value.trim().toLowerCase();
  if (!GOATCOUNTER_CODE_PATTERN.test(code)) return null;

  const origin = `https://${code}.goatcounter.com`;

  return {
    code,
    trackingEndpoint: `${origin}/count`,
    totalEndpoint: `${origin}/counter/TOTAL.json`,
  };
}

export async function fetchTotalVisitCount(fetcher, endpoint) {
  try {
    const response = await fetcher(endpoint, {
      headers: { accept: 'application/json' },
    });
    if (!response.ok) return null;

    const payload = await response.json();
    if (typeof payload.count !== 'string' || payload.count.trim() === '') return null;

    return payload.count.trim();
  } catch {
    return null;
  }
}

export async function hydrateVisitCounters(root, fetcher) {
  for (const counter of root.querySelectorAll('[data-visit-counter]')) {
    const endpoint = counter.dataset.totalEndpoint;
    if (!endpoint) continue;

    const count = await fetchTotalVisitCount(fetcher, endpoint);
    if (count === null) continue;

    for (const value of counter.querySelectorAll('[data-visit-count]')) {
      value.textContent = count;
    }
    counter.hidden = false;
  }
}
