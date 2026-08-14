import rawCharts from '../reproduction-charts/stock-index-futures-roll-basis-timing.json';

type ChartSeries = { name: string; dash?: boolean; values: number[] };
type RawChart = { title: string; dates: string[]; series: ChartSeries[]; dd: number[] };

const charts = rawCharts as RawChart[];
const cutoff = '2026-06-26';
const oosStart = '2025-10-01';

function trimChart(chart: RawChart | undefined) {
  if (!chart) return null;
  const end = chart.dates.findLastIndex((d) => d <= cutoff);
  const n = end >= 0 ? end + 1 : chart.dates.length;
  return {
    title: chart.title,
    dates: chart.dates.slice(0, n),
    series: chart.series.map((s) => ({ ...s, values: s.values.slice(0, n) })),
    dd: chart.dd.slice(0, n),
  };
}

const rollChart = trimChart(charts.find((c) => c.title.startsWith('IC 滚贴水')));
const arbChart = trimChart(charts.find((c) => c.title.startsWith('IC 跨期套利')));

export const researchNoteData = {
  cutoff: '2026-06-26',
  oosStart: '2025-10-01',
  hero: {
    paper: {
      label: 'Orient Futures',
      annualizedReturn: '13.6%',
      sharpe: '0.58',
      maxDrawdown: '-34.4%',
      benchmarkAnnualized: '12.5%',
      fullSampleImprovement: '+1.10%',
      oosImprovement: '+2.60%',
      switchesPerYear: '4.5',
      provenance: 'Reported by Orient Futures',
    },
    reproduced: {
      label: 'Reproduced',
      annualizedReturn: '12.4%',
      sharpe: '0.62',
      maxDrawdown: '-34.8%',
      benchmarkAnnualized: '11.9%',
      fullSampleImprovement: '+0.50%',
      oosImprovement: '+1.96%',
      switchesPerYear: '4.6',
      provenance: 'Reproduced by Lorien Lab',
    },
    optimized: {
      label: 'Optimized',
      annualizedReturn: '13.2%',
      sharpe: '0.65',
      maxDrawdown: '-34.8%',
      benchmarkAnnualized: '11.9%',
      fullSampleImprovement: '+1.30%',
      oosImprovement: '+5.38%',
      switchesPerYear: '~3.8',
      provenance: 'Optimized by Lorien Lab',
      configuration: 'IC 3-factor + asymmetric Hysteresis 10/5 + deep-discount anchor q=0.15',
    },
  },
  pipeline: {
    primaryFactors: 10,
    secondaryFactors: 55,
    retainedFactors: 7,
    timingMethods: 18,
  },
  factors: [
    { factor: 'IC annualized volatility', paper: -0.35, reproduced: -0.356 },
    { factor: 'IC amplitude', paper: -0.34, reproduced: -0.341 },
    { factor: 'IC ADR', paper: 0.15, reproduced: 0.142 },
    { factor: 'IC dispersion', paper: -0.30, reproduced: -0.302 },
    { factor: 'IM annualized volatility', paper: -0.59, reproduced: -0.594 },
    { factor: 'IM dispersion', paper: -0.19, reproduced: -0.153 },
    { factor: 'IM VIX', paper: -0.59, reproduced: -0.596 },
  ],
  ablations: [
    { name: 'IC 4-factor reproduced baseline', full: '+0.50%', oos: '+1.96%', switches: '4.6', verdict: 'baseline' },
    { name: 'Remove ADR', full: '+0.59%', oos: '+2.57%', switches: '13.8', verdict: 'alpha improves, turnover explodes' },
    { name: '3-factor symmetric Hysteresis 10d', full: '+1.13%', oos: '+4.59%', switches: '3.5', verdict: 'validated' },
    { name: '3-factor asymmetric Hysteresis 10/5', full: '+1.32%', oos: '+4.10%', switches: '4.5', verdict: 'A-G selected' },
    { name: 'Latest: 10/5 + deep-discount anchor q=0.15', full: '+1.30%', oos: '+5.38%', switches: '~3.8', verdict: 'H-M recommended' },
    { name: 'Adaptive confirmation', full: '+0.63%', oos: '+4.19%', switches: '3.3', verdict: 'rejected' },
    { name: 'Factor-level Hysteresis', full: '+0.58%', oos: '—', switches: '—', verdict: 'inferior to aggregate confirmation' },
    { name: 'IM Hysteresis', full: '—', oos: 'negative / worse', switches: 'lower', verdict: 'Negative Control' },
    { name: 'IM+IC 50/50', full: '+1.76%', oos: '+2.41%', switches: '5.5', verdict: 'H-M cross-index improvement' },
  ],
  sensitivity: [
    { window: '5', value: 0.59 },
    { window: '10', value: 1.13 },
    { window: '15', value: 0.42 },
    { window: '20', value: 0.32 },
    { window: '30', value: 0.46 },
  ],
  charts: { roll: rollChart, arb: arbChart },
  sources: {
    code: 'https://github.com/Lorien-LAB/Index-Timing/tree/master/Reproduction03',
    config: 'https://github.com/Lorien-LAB/Index-Timing/blob/master/Reproduction03/configs/repro03.yaml',
    reproduction: 'https://github.com/Lorien-LAB/Index-Timing/blob/master/Reproduction03/doc/reproduction_report.md',
    optimization: 'https://github.com/Lorien-LAB/Index-Timing/blob/master/Reproduction03/doc/optimization_report2_newdirections.md',
  },
} as const;

export type ResearchNoteData = typeof researchNoteData;
