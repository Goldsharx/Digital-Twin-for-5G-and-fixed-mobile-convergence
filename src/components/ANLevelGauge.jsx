import React, { useMemo } from 'react';
import { AN_LEVELS } from '../data/constants.js';

function getCurrentANLevel(year) {
  if (year <= 2020) return 0.5;
  if (year <= 2022) return 1.0;
  if (year <= 2024) return 1.5;
  if (year <= 2025) return 1.8;
  if (year <= 2026) return 2.0;
  if (year <= 2027) return 2.5;
  if (year <= 2028) return 3.0;
  if (year <= 2029) return 3.5;
  return 4.0;
}

function getTargetANLevel(year) {
  if (year <= 2025) return 3;
  if (year <= 2027) return 3;
  if (year <= 2028) return 4;
  return 5;
}

export default function ANLevelGauge({ year }) {
  const current = useMemo(() => getCurrentANLevel(year), [year]);
  const target = useMemo(() => getTargetANLevel(year), [year]);
  const pctCurrent = (current / 5) * 100;
  const pctTarget = (target / 5) * 100;

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
          TM Forum AN Level
        </div>
        <div className="font-mono text-[10px] text-zinc-400">
          L{current.toFixed(1)} → L{target}
        </div>
      </div>
      <div className="relative h-5 w-full">
        <div className="absolute inset-0 flex rounded-full overflow-hidden">
          {[0, 1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className="relative flex-1 border-r border-axon-deep/50 last:border-r-0"
              style={{
                backgroundColor:
                  level < current
                    ? level <= 1
                      ? 'rgba(239,68,68,0.3)'
                      : level <= 2
                        ? 'rgba(234,179,8,0.3)'
                        : 'rgba(34,197,94,0.3)'
                    : 'rgba(255,255,255,0.04)'
              }}
            />
          ))}
        </div>
        <div
          className="absolute top-0 h-full w-0.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.6)]"
          style={{ left: `${pctCurrent}%` }}
        />
        <div
          className="absolute top-0 h-full w-0.5 border-l border-dashed border-axon-teal"
          style={{ left: `${pctTarget}%` }}
        />
        <div className="absolute inset-0 flex">
          {[0, 1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className="flex flex-1 items-center justify-center text-[8px] font-mono text-zinc-500"
            >
              {level}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-1 flex items-center justify-between font-mono text-[9px]">
        <span className="text-zinc-400">
          {AN_LEVELS[Math.floor(current)]?.label}
        </span>
        <span className="flex items-center gap-1 text-axon-teal">
          <span className="inline-block h-px w-2 border-t border-dashed border-axon-teal" />
          Target: {AN_LEVELS[target]?.label}
        </span>
      </div>
    </div>
  );
}
