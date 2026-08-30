export const omdL2Evidence = {
  slug: 'observable-matrix-dynamics-a-share-long-only',
  stitchedPeriod: {
    start: '2024-01-02',
    end: '2026-06-30',
    label: 'OOS1 → OOS2 Stitched',
    aggregation: 'Equal-weighted daily returns across three independent index sleeves',
  },
  capitalScenarios: [
    {
      key: '100m', label: 'CNY 100m / sleeve', perSleeveCapitalCny: 100_000_000,
      totalNominalCapitalCny: 300_000_000,
      headline: { annualReturn: 0.202245, sharpe: 0.794502, maxDrawdown: -0.224887 },
    },
    {
      key: '500m', label: 'CNY 500m / sleeve', perSleeveCapitalCny: 500_000_000,
      totalNominalCapitalCny: 1_500_000_000,
      headline: { annualReturn: 0.191262, sharpe: 0.760208, maxDrawdown: -0.223963 },
    },
  ],
  indexAnnualReturns: [
    { window: 'OOS1', capitalKey: '100m', csi300: 0.131995, csi500: 0.091906, csi1000: -0.034975, combined: 0.066029 },
    { window: 'OOS1', capitalKey: '500m', csi300: 0.129832, csi500: 0.077466, csi1000: -0.048577, combined: 0.055604 },
    { window: 'OOS2', capitalKey: '100m', csi300: 0.366302, csi500: 0.659642, csi1000: 0.291116, combined: 0.437029 },
    { window: 'OOS2', capitalKey: '500m', csi300: 0.366462, csi500: 0.652143, csi1000: 0.265382, combined: 0.425274 },
  ],
  windowMetrics: [
    { window: 'OOS1', capitalKey: '100m', annualReturn: 0.066029, annualizedVolatility: 0.291345, sharpe: 0.360525, maxDrawdown: -0.224887, calmar: 0.293610 },
    { window: 'OOS1', capitalKey: '500m', annualReturn: 0.055604, annualizedVolatility: 0.292996, sharpe: 0.326627, maxDrawdown: -0.223963, calmar: 0.248272 },
    { window: 'OOS2', capitalKey: '100m', annualReturn: 0.437029, annualizedVolatility: 0.263804, sharpe: 1.507346, maxDrawdown: -0.136323, calmar: 3.205831 },
    { window: 'OOS2', capitalKey: '500m', annualReturn: 0.425274, annualizedVolatility: 0.263531, sharpe: 1.477423, maxDrawdown: -0.136298, calmar: 3.120187 },
  ],
  benchmarkComparisons: [
    { window: 'OOS1', capitalKey: '100m', strategy: 0.066029, officialIndex: 0.076142, pitEqualWeight: 0.091398 },
    { window: 'OOS1', capitalKey: '500m', strategy: 0.055604, officialIndex: 0.076142, pitEqualWeight: 0.091060 },
    { window: 'OOS2', capitalKey: '100m', strategy: 0.437029, officialIndex: 0.410000, pitEqualWeight: 0.236805 },
    { window: 'OOS2', capitalKey: '500m', strategy: 0.425274, officialIndex: 0.410000, pitEqualWeight: 0.235367 },
  ],
  execution: [
    { window: 'OOS1', capitalKey: '100m', annualizedTwoWayTurnoverSum: 45.528167, transactionCostCny: 10_118_311.298726 },
    { window: 'OOS1', capitalKey: '500m', annualizedTwoWayTurnoverSum: 45.557882, transactionCostCny: 53_384_924.064894 },
    { window: 'OOS2', capitalKey: '100m', annualizedTwoWayTurnoverSum: 40.505387, transactionCostCny: 6_694_766.140638 },
    { window: 'OOS2', capitalKey: '500m', annualizedTwoWayTurnoverSum: 40.533973, transactionCostCny: 35_174_081.290995 },
  ],
  capacity: {
    advParticipationCap: 0.10,
    note: 'Capacity is index- and trade-dependent; no single live-capacity guarantee is reported.',
  },
} as const;

export type OmdL2Evidence = typeof omdL2Evidence;
