import { NEIGHBORHOODS } from './neighborhoods.js';

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296;
  };
}

function hashSeed(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function weighted(rand, items, weights) {
  const r = rand();
  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    sum += weights[i];
    if (r <= sum) return items[i];
  }
  return items[items.length - 1];
}

const TOWER_TYPES = [
  { type: 'Macro', height_m: 45, sectors: 3, icon: 'tower' },
  { type: 'Small Cell', height_m: 8, sectors: 1, icon: 'smallcell' },
  { type: 'Rooftop', height_m: 25, sectors: 3, icon: 'rooftop' }
];

const RADIO_CONFIGS = [
  { band: 'n71 (600 MHz)', tech: '5G NR', range_km: 14, bw: '20 MHz' },
  { band: 'n41 (2.5 GHz)', tech: '5G NR', range_km: 5, bw: '100 MHz' },
  { band: 'n77 (3.7 GHz)', tech: '5G C-Band', range_km: 2, bw: '100 MHz' },
  { band: 'n258 (mmWave)', tech: '5G mmWave', range_km: 0.3, bw: '400 MHz' },
  { band: 'B2 (1900 MHz)', tech: 'LTE', range_km: 8, bw: '20 MHz' },
  { band: 'B66 (AWS)', tech: 'LTE', range_km: 6, bw: '20 MHz' }
];

export function generateCellTowers(metroId) {
  const seed = hashSeed(`towers-${metroId}`);
  const rand = mulberry32(seed);
  const rng = (min, max) => min + rand() * (max - min);

  const nbKeys = Object.keys(NEIGHBORHOODS).filter(k => {
    const prefix = metroId === 'salt-lake-city' ? 'co-slc' :
                   metroId === 'minneapolis' ? 'co-msp' :
                   metroId === 'seattle' ? 'co-sea' :
                   metroId === 'omaha' ? 'co-omaha' :
                   metroId === 'denver' ? 'co-den' : '';
    return k.startsWith(prefix);
  });

  const towers = [];

  for (const nbKey of nbKeys) {
    const nb = NEIGHBORHOODS[nbKey];
    const count = Math.floor(rng(2, 5));

    for (let i = 0; i < count; i++) {
      const tType = weighted(rand, TOWER_TYPES, [0.5, 0.35, 0.15]);
      const lat = rng(nb.south, nb.north);
      const lng = rng(nb.west, nb.east);
      const status = weighted(rand, ['healthy', 'degraded', 'alarm', 'offline'], [0.88, 0.07, 0.03, 0.02]);

      const radioCount = tType.type === 'Small Cell' ? 1 : Math.floor(rng(2, 4));
      const radios = [];
      const usedBands = new Set();
      for (let r = 0; r < radioCount; r++) {
        let cfg;
        do {
          cfg = RADIO_CONFIGS[Math.floor(rand() * RADIO_CONFIGS.length)];
        } while (usedBands.has(cfg.band) && usedBands.size < RADIO_CONFIGS.length);
        usedBands.add(cfg.band);
        radios.push({
          ...cfg,
          activeUsers: Math.floor(rng(5, 180)),
          throughputMbps: Math.floor(rng(100, 2400)),
          utilizationPct: Math.floor(rng(15, 85))
        });
      }

      towers.push({
        id: `tower-${nbKey}-${i}`,
        metroId,
        neighborhoodName: nb.name,
        name: `${nb.name} ${tType.type} ${i + 1}`,
        type: tType.type,
        heightM: tType.height_m,
        sectors: tType.sectors,
        lat, lng,
        status,
        vendor: weighted(rand, ['Ericsson', 'Nokia', 'Samsung'], [0.45, 0.35, 0.20]),
        model: weighted(rand, ['AIR 6449', 'AirScale mMIMO', 'MT6402'], [0.45, 0.35, 0.20]),
        radios,
        activeUsers: radios.reduce((s, r) => s + r.activeUsers, 0),
        handoversPerHour: Math.floor(rng(20, 300)),
        backhaul: weighted(rand, ['Fiber 10G', 'Fiber 1G', 'Microwave'], [0.6, 0.25, 0.15])
      });
    }
  }

  return towers;
}
