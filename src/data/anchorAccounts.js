export const ANCHOR_ACCOUNTS = [
  {
    id: 'lumen',
    name: 'Lumen Technologies',
    region: 'North America',
    lat: 39.7392,
    lng: -104.9903,
    revenue: 28_000_000,
    target: 35_000_000,
    status: 'growing',
    platform: 'Full DT',
    cloud: 'GCP',
    subscribers: '4.2M',
    note: 'Largest customer. Full digital twin deployed.'
  },
  {
    id: 'dt',
    name: 'Deutsche Telekom',
    region: 'Europe',
    lat: 50.1109,
    lng: 8.6821,
    revenue: 8_000_000,
    target: 18_000_000,
    status: 'expanding',
    platform: 'Orchestrator + CloudCheck',
    cloud: 'On-Prem (Sovereign)',
    subscribers: '28M',
    note: '10x growth potential. AI sovereignty center.'
  },
  {
    id: 'telefonica',
    name: 'Telefónica',
    region: 'LATAM + Europe',
    lat: 40.4168,
    lng: -3.7038,
    revenue: 12_000_000,
    target: 20_000_000,
    status: 'growing',
    platform: 'Expresse + Orchestrator',
    cloud: 'GCP',
    subscribers: '15M',
    note: 'Strong LATAM expansion. PON + DSL.'
  },
  {
    id: 'brightspeed',
    name: 'Brightspeed',
    region: 'Southeast US',
    lat: 35.2271,
    lng: -80.8431,
    revenue: 10_000_000,
    target: 15_000_000,
    status: 'growing',
    platform: 'CloudCheck',
    cloud: 'GCP',
    subscribers: '2.1M',
    note: 'Fiber overbuild. High growth trajectory.'
  },
  {
    id: 'cassava',
    name: 'Cassava Technologies',
    region: 'Africa',
    lat: -1.2921,
    lng: 36.8219,
    revenue: 5_000_000,
    target: 12_000_000,
    status: 'new',
    platform: 'Orchestrator',
    cloud: 'Bare Metal',
    subscribers: '800K',
    note: 'Pan-African. 10 countries target.'
  },
  {
    id: 'bouygues',
    name: 'Bouygues Telecom',
    region: 'France',
    lat: 48.8566,
    lng: 2.3522,
    revenue: 4_000_000,
    target: 8_000_000,
    status: 'expanding',
    platform: 'Orchestrator',
    cloud: 'On-Prem',
    subscribers: '12M',
    note: 'Major French operator. Broadband focus.'
  }
];

export const TOTAL_REVENUE = ANCHOR_ACCOUNTS.reduce((s, a) => s + a.revenue, 0);
export const TOTAL_TARGET = ANCHOR_ACCOUNTS.reduce((s, a) => s + a.target, 0);
