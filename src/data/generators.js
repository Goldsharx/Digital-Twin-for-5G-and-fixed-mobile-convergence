import { NEIGHBORHOODS } from './neighborhoods.js';

// Deterministic pseudo-random generator so re-generation stays stable per CO.
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

function rangeFn(rand) {
  return (min, max) => min + rand() * (max - min);
}

function hexFn(rand) {
  return (len) =>
    Array.from({ length: len }, () => Math.floor(rand() * 16).toString(16)).join('');
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

function randomMAC(rand) {
  return Array.from({ length: 6 }, () =>
    Math.floor(rand() * 256).toString(16).padStart(2, '0')
  ).join(':');
}

/**
 * Generate the GPON tree (splitters + ONTs) under a CO. Deterministic per CO id.
 * Caps port count to keep performance reasonable while still feeling dense.
 */
export function generateGPONTree(co, opts = {}) {
  const seed = hashSeed(co.id);
  const rand = mulberry32(seed);
  const rng = rangeFn(rand);

  const neighborhood = NEIGHBORHOODS[co.id] || {
    name: co.name,
    north: co.lat + 0.005,
    south: co.lat - 0.005,
    east: co.lng + 0.005,
    west: co.lng - 0.005
  };

  const splitters = [];
  const onts = [];

  const maxPorts = opts.maxPorts ?? 8;
  const portsToGenerate = Math.min(co.ponPorts, maxPorts);

  for (let p = 0; p < portsToGenerate; p++) {
    const splitRatio = co.technology.includes('XGS-PON') && p % 2 === 0 ? 64 : 32;
    const splitterId = `${co.id}-spl-${p}`;

    const splitterLat = rng(neighborhood.south, neighborhood.north);
    const splitterLng = rng(neighborhood.west, neighborhood.east);

    const ontCount = Math.max(
      4,
      Math.floor(splitRatio * rng(0.6, 0.95))
    );

    const splitterStatus = weighted(rand, ['healthy', 'degraded', 'alarm'], [0.88, 0.08, 0.04]);

    splitters.push({
      id: splitterId,
      coId: co.id,
      metroId: co.metroId,
      neighborhoodName: neighborhood.name,
      ponPort: p,
      lat: splitterLat,
      lng: splitterLng,
      splitRatio: `1:${splitRatio}`,
      technology: splitRatio === 64 ? 'XGS-PON' : 'GPON',
      activeOnts: ontCount,
      status: splitterStatus
    });

    for (let o = 0; o < ontCount; o++) {
      const ontLat = splitterLat + rng(-0.0035, 0.0035);
      const ontLng = splitterLng + rng(-0.0035, 0.0035);
      const ontStatus = weighted(
        rand,
        ['healthy', 'degraded', 'alarm', 'offline'],
        [0.92, 0.05, 0.02, 0.01]
      );
      const rxPower =
        ontStatus === 'healthy'
          ? rng(-22, -14)
          : ontStatus === 'degraded'
            ? rng(-26, -22)
            : ontStatus === 'alarm'
              ? rng(-30, -26)
              : null;

      const txPower = rxPower !== null ? rxPower + rng(3, 6) : null;

      onts.push({
        id: `${splitterId}-ont-${o}`,
        splitterId,
        coId: co.id,
        metroId: co.metroId,
        neighborhoodName: neighborhood.name,
        serial: `QFBR${hexFn(rand)(8).toUpperCase()}`,
        model: weighted(rand, ['Q1000K', 'Nokia XS-2426G-A', 'Adtran SDX-622v'], [0.7, 0.2, 0.1]),
        lat: ontLat,
        lng: ontLng,
        rxPowerDbm: rxPower !== null ? Number(rxPower.toFixed(1)) : null,
        txPowerDbm: txPower !== null ? Number(txPower.toFixed(1)) : null,
        distance_km: Number(rng(0.3, 12).toFixed(1)),
        firmware: weighted(rand, ['4.2.1', '4.1.8', '3.9.14', '3.8.2'], [0.4, 0.3, 0.2, 0.1]),
        uptime_hours: Math.floor(rng(24, 8760)),
        status: ontStatus,
        subscriberId: `SUB-${hexFn(rand)(6).toUpperCase()}`,
        technology: splitRatio === 64 ? 'XGS-PON' : 'GPON',
        plan: weighted(
          rand,
          ['200 Mbps', '500 Mbps', '940 Mbps', '2 Gbps', '5 Gbps', '8 Gbps'],
          [0.10, 0.15, 0.40, 0.20, 0.10, 0.05]
        )
      });
    }
  }

  return { splitters, onts, neighborhood };
}

/**
 * Generate a deterministic home network for a given ONT.
 */
export function generateHomeNetwork(ont) {
  const seed = hashSeed(ont.id);
  const rand = mulberry32(seed);
  const rng = rangeFn(rand);

  const gatewayId = `gw-${ont.id}`;
  const meshPodCount = weighted(rand, [0, 1, 2, 3], [0.25, 0.35, 0.3, 0.1]);

  const gateway = {
    id: gatewayId,
    ontId: ont.id,
    model: 'W1700K',
    mac: randomMAC(rand),
    firmware: weighted(rand, ['2.4.1-qf', '2.3.8-qf', '2.2.5-qf'], [0.5, 0.35, 0.15]),
    cpuPercent: Math.floor(rng(8, 65)),
    memPercent: Math.floor(rng(30, 80)),
    uptimeHours: Math.floor(rng(24, 4380)),
    wanThroughputMbps: Math.floor(rng(50, 940)),
    lat: ont.lat + rng(-0.00018, 0.00018),
    lng: ont.lng + rng(-0.00018, 0.00018),
    status: ont.status,
    qoeScore: Math.floor(rng(72, 98)),
    selfHealingEvents7d: Math.floor(rng(0, 6)),
    radios: [
      {
        id: `${gatewayId}-radio-2g`,
        band: '2.4 GHz',
        channel: weighted(rand, [1, 6, 11], [0.33, 0.34, 0.33]),
        channelWidth: '40 MHz',
        txPowerDbm: 20,
        utilizationPercent: Math.floor(rng(10, 60)),
        noiseFloorDbm: Math.floor(rng(-95, -85)),
        standard: 'Wi-Fi 7 (BE)',
        clientCount: Math.floor(rng(2, 12))
      },
      {
        id: `${gatewayId}-radio-5g`,
        band: '5 GHz',
        channel: weighted(rand, [36, 40, 44, 48, 149, 153, 157, 161], Array(8).fill(0.125)),
        channelWidth: '160 MHz',
        txPowerDbm: 23,
        utilizationPercent: Math.floor(rng(15, 70)),
        noiseFloorDbm: Math.floor(rng(-98, -90)),
        standard: 'Wi-Fi 7 (BE)',
        clientCount: Math.floor(rng(3, 15))
      },
      {
        id: `${gatewayId}-radio-6g`,
        band: '6 GHz',
        channel: weighted(rand, [1, 5, 9, 13, 37, 41, 45, 49], Array(8).fill(0.125)),
        channelWidth: '320 MHz',
        txPowerDbm: 24,
        utilizationPercent: Math.floor(rng(5, 40)),
        noiseFloorDbm: Math.floor(rng(-100, -92)),
        standard: 'Wi-Fi 7 (BE)',
        afcStatus: 'Standard Power',
        clientCount: Math.floor(rng(1, 8))
      }
    ]
  };

  const meshPods = Array.from({ length: meshPodCount }, (_, i) => ({
    id: `${gatewayId}-mesh-${i}`,
    gatewayId,
    model: '360 WiFi Pod',
    mac: randomMAC(rand),
    lat: ont.lat + rng(-0.0003, 0.0003),
    lng: ont.lng + rng(-0.0003, 0.0003),
    backhaulRssi: Math.floor(rng(-65, -35)),
    backhaulBand: weighted(rand, ['5 GHz', '6 GHz'], [0.4, 0.6]),
    clientCount: Math.floor(rng(1, 6)),
    status: weighted(rand, ['healthy', 'degraded'], [0.85, 0.15])
  }));

  const clientVendors = [
    { oui: 'Apple', weight: 0.30 },
    { oui: 'Samsung', weight: 0.20 },
    { oui: 'Google', weight: 0.10 },
    { oui: 'Amazon', weight: 0.10 },
    { oui: 'Roku', weight: 0.08 },
    { oui: 'Sonos', weight: 0.05 },
    { oui: 'HP', weight: 0.05 },
    { oui: 'Dell', weight: 0.05 },
    { oui: 'Ring', weight: 0.04 },
    { oui: 'Nest', weight: 0.03 }
  ];

  const podClientTotal = meshPods.reduce((s, p) => s + p.clientCount, 0);
  const gwClientTotal = gateway.radios.reduce((s, r) => s + r.clientCount, 0);
  const totalClients = gwClientTotal + podClientTotal;

  const apIds = [gatewayId, ...meshPods.map((p) => p.id)];

  const clients = Array.from({ length: totalClients }, (_, i) => ({
    id: `${gatewayId}-client-${i}`,
    mac: randomMAC(rand),
    vendor: weighted(rand, clientVendors.map((v) => v.oui), clientVendors.map((v) => v.weight)),
    deviceType: weighted(
      rand,
      ['Phone', 'Laptop', 'Tablet', 'Smart TV', 'Smart Speaker', 'IoT Sensor', 'Gaming Console', 'Security Camera'],
      [0.25, 0.20, 0.10, 0.15, 0.08, 0.08, 0.07, 0.07]
    ),
    connectedTo: apIds[Math.floor(rand() * apIds.length)],
    band: weighted(rand, ['2.4 GHz', '5 GHz', '6 GHz'], [0.25, 0.45, 0.30]),
    rssi: Math.floor(rng(-80, -30)),
    mcs: Math.floor(rng(0, 13)),
    txRateMbps: Math.floor(rng(20, 2400)),
    rxRateMbps: Math.floor(rng(20, 2400)),
    connectTimeMinutes: Math.floor(rng(5, 1440))
  }));

  return { gateway, meshPods, clients };
}
