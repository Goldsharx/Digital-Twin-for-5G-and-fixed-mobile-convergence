import React, { useState } from 'react';
import { KPIS, KPI_CATEGORIES, SCENARIOS } from '../data/scenarios.js';

function KPICard({ kpi }) {
  const cat = KPI_CATEGORIES[kpi.category];
  return (
    <div className="flex items-center justify-between gap-2 rounded-sm border border-white/5 bg-white/[0.02] px-2.5 py-1.5">
      <div className="min-w-0">
        <div className="truncate text-[10.5px] text-zinc-300">{kpi.label}</div>
        <div className="text-[9px] text-zinc-500">{cat.label}</div>
      </div>
      <div className="text-right">
        <div className="text-[11px] font-semibold" style={{ color: cat.color }}>{kpi.value}</div>
        <div className="text-[9px] text-zinc-400">{kpi.impact}</div>
      </div>
    </div>
  );
}

function ScenarioCard({ scenario, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-sm border px-2.5 py-1.5 text-left transition ${
        selected
          ? 'border-axon-teal/50 bg-axon-teal/10'
          : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05]'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10.5px] font-semibold text-zinc-200">{scenario.name}</span>
        <span className="text-[9px] text-zinc-400">{scenario.timeline}</span>
      </div>
      <div className="mt-0.5 flex items-center justify-between">
        <span className="text-[9px] text-zinc-500">{scenario.region}</span>
        <span className="text-[10px] font-mono font-semibold text-emerald-400">
          +${(scenario.revenueImpact.annual / 1_000_000).toFixed(0)}M/yr
        </span>
      </div>
    </button>
  );
}

export default function KPIPanel({ year, visible, onClose, activeScenario, setActiveScenario }) {
  const [tab, setTab] = useState('kpis');

  if (!visible) return null;

  const isPast = year < 2026;
  const grouped = { save: [], make: [], find: [] };
  for (const k of KPIS) grouped[k.category].push(k);

  return (
    <div className="pointer-events-auto absolute left-4 bottom-[5rem] z-30 w-[20rem]">
      <div className="glass flex max-h-[28rem] flex-col overflow-hidden rounded-md">
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-axon-teal">
            Impact KPIs
          </div>
          <button
            onClick={onClose}
            className="rounded-sm border border-white/15 px-1.5 py-0.5 text-[10px] text-zinc-300 hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        <div className="flex border-b border-white/5">
          {[
            { id: 'kpis', label: 'KPIs' },
            { id: 'scenarios', label: 'Scenarios' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition ${
                tab === t.id ? 'border-b-2 border-axon-teal text-axon-teal' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="overflow-y-auto px-3 py-2">
          {tab === 'kpis' && (
            <>
              {isPast && (
                <div className="mb-2 rounded-sm border border-dashed border-zinc-700 bg-black/20 px-2 py-1.5 text-center text-[10px] text-zinc-500">
                  KPI projections start from 2026
                </div>
              )}
              {Object.entries(KPI_CATEGORIES).map(([key, cat]) => (
                <div key={key} className="mb-3">
                  <div className="mb-1 flex items-center gap-1.5">
                    <span className="text-[10px]">{cat.icon}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: cat.color }}>
                      {cat.label}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {grouped[key].map((k) => (
                      <KPICard key={k.id} kpi={k} />
                    ))}
                  </div>
                </div>
              ))}
              <div className="mt-2 rounded-sm border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-2 text-center">
                <div className="text-[9px] uppercase tracking-wider text-zinc-400">Total Annual Impact</div>
                <div className="text-lg font-bold text-emerald-400">$102.7M</div>
              </div>
            </>
          )}

          {tab === 'scenarios' && (
            <div className="space-y-1.5">
              {SCENARIOS.map((s) => (
                <ScenarioCard
                  key={s.id}
                  scenario={s}
                  selected={activeScenario === s.id}
                  onClick={() => setActiveScenario(activeScenario === s.id ? null : s.id)}
                />
              ))}
              {activeScenario && (
                <div className="mt-2 rounded-sm border border-axon-teal/20 bg-axon-teal/5 px-2.5 py-2 text-[10px] text-zinc-300">
                  {SCENARIOS.find((s) => s.id === activeScenario)?.description}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
