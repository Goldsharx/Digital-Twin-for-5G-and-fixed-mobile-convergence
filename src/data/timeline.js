export const TIMELINE_RANGE = { start: 2019, end: 2030 };

export const MILESTONES = [
  { year: 2019, label: 'Quantum Fiber launched', type: 'launch' },
  { year: 2020, label: 'Denver metro live', type: 'expansion' },
  { year: 2021, label: 'XGS-PON rollout begins', type: 'tech' },
  { year: 2022, label: 'CloudCheck deployed', type: 'platform' },
  { year: 2023, label: 'Wi-Fi 7 pilot (W1700K)', type: 'tech' },
  { year: 2024, label: '1M subscribers milestone', type: 'growth' },
  { year: 2025, label: 'Digital Twin concept', type: 'strategy' },
  { year: 2026, label: 'Reality Canvas Sprint 0', type: 'strategy' },
  { year: 2027, label: 'AN Level 3 target', type: 'strategy' },
  { year: 2028, label: 'Platform unification complete', type: 'platform' },
  { year: 2029, label: 'AN Level 4 operational', type: 'strategy' },
  { year: 2030, label: 'Full autonomous network', type: 'strategy' },
];

// Subscriber growth curve per metro (interpolated by year)
export const METRO_GROWTH = {
  denver:       { 2019: 120000, 2021: 180000, 2023: 240000, 2026: 285000, 2028: 340000, 2030: 400000 },
  'salt-lake-city': { 2019: 60000, 2021: 90000, 2023: 120000, 2026: 142000, 2028: 180000, 2030: 220000 },
  minneapolis:  { 2019: 80000, 2021: 130000, 2023: 165000, 2026: 198000, 2028: 240000, 2030: 290000 },
  seattle:      { 2020: 40000, 2022: 100000, 2024: 140000, 2026: 167000, 2028: 210000, 2030: 260000 },
  omaha:        { 2021: 30000, 2023: 60000, 2025: 78000, 2026: 89000, 2028: 120000, 2030: 160000 },
  phoenix:      { 2027: 25000, 2028: 80000, 2029: 140000, 2030: 195000 },
  portland:     { 2027: 20000, 2028: 60000, 2029: 95000, 2030: 130000 },
  dallas:       { 2028: 30000, 2029: 110000, 2030: 210000 },
  'kansas-city':{ 2028: 15000, 2029: 55000, 2030: 90000 },
  austin:       { 2029: 20000, 2030: 75000 },
  'las-vegas':  { 2029: 18000, 2030: 65000 },
  'san-antonio':{ 2030: 35000 },
};

export function interpolateGrowth(metroId, year) {
  const curve = METRO_GROWTH[metroId];
  if (!curve) return 0;
  const years = Object.keys(curve).map(Number).sort((a, b) => a - b);
  if (year < years[0]) return 0;
  if (year === years[0]) return curve[years[0]];
  if (year >= years[years.length - 1]) return curve[years[years.length - 1]];
  for (let i = 0; i < years.length - 1; i++) {
    if (year >= years[i] && year <= years[i + 1]) {
      const t = (year - years[i]) / (years[i + 1] - years[i]);
      return Math.round(curve[years[i]] + t * (curve[years[i + 1]] - curve[years[i]]));
    }
  }
  return 0;
}

export function getTotalSubscribers(year) {
  return Object.keys(METRO_GROWTH).reduce((sum, id) => sum + interpolateGrowth(id, year), 0);
}

export function getMetroLaunchYear(metroId) {
  const curve = METRO_GROWTH[metroId];
  if (!curve) return 2019;
  return Math.min(...Object.keys(curve).map(Number));
}

export function getActiveMetroCount(year) {
  return Object.keys(METRO_GROWTH).filter((id) => year >= getMetroLaunchYear(id)).length;
}
