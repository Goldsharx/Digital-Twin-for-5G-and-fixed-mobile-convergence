import React from 'react';

function ts(d) {
  const date = d instanceof Date ? d : new Date(d);
  return date.toTimeString().slice(0, 8);
}

const SEVERITY_CHAR = {
  info: '●',
  warning: '⚠',
  critical: '⚠'
};

const SEVERITY_COLOR = {
  info: 'text-status-healthy',
  warning: 'text-status-degraded',
  critical: 'text-status-alarm'
};

export default function EventTicker({ events }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-axon-deep/90 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-1.5">
        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-axon-teal">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-axon-teal" />
          Live Events
        </div>
        <div className="flex-1 overflow-hidden">
          {events.length === 0 ? (
            <div className="ticker-row text-zinc-500">
              [{ts(new Date())}] ● Network telemetry steady — simulation will begin streaming once you enter a metro.
            </div>
          ) : (
            <div className="flex animate-[slide-left_45s_linear_infinite] gap-8">
              {events.slice(0, 12).map((e) => (
                <div key={e.id} className="ticker-row flex shrink-0 gap-2">
                  <span className="text-zinc-500">[{ts(e.ts)}]</span>
                  <span className={SEVERITY_COLOR[e.severity]}>{SEVERITY_CHAR[e.severity]}</span>
                  <span className="text-zinc-200">{e.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
