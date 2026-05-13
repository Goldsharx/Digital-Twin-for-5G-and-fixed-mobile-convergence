export const STATUS_COLORS = {
  healthy: { cesium: 'LIME', hex: '#22c55e', label: 'Healthy' },
  degraded: { cesium: 'GOLD', hex: '#eab308', label: 'Degraded' },
  alarm: { cesium: 'RED', hex: '#ef4444', label: 'Alarm' },
  offline: { cesium: 'GRAY', hex: '#6b7280', label: 'Offline' }
};

export const STATUS_ORDER = ['healthy', 'degraded', 'alarm', 'offline'];

export function worstStatus(statuses) {
  let worst = 'healthy';
  for (const s of statuses) {
    if (STATUS_ORDER.indexOf(s) > STATUS_ORDER.indexOf(worst)) worst = s;
  }
  return worst;
}

export const PLATFORMS = {
  orchestrator: { name: 'AXON Orchestrator', short: 'Orchestrator', color: '#3b82f6', db: 'MongoDB' },
  cloudcheck: { name: 'CloudCheck', short: 'CloudCheck', color: '#8b5cf6', db: 'MongoDB' },
  expresse: { name: 'Expresse', short: 'Expresse', color: '#f97316', db: 'Oracle' },
  greenwave: { name: 'Greenwave Mobile', short: 'Greenwave', color: '#06b6d4', db: 'Proprietary' },
  inventory: { name: 'Inventory', short: 'Inventory', color: '#84cc16', db: 'New Build' },
  unified: { name: 'Unified Twin', short: 'Unified Twin', color: '#22c55e', db: 'Knowledge Graph' }
};

export const CAMERA_VIEWS = {
  planet: { lat: 39.0, lng: -98.0, height: 8_000_000 },
  denver: { lat: 39.74, lng: -104.99, height: 80_000 },
  slc: { lat: 40.76, lng: -111.89, height: 60_000 },
  minneapolis: { lat: 44.98, lng: -93.27, height: 70_000 },
  seattle: { lat: 47.61, lng: -122.33, height: 60_000 },
  omaha: { lat: 41.26, lng: -95.93, height: 50_000 }
};

// Camera height thresholds → zoom level label
export function heightToZoomLevel(height) {
  if (height > 5_000_000) return 'planet';
  if (height > 200_000) return 'metro';
  if (height > 20_000) return 'city';
  if (height > 2_000) return 'neighborhood';
  return 'building';
}
