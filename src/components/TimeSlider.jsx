import React from 'react';
import { TIMELINE_RANGE, MILESTONES, getTotalSubscribers } from '../data/timeline.js';

const MILESTONE_COLORS = {
  launch: '#22c55e',
  expansion: '#3b82f6',
  tech: '#8b5cf6',
  platform: '#f97316',
  growth: '#eab308',
  strategy: '#00D4AA',
};

function fmt(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return n.toString();
}

export default function TimeSlider({ year, setYear, playing, setPlaying }) {
  const { start, end } = TIMELINE_RANGE;
  const pct = ((year - start) / (end - start)) * 100;
  const totalSubs = getTotalSubscribers(year);
  const isPast = year < 2026;
  const isFuture = year > 2026;

  return (
    <div className="pointer-events-auto absolute bottom-[2.5rem] left-1/2 z-20 w-[42rem] max-w-[calc(100vw-2rem)] -translate-x-1/2">
      <div className="glass rounded-md px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setPlaying(!playing)}
            className="shrink-0 rounded-sm border border-axon-teal/50 bg-axon-teal/10 px-2 py-1 text-[11px] font-semibold text-axon-teal transition hover:bg-axon-teal/20"
          >
            {playing ? '⏸' : '▶'}
          </button>

          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-baseline justify-between text-[10px]">
              <span className={`font-semibold uppercase tracking-wider ${isPast ? 'text-zinc-400' : isFuture ? 'text-purple-400' : 'text-axon-teal'}`}>
                {isPast ? 'Historical' : isFuture ? 'Projected' : 'Present'}
              </span>
              <span className="font-mono text-zinc-300">
                {fmt(totalSubs)} subscribers
              </span>
            </div>

            <div className="relative h-6">
              <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full transition-all duration-200"
                  style={{
                    width: `${pct}%`,
                    background: isPast
                      ? 'linear-gradient(90deg, #6b7280, #9ca3af)'
                      : isFuture
                      ? 'linear-gradient(90deg, #00D4AA, #8b5cf6)'
                      : '#00D4AA',
                  }}
                />
                <div
                  className="absolute top-1/2 h-[1px] -translate-y-1/2 border-l border-dashed border-white/30"
                  style={{ left: `${((2026 - start) / (end - start)) * 100}%`, height: '16px' }}
                />
              </div>

              {MILESTONES.map((m) => {
                const x = ((m.year - start) / (end - start)) * 100;
                return (
                  <div
                    key={m.year}
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%` }}
                    title={`${m.year}: ${m.label}`}
                  >
                    <div
                      className="h-2 w-2 rounded-full border border-black/40"
                      style={{ backgroundColor: MILESTONE_COLORS[m.type] || '#6b7280' }}
                    />
                  </div>
                );
              })}

              <input
                type="range"
                min={start}
                max={end}
                step={0.5}
                value={year}
                onChange={(e) => setYear(parseFloat(e.target.value))}
                className="absolute inset-0 w-full cursor-pointer opacity-0"
                data-testid="timeline-slider"
              />
            </div>

            <div className="flex justify-between text-[9px] font-mono text-zinc-500">
              <span>{start}</span>
              <span className="text-[12px] font-semibold text-white">{Math.floor(year)}</span>
              <span>{end}</span>
            </div>
          </div>
        </div>

        {MILESTONES.find((m) => m.year === Math.floor(year)) && (
          <div className="mt-1 flex items-center gap-2 text-[10px]">
            <div
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: MILESTONE_COLORS[MILESTONES.find((m) => m.year === Math.floor(year)).type] }}
            />
            <span className="text-zinc-300">{MILESTONES.find((m) => m.year === Math.floor(year)).label}</span>
          </div>
        )}
      </div>
    </div>
  );
}
