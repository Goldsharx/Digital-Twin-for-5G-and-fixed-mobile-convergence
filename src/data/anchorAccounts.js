const ACCOUNT_DATA = [
  {
    id: 'lumen', name: 'Lumen Technologies', region: 'North America',
    lat: 39.7392, lng: -104.9903, platform: 'Full DT', cloud: 'GCP',
    note: 'Largest customer. Full digital twin deployed.', startYear: 2022,
    yearly: { 2022: { rev: 5e6, target: 12e6, subs: '1.2M' }, 2024: { rev: 18e6, target: 28e6, subs: '2.8M' }, 2026: { rev: 28e6, target: 35e6, subs: '4.2M' }, 2028: { rev: 38e6, target: 45e6, subs: '5.8M' }, 2030: { rev: 48e6, target: 55e6, subs: '7.1M' }, 2033: { rev: 62e6, target: 70e6, subs: '9.0M' }, 2035: { rev: 72e6, target: 80e6, subs: '10.5M' } },
  },
  {
    id: 'dt', name: 'Deutsche Telekom', region: 'Europe',
    lat: 50.1109, lng: 8.6821, platform: 'Orchestrator + CloudCheck', cloud: 'On-Prem (Sovereign)',
    note: '10x growth potential. AI sovereignty center.', startYear: 2025,
    yearly: { 2025: { rev: 2e6, target: 10e6, subs: '8M' }, 2026: { rev: 8e6, target: 18e6, subs: '28M' }, 2028: { rev: 22e6, target: 35e6, subs: '45M' }, 2030: { rev: 40e6, target: 55e6, subs: '62M' }, 2033: { rev: 65e6, target: 80e6, subs: '85M' }, 2035: { rev: 82e6, target: 95e6, subs: '100M' } },
  },
  {
    id: 'telefonica', name: 'Telefónica', region: 'LATAM + Europe',
    lat: 40.4168, lng: -3.7038, platform: 'Expresse + Orchestrator', cloud: 'GCP',
    note: 'Strong LATAM expansion. PON + DSL.', startYear: 2024,
    yearly: { 2024: { rev: 3e6, target: 8e6, subs: '5M' }, 2026: { rev: 12e6, target: 20e6, subs: '15M' }, 2028: { rev: 24e6, target: 35e6, subs: '28M' }, 2030: { rev: 38e6, target: 50e6, subs: '42M' }, 2033: { rev: 55e6, target: 68e6, subs: '60M' }, 2035: { rev: 68e6, target: 80e6, subs: '75M' } },
  },
  {
    id: 'brightspeed', name: 'Brightspeed', region: 'Southeast US',
    lat: 35.2271, lng: -80.8431, platform: 'CloudCheck', cloud: 'GCP',
    note: 'Fiber overbuild. High growth trajectory.', startYear: 2024,
    yearly: { 2024: { rev: 4e6, target: 8e6, subs: '0.8M' }, 2026: { rev: 10e6, target: 15e6, subs: '2.1M' }, 2028: { rev: 18e6, target: 24e6, subs: '3.5M' }, 2030: { rev: 25e6, target: 32e6, subs: '5.0M' }, 2033: { rev: 35e6, target: 42e6, subs: '6.8M' }, 2035: { rev: 42e6, target: 50e6, subs: '8.0M' } },
  },
  {
    id: 'cassava', name: 'Cassava Technologies', region: 'Africa',
    lat: -1.2921, lng: 36.8219, platform: 'Orchestrator', cloud: 'Bare Metal',
    note: 'Pan-African. 10 countries target.', startYear: 2026,
    yearly: { 2026: { rev: 5e6, target: 12e6, subs: '0.8M' }, 2028: { rev: 12e6, target: 22e6, subs: '3.2M' }, 2030: { rev: 22e6, target: 35e6, subs: '8M' }, 2033: { rev: 40e6, target: 55e6, subs: '18M' }, 2035: { rev: 55e6, target: 70e6, subs: '30M' } },
  },
  {
    id: 'bouygues', name: 'Bouygues Telecom', region: 'France',
    lat: 48.8566, lng: 2.3522, platform: 'Orchestrator', cloud: 'On-Prem',
    note: 'Major French operator. Broadband focus.', startYear: 2025,
    yearly: { 2025: { rev: 1e6, target: 5e6, subs: '4M' }, 2026: { rev: 4e6, target: 8e6, subs: '12M' }, 2028: { rev: 10e6, target: 16e6, subs: '18M' }, 2030: { rev: 18e6, target: 25e6, subs: '22M' }, 2033: { rev: 28e6, target: 38e6, subs: '28M' }, 2035: { rev: 35e6, target: 45e6, subs: '32M' } },
  },
];

function interpNum(yearly, field, year) {
  const years = Object.keys(yearly).map(Number).sort((a, b) => a - b);
  if (year <= years[0]) return yearly[years[0]][field];
  if (year >= years[years.length - 1]) return yearly[years[years.length - 1]][field];
  let lo = years[0], hi = years[years.length - 1];
  for (let i = 0; i < years.length - 1; i++) {
    if (year >= years[i] && year <= years[i + 1]) { lo = years[i]; hi = years[i + 1]; break; }
  }
  const t = (year - lo) / (hi - lo);
  return yearly[lo][field] + t * (yearly[hi][field] - yearly[lo][field]);
}

function nearestSubs(yearly, year) {
  const years = Object.keys(yearly).map(Number).sort((a, b) => a - b);
  let best = years[0];
  for (const y of years) { if (y <= year) best = y; }
  return yearly[best].subs;
}

export function getAccountsForYear(year) {
  return ACCOUNT_DATA
    .filter((a) => year >= a.startYear)
    .map((a) => {
      const rev = Math.round(interpNum(a.yearly, 'rev', year));
      const target = Math.round(interpNum(a.yearly, 'target', year));
      const pct = target > 0 ? Math.round((rev / target) * 100) : 0;
      let status = 'new';
      if (year >= a.startYear + 3) status = 'growing';
      else if (year >= a.startYear + 1) status = 'expanding';
      return {
        id: a.id, name: a.name, region: a.region, lat: a.lat, lng: a.lng,
        revenue: rev, target, status, platform: a.platform, cloud: a.cloud,
        subscribers: nearestSubs(a.yearly, year), note: a.note, pct,
      };
    });
}

export const ANCHOR_ACCOUNTS = getAccountsForYear(2026);
export const TOTAL_REVENUE = ANCHOR_ACCOUNTS.reduce((s, a) => s + a.revenue, 0);
export const TOTAL_TARGET = ANCHOR_ACCOUNTS.reduce((s, a) => s + a.target, 0);
