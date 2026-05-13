import React, { useState } from 'react';

const SQUADS = [
  {
    id: 'proactive-heal',
    name: 'Proactive Heal',
    scope: 'metro',
    agents: ['Anomaly Detector', 'Root Cause Analyzer', 'Auto-Remediate'],
    status: 'active',
    kpi: 'MTTR -45%',
    description: 'Detects degradation patterns before customer impact. Correlates firmware, optical power, and weather data to preemptively dispatch fixes.',
  },
  {
    id: 'churn-shield',
    name: 'Churn Shield',
    scope: 'metro',
    agents: ['Experience Scorer', 'Churn Predictor', 'Retention Offer Engine'],
    status: 'active',
    kpi: 'Churn -18%',
    description: 'Identifies at-risk subscribers from QoE degradation, repeated truck rolls, and billing complaints. Triggers personalized retention flows.',
  },
  {
    id: 'capacity-oracle',
    name: 'Capacity Oracle',
    scope: 'co',
    agents: ['Traffic Forecaster', 'Upgrade Planner', 'Cost Optimizer'],
    status: 'training',
    kpi: 'CapEx -22%',
    description: 'Predicts port exhaustion and bandwidth saturation 90 days ahead. Recommends optimal OLT/splitter upgrades per CO.',
  },
  {
    id: 'field-dispatch',
    name: 'Smart Dispatch',
    scope: 'ont',
    agents: ['Truck Roll Gate', 'Skill Matcher', 'Route Optimizer'],
    status: 'active',
    kpi: 'Truck Roll -32%',
    description: 'Blocks unnecessary truck rolls with remote diagnosis. When dispatch is needed, matches technician skill to fault type and optimizes route.',
  },
  {
    id: 'revenue-radar',
    name: 'Revenue Radar',
    scope: 'metro',
    agents: ['Upsell Identifier', 'Bundle Optimizer', 'Win-Back Agent'],
    status: 'planned',
    kpi: 'ARPU +$8/mo',
    description: 'Detects upsell opportunities from usage patterns. Recommends speed tier upgrades, Wi-Fi pod additions, and premium bundle offers.',
  },
  {
    id: 'stadium-sim',
    name: 'Event Simulator',
    scope: 'metro',
    agents: ['Crowd Predictor', 'Capacity Pre-Loader', 'QoE Guardian'],
    status: 'planned',
    kpi: '20M streams',
    description: 'Simulates live event traffic spikes. Pre-positions CDN capacity, adjusts QoS policies, and monitors real-time stream quality.',
  },
];

const STATUS_STYLE = {
  active: { bg: 'bg-emerald-500/15', border: 'border-emerald-500/40', text: 'text-emerald-400', label: 'Active' },
  training: { bg: 'bg-amber-500/15', border: 'border-amber-500/40', text: 'text-amber-400', label: 'Training' },
  planned: { bg: 'bg-zinc-500/15', border: 'border-zinc-500/40', text: 'text-zinc-400', label: 'Planned' },
};

const SCOPE_LABEL = { ont: 'ONT-level', co: 'CO-level', metro: 'Metro-level' };

function SquadCard({ squad, expanded, onToggle }) {
  const st = STATUS_STYLE[squad.status];
  return (
    <div className={`rounded-sm border ${st.border} ${st.bg} transition`}>
      <button onClick={onToggle} className="w-full px-2.5 py-2 text-left">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-zinc-100">{squad.name}</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-axon-teal">{squad.kpi}</span>
            <span className={`rounded-full px-1.5 py-0.5 text-[8px] font-semibold uppercase ${st.text} ${st.bg}`}>
              {st.label}
            </span>
          </div>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-[9px] text-zinc-500">{SCOPE_LABEL[squad.scope]}</span>
          <span className="text-[9px] text-zinc-600">·</span>
          <span className="text-[9px] text-zinc-500">{squad.agents.length} agents</span>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-white/5 px-2.5 py-2 text-[10px] text-zinc-300">
          <p className="mb-2">{squad.description}</p>
          <div className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500 mb-1">Agent Pipeline</div>
          <div className="flex items-center gap-1">
            {squad.agents.map((a, i) => (
              <React.Fragment key={a}>
                <span className="rounded-sm bg-white/5 border border-white/10 px-1.5 py-0.5 text-[9px] text-zinc-200">
                  {a}
                </span>
                {i < squad.agents.length - 1 && <span className="text-zinc-600">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function NeurosquadPanel({ visible, onClose, phase }) {
  const [expandedId, setExpandedId] = useState(null);

  if (!visible) return null;

  const activeCount = SQUADS.filter((s) => s.status === 'active').length;
  const totalAgents = SQUADS.reduce((sum, s) => sum + s.agents.length, 0);

  return (
    <div className="pointer-events-auto absolute right-4 top-[10rem] z-30 w-[22rem]">
      <div className="glass flex max-h-[32rem] flex-col overflow-hidden rounded-md">
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-purple-400">
              Neurosquads
            </div>
            {phase === 'agents' && (
              <span className="rounded-full bg-purple-500/20 px-1.5 py-0.5 text-[8px] text-purple-300">LIVE</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-sm border border-white/15 px-1.5 py-0.5 text-[10px] text-zinc-300 hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        <div className="border-b border-white/5 px-3 py-2">
          <div className="flex items-center justify-between">
            <div className="text-[10px] text-zinc-400">AI Agent Orchestration Layer</div>
          </div>
          <div className="mt-1.5 grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="font-mono text-sm font-semibold text-emerald-400">{activeCount}</div>
              <div className="text-[8px] text-zinc-500">Active Squads</div>
            </div>
            <div>
              <div className="font-mono text-sm font-semibold text-axon-teal">{totalAgents}</div>
              <div className="text-[8px] text-zinc-500">Total Agents</div>
            </div>
            <div>
              <div className="font-mono text-sm font-semibold text-purple-400">{SQUADS.length}</div>
              <div className="text-[8px] text-zinc-500">Squads</div>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto px-3 py-2 space-y-1.5">
          {SQUADS.map((squad) => (
            <SquadCard
              key={squad.id}
              squad={squad}
              expanded={expandedId === squad.id}
              onToggle={() => setExpandedId(expandedId === squad.id ? null : squad.id)}
            />
          ))}
        </div>

        <div className="border-t border-white/5 px-3 py-2">
          <div className="rounded-sm border border-dashed border-purple-500/30 bg-purple-500/5 p-2 text-center">
            <div className="text-[10px] font-semibold text-purple-400">+ Create New Squad</div>
            <div className="text-[9px] text-zinc-500 mt-0.5">Drag agents from the library to compose a new automation pipeline</div>
          </div>
        </div>
      </div>
    </div>
  );
}
