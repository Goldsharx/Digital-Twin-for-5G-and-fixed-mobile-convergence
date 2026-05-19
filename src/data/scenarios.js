export const SCENARIOS = [
  {
    id: 'dt-expansion',
    name: 'Deutsche Telekom Partnership',
    region: 'Germany',
    projectedMetros: [
      { name: 'Berlin', lat: 52.52, lng: 13.405, subs: 180000 },
      { name: 'Munich', lat: 48.14, lng: 11.58, subs: 120000 },
      { name: 'Hamburg', lat: 53.55, lng: 9.99, subs: 95000 },
    ],
    revenueImpact: { annual: 45_000_000, currency: 'EUR' },
    timeline: '2027-2029',
    anLevelTarget: 3,
    description: 'AXON deploys twin for DT fiber-to-the-home in 3 German metros. Orchestrator + CloudCheck + local regulatory compliance.',
  },
  {
    id: 'brightspeed',
    name: 'Brightspeed Expansion',
    region: 'Southeast US',
    projectedMetros: [
      { name: 'Charlotte', lat: 35.23, lng: -80.84, subs: 210000 },
      { name: 'Raleigh', lat: 35.78, lng: -78.64, subs: 145000 },
    ],
    revenueImpact: { annual: 28_000_000, currency: 'USD' },
    timeline: '2027-2028',
    anLevelTarget: 3,
    description: 'Managed twin for Brightspeed\'s fiber overbuild in the Carolinas. XGS-PON + Wi-Fi 7.',
  },
  {
    id: 'telefonica',
    name: 'Telefónica LATAM',
    region: 'Spain & LATAM',
    projectedMetros: [
      { name: 'Madrid', lat: 40.42, lng: -3.70, subs: 250000 },
      { name: 'São Paulo', lat: -23.55, lng: -46.63, subs: 180000 },
      { name: 'Mexico City', lat: 19.43, lng: -99.13, subs: 160000 },
    ],
    revenueImpact: { annual: 62_000_000, currency: 'EUR' },
    timeline: '2028-2030',
    anLevelTarget: 4,
    description: 'Full digital twin deployment across Telefónica\'s fiber footprint. Multi-language, multi-regulatory framework.',
  },
  {
    id: 'cassava-africa',
    name: 'Cassava Technologies — Africa',
    region: 'Sub-Saharan Africa',
    projectedMetros: [
      { name: 'Lagos', lat: 6.52, lng: 3.38, subs: 120000 },
      { name: 'Nairobi', lat: -1.29, lng: 36.82, subs: 80000 },
      { name: 'Johannesburg', lat: -26.20, lng: 28.05, subs: 95000 },
    ],
    revenueImpact: { annual: 35_000_000, currency: 'USD' },
    timeline: '2028-2030',
    anLevelTarget: 2,
    description: 'Greenfield fiber twin for emerging markets. Solar-powered COs, satellite backhaul integration.',
  },
  {
    id: 'wifi-acquisition',
    name: 'Wi-Fi Analytics Acquisition',
    region: 'Global',
    projectedMetros: [],
    revenueImpact: { annual: 18_000_000, currency: 'USD' },
    timeline: '2027',
    anLevelTarget: 4,
    description: 'Acquire a Wi-Fi analytics company to own the in-home data layer. CloudCheck becomes the default for 5M+ homes.',
  },
  {
    id: 'enterprise-campus',
    name: 'Enterprise Campus Networks',
    region: 'US Fortune 500',
    projectedMetros: [],
    revenueImpact: { annual: 22_000_000, currency: 'USD' },
    timeline: '2027-2028',
    anLevelTarget: 3,
    description: 'Twin platform adapted for enterprise campus Wi-Fi/5G private networks. Managed service model.',
  },
  {
    id: 'live-event-sim',
    name: 'Live Event Simulation',
    region: 'Germany (DT)',
    projectedMetros: [
      { name: 'Berlin (Stadium)', lat: 52.515, lng: 13.239, subs: 80000 },
      { name: 'Munich (Arena)', lat: 48.219, lng: 11.625, subs: 75000 },
    ],
    revenueImpact: { annual: 8_000_000, currency: 'EUR' },
    timeline: '2027',
    anLevelTarget: 3,
    description: '20M simultaneous HD football streams. Predictive capacity planning, dynamic traffic rerouting, real-time QoE monitoring.',
  },
  {
    id: 'mcp-data-service',
    name: 'MCP Agent API — Data as a Service',
    region: 'Global',
    projectedMetros: [],
    revenueImpact: { annual: 15_000_000, currency: 'USD' },
    timeline: '2028-2030',
    anLevelTarget: 4,
    description: 'Outward-facing MCP endpoints let customer AI systems query AXON data in real-time. Per-query pricing like D&B. Network health, topology, subscriber analytics.',
  },
  {
    id: 'all-wins',
    name: 'All Scenarios Combined',
    region: 'Global',
    projectedMetros: [],
    revenueImpact: { annual: 233_000_000, currency: 'USD' },
    timeline: '2027-2030',
    anLevelTarget: 4,
    description: 'Combined revenue projection if all scenarios execute. $67M → $300M ARR by 2030.',
  },
];

export const KPI_CATEGORIES = {
  save: { label: 'Save Money', color: '#22c55e', icon: '💰' },
  make: { label: 'Make More Money', color: '#3b82f6', icon: '📈' },
  find: { label: 'Find New Money', color: '#8b5cf6', icon: '🔮' },
};

const KPI_CURVES = [
  { id: 'truck-roll', label: 'Truck Roll Reduction', category: 'save', unit: '%', prefix: '', suffix: '%',
    yearly: { 2019: 0, 2022: 5, 2024: 12, 2026: 32, 2028: 48, 2030: 58, 2033: 65, 2035: 70 },
    impactPerPoint: 131_250 },
  { id: 'mttr', label: 'Mean Time to Resolve', category: 'save', unit: '%', prefix: '-', suffix: '%',
    yearly: { 2019: 0, 2022: 8, 2024: 20, 2026: 45, 2028: 62, 2030: 75, 2033: 82, 2035: 88 },
    impactPerPoint: 62_222 },
  { id: 'churn', label: 'Churn Reduction', category: 'make', unit: '%', prefix: '', suffix: '%',
    yearly: { 2019: 0, 2022: 3, 2024: 8, 2026: 18, 2028: 28, 2030: 35, 2033: 42, 2035: 48 },
    impactPerPoint: 338_889 },
  { id: 'upsell', label: 'Upsell Conversion', category: 'make', unit: '%', prefix: '+', suffix: '%',
    yearly: { 2019: 0, 2022: 4, 2024: 10, 2026: 24, 2028: 38, 2030: 52, 2033: 60, 2035: 65 },
    impactPerPoint: 141_667 },
  { id: 'arpu', label: 'ARPU Lift', category: 'make', unit: '$', prefix: '+$', suffix: '/mo',
    yearly: { 2019: 0, 2022: 1, 2024: 3, 2026: 8, 2028: 14, 2030: 20, 2033: 26, 2035: 30 },
    impactPerPoint: 650_000 },
  { id: 'new-market', label: 'New Market Revenue', category: 'find', unit: 'regions', prefix: '', suffix: ' regions',
    yearly: { 2019: 0, 2022: 0, 2024: 1, 2026: 3, 2028: 5, 2030: 8, 2033: 12, 2035: 15 },
    impactPerPoint: 15_000_000 },
  { id: 'platform-license', label: 'Platform Licensing', category: 'find', unit: 'operators', prefix: '', suffix: ' operators',
    yearly: { 2019: 0, 2022: 0, 2024: 1, 2026: 4, 2028: 8, 2030: 15, 2033: 30, 2035: 50 },
    impactPerPoint: 7_000_000 },
  { id: 'data-product', label: 'Data Products', category: 'find', unit: 'feeds', prefix: '', suffix: ' feeds',
    yearly: { 2019: 0, 2022: 0, 2024: 2, 2026: 12, 2028: 24, 2030: 40, 2033: 60, 2035: 80 },
    impactPerPoint: 666_667 },
];

function interpolateYearly(curve, year) {
  const years = Object.keys(curve).map(Number).sort((a, b) => a - b);
  if (year <= years[0]) return curve[years[0]];
  if (year >= years[years.length - 1]) return curve[years[years.length - 1]];
  let lo = years[0], hi = years[years.length - 1];
  for (let i = 0; i < years.length - 1; i++) {
    if (year >= years[i] && year <= years[i + 1]) { lo = years[i]; hi = years[i + 1]; break; }
  }
  const t = (year - lo) / (hi - lo);
  return curve[lo] + t * (curve[hi] - curve[lo]);
}

function fmtImpact(n) {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B/yr`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M/yr`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K/yr`;
  return `$${n}/yr`;
}

export function getKPIsForYear(year) {
  return KPI_CURVES.map((kpi) => {
    const raw = interpolateYearly(kpi.yearly, year);
    const val = kpi.unit === '$' ? Math.round(raw) : Math.round(raw);
    const impact = Math.round(val * kpi.impactPerPoint);
    return {
      id: kpi.id,
      label: kpi.label,
      category: kpi.category,
      value: `${kpi.prefix}${val}${kpi.suffix}`,
      impact: fmtImpact(impact),
      rawImpact: impact,
    };
  });
}

export const KPIS = getKPIsForYear(2026);
