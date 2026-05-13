import { useEffect, useRef, useState } from 'react';

const STATUSES = ['healthy', 'degraded', 'alarm', 'offline'];
const WEIGHTS = [0.85, 0.08, 0.04, 0.03];

function weightedPick(items, weights) {
  const r = Math.random();
  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    sum += weights[i];
    if (r <= sum) return items[i];
  }
  return items[items.length - 1];
}

function randomInRange(min, max) {
  return min + Math.random() * (max - min);
}

/**
 * Simulates real-time-ish updates on the in-memory ONT collection. Mutates the
 * passed array (it's the same reference held by the generated data cache) and
 * returns an event log that feeds the bottom ticker.
 */
export function useSimulation(onts, enabled = true, intervalMs = 5000) {
  const [tick, setTick] = useState(0);
  const [events, setEvents] = useState([]);
  const tickerRef = useRef(0);

  useEffect(() => {
    if (!enabled || !onts || onts.length === 0) return;

    const interval = setInterval(() => {
      const affectedCount = Math.floor(Math.random() * 3) + 1;
      const newEvents = [];

      for (let i = 0; i < affectedCount; i++) {
        const ont = onts[Math.floor(Math.random() * onts.length)];
        if (!ont) continue;
        const oldStatus = ont.status;
        const newStatus = weightedPick(STATUSES, WEIGHTS);
        if (oldStatus !== newStatus) {
          ont.status = newStatus;
          // Realign optical power with status
          if (newStatus === 'healthy') ont.rxPowerDbm = Number(randomInRange(-22, -14).toFixed(1));
          else if (newStatus === 'degraded') ont.rxPowerDbm = Number(randomInRange(-26, -22).toFixed(1));
          else if (newStatus === 'alarm') ont.rxPowerDbm = Number(randomInRange(-30, -26).toFixed(1));
          else if (newStatus === 'offline') ont.rxPowerDbm = null;

          newEvents.push({
            id: `evt-${Date.now()}-${tickerRef.current++}`,
            ts: new Date(),
            entityId: ont.id,
            entityType: 'ONT',
            entityLabel: ont.serial,
            location: ont.neighborhoodName,
            message: `${ont.serial} in ${ont.neighborhoodName}: ${oldStatus} → ${newStatus}` +
              (ont.rxPowerDbm !== null ? ` (RX ${ont.rxPowerDbm} dBm)` : ''),
            severity: newStatus === 'alarm' ? 'critical' : newStatus === 'degraded' ? 'warning' : newStatus === 'offline' ? 'critical' : 'info'
          });
        }
      }

      // Drift RX power on ~10% of ONTs
      for (let i = 0; i < onts.length; i++) {
        const ont = onts[i];
        if (ont.rxPowerDbm !== null && Math.random() < 0.08) {
          ont.rxPowerDbm = Number((ont.rxPowerDbm + randomInRange(-0.4, 0.4)).toFixed(1));
        }
      }

      if (newEvents.length > 0) {
        setEvents((prev) => [...newEvents, ...prev].slice(0, 60));
      }
      setTick((t) => t + 1);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [onts, enabled, intervalMs]);

  return { tick, events };
}
