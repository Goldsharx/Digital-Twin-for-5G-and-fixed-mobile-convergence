export const METROS = [
  {
    id: 'denver',
    name: 'Denver Metro',
    state: 'CO',
    lat: 39.7392,
    lng: -104.9903,
    subscriberCount: 285_000,
    homesPassed: 820_000,
    centralOffices: 12,
    status: 'healthy',
    topTier: '8 Gbps'
  },
  {
    id: 'salt-lake-city',
    name: 'Salt Lake City Metro',
    state: 'UT',
    lat: 40.7608,
    lng: -111.891,
    subscriberCount: 142_000,
    homesPassed: 410_000,
    centralOffices: 8,
    status: 'healthy',
    topTier: '8 Gbps'
  },
  {
    id: 'minneapolis',
    name: 'Minneapolis-St. Paul Metro',
    state: 'MN',
    lat: 44.9778,
    lng: -93.265,
    subscriberCount: 198_000,
    homesPassed: 590_000,
    centralOffices: 10,
    status: 'degraded',
    topTier: '8 Gbps'
  },
  {
    id: 'seattle',
    name: 'Seattle-Bellevue Metro',
    state: 'WA',
    lat: 47.6062,
    lng: -122.3321,
    subscriberCount: 167_000,
    homesPassed: 480_000,
    centralOffices: 9,
    status: 'healthy',
    topTier: '5 Gbps'
  },
  {
    id: 'omaha',
    name: 'Omaha Metro',
    state: 'NE',
    lat: 41.2565,
    lng: -95.9345,
    subscriberCount: 89_000,
    homesPassed: 260_000,
    centralOffices: 5,
    status: 'alarm',
    topTier: '2 Gbps'
  },
  {
    id: 'phoenix',
    name: 'Phoenix Metro',
    state: 'AZ',
    lat: 33.4484,
    lng: -112.0740,
    subscriberCount: 0,
    homesPassed: 0,
    centralOffices: 6,
    status: 'healthy',
    topTier: '8 Gbps'
  },
  {
    id: 'portland',
    name: 'Portland Metro',
    state: 'OR',
    lat: 45.5152,
    lng: -122.6784,
    subscriberCount: 0,
    homesPassed: 0,
    centralOffices: 5,
    status: 'healthy',
    topTier: '5 Gbps'
  },
  {
    id: 'dallas',
    name: 'Dallas-Fort Worth Metro',
    state: 'TX',
    lat: 32.7767,
    lng: -96.7970,
    subscriberCount: 0,
    homesPassed: 0,
    centralOffices: 8,
    status: 'healthy',
    topTier: '8 Gbps'
  },
  {
    id: 'kansas-city',
    name: 'Kansas City Metro',
    state: 'MO',
    lat: 39.0997,
    lng: -94.5786,
    subscriberCount: 0,
    homesPassed: 0,
    centralOffices: 4,
    status: 'healthy',
    topTier: '5 Gbps'
  },
  {
    id: 'austin',
    name: 'Austin Metro',
    state: 'TX',
    lat: 30.2672,
    lng: -97.7431,
    subscriberCount: 0,
    homesPassed: 0,
    centralOffices: 4,
    status: 'healthy',
    topTier: '8 Gbps'
  },
  {
    id: 'las-vegas',
    name: 'Las Vegas Metro',
    state: 'NV',
    lat: 36.1699,
    lng: -115.1398,
    subscriberCount: 0,
    homesPassed: 0,
    centralOffices: 5,
    status: 'healthy',
    topTier: '5 Gbps'
  },
  {
    id: 'san-antonio',
    name: 'San Antonio Metro',
    state: 'TX',
    lat: 29.4241,
    lng: -98.4936,
    subscriberCount: 0,
    homesPassed: 0,
    centralOffices: 4,
    status: 'healthy',
    topTier: '5 Gbps'
  }
];

export const METRO_AGGREGATE = METROS.reduce(
  (acc, m) => ({
    subscribers: acc.subscribers + m.subscriberCount,
    homesPassed: acc.homesPassed + m.homesPassed,
    centralOffices: acc.centralOffices + m.centralOffices,
    metros: acc.metros + 1
  }),
  { subscribers: 0, homesPassed: 0, centralOffices: 0, metros: 0 }
);

export function getMetro(id) {
  return METROS.find((m) => m.id === id);
}
