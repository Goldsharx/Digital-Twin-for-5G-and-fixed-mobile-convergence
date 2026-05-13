import React from 'react';
import { METRO_AGGREGATE } from '../data/metros.js';

function fmt(n) {
  return n.toLocaleString('en-US');
}

export default function StatsBar() {
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
          <div className="text-[10px] uppercase tracking-wider text-zinc-400">
            Reality Canvas · Sprint 0
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-4 top-4 z-20">
        <div className="glass rounded-md px-4 py-2.5">
          <div className="flex gap-5 font-mono text-xs">
            <Stat label="Subscribers" value={fmt(METRO_AGGREGATE.subscribers)} />
            <Stat label="Homes Passed" value={fmt(METRO_AGGREGATE.homesPassed)} />
            <Stat label="Metros" value={METRO_AGGREGATE.metros} />
            <Stat label="Central Offices" value={METRO_AGGREGATE.centralOffices} />
            <Stat label="States" value={16} />
          </div>
        </div>
      </div>
    </>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="text-base font-semibold text-white">{value}</div>
      <div className="text-[9px] uppercase tracking-wider text-zinc-400">{label}</div>
    </div>
  );
}
