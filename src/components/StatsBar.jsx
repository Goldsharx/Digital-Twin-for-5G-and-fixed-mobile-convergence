import React from 'react';
import { METROS } from '../data/metros.js';
import { getTotalSubscribers, getActiveMetroCount, getActiveMetroIds } from '../data/timeline.js';
import PhaseToggle from './PhaseToggle.jsx';

function fmt(n) {
  return n.toLocaleString('en-US');
}

export default function StatsBar({ phase, setPhase, year }) {
  const subs = getTotalSubscribers(year);
  const isPast = year < 2026;
  const isFuture = year > 2026;
  const activeIds = getActiveMetroIds(year);
  const activeCOs = METROS.filter((m) => activeIds.includes(m.id)).reduce((sum, m) => sum + (m.centralOffices || 0), 0);

  return (
    <>
      <div className="pointer-events-none absolute left-4 top-4 z-20">
        <div className="glass rounded-md px-4 py-2.5">
          <div className="flex items-center gap-2 text-axon-teal">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-widest">AXON Networks</span>
          </div>
          <div className="mt-0.5 text-lg font-semibold leading-tight">
            Quantum Fiber Digital Twin
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-zinc-400">
              Reality Canvas · Sprint 0
            </span>
            {year !== 2026 && (
              <span className={`rounded-sm px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
                isPast ? 'bg-zinc-700/50 text-zinc-400' : 'bg-purple-500/20 text-purple-400'
              }`}>
                {Math.floor(year)} {isPast ? 'Historical' : 'Projected'}
              </span>
            )}
          </div>
        </div>
        <div className="mt-2">
          <PhaseToggle phase={phase} setPhase={setPhase} />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-[4.5rem] left-1/2 z-20 -translate-x-1/2">
        <div className="glass rounded-md px-4 py-2">
          <div className="flex gap-5 font-mono text-xs">
            <Stat label="Subscribers" value={fmt(subs)} highlight={isFuture} />
            <Stat label="Homes Passed" value={fmt(Math.round(subs * 2.88))} highlight={isFuture} />
            <Stat label="Metros" value={getActiveMetroCount(year)} highlight={isFuture} />
            <Stat label="Central Offices" value={activeCOs} highlight={isFuture} />
            <Stat label="States" value={16} />
          </div>
        </div>
      </div>
    </>
  );
}

function Stat({ label, value, highlight }) {
  return (
    <div>
      <div className={`text-base font-semibold ${highlight ? 'text-purple-300' : 'text-white'}`}>{value}</div>
      <div className="text-[9px] uppercase tracking-wider text-zinc-400">{label}</div>
    </div>
  );
}
