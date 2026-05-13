import React from 'react';
import SourceBadge from './SourceBadge.jsx';
import { useHomeNetwork } from '../hooks/useGeneratedData.js';
import { STATUS_COLORS } from '../data/constants.js';
import { getAlgorithmsForScope, getAgentsForScope } from '../data/algorithms.js';

function Section({ title, source, missing, children }) {
  return (
    <div className="border-t border-white/5 px-4 py-3 first:border-t-0">
      <div className="mb-2 flex items-center justify-between">
        <div className={`text-[10.5px] font-semibold uppercase tracking-widest ${missing ? 'text-zinc-500' : 'text-zinc-300'}`}>
          {title}
        </div>
        {source && <SourceBadge platform={source} missing={missing} />}
      </div>
      {missing ? (
        <div className="rounded-sm border border-dashed border-zinc-700 bg-black/20 px-3 py-2 text-center font-mono text-[10.5px] uppercase tracking-wider text-zinc-500">
          ┄┄ Not Connected ┄┄
        </div>
      ) : (
        <div className="space-y-1.5 font-mono text-[11.5px] text-zinc-200">{children}</div>
      )}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-zinc-400">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}

function MiniGraphSVG({ ont, gateway, meshPods, clients }) {
  const w = 320, h = 160;
  const nodes = [
    { id: 'sub', label: ont.subscriberId.slice(0, 8), x: 30, y: 80, color: '#f97316' },
    { id: 'svc', label: ont.plan, x: 120, y: 40, color: '#3b82f6' },
    { id: 'ont', label: ont.model, x: 120, y: 120, color: '#22c55e' },
    { id: 'gw', label: 'W1700K', x: 210, y: 80, color: '#00D4AA' },
  ];
  meshPods.forEach((p, i) => {
    nodes.push({ id: `pod${i}`, label: `Pod ${i + 1}`, x: 280, y: 40 + i * 50, color: '#8b5cf6' });
  });
  const edges = [
    ['sub', 'svc'], ['sub', 'ont'], ['ont', 'gw'],
    ...meshPods.map((_, i) => ['gw', `pod${i}`])
  ];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full rounded-sm border border-axon-teal/20 bg-black/30">
      {edges.map(([from, to], i) => {
        const a = nodes.find(n => n.id === from);
        const b = nodes.find(n => n.id === to);
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#00D4AA" strokeWidth="1" strokeOpacity="0.4" />;
      })}
      {nodes.map(n => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r="8" fill={n.color} fillOpacity="0.25" stroke={n.color} strokeWidth="1.5" />
          <circle cx={n.x} cy={n.y} r="3" fill={n.color} />
          <text x={n.x} y={n.y + 18} textAnchor="middle" fill="#a1a1aa" fontSize="7" fontFamily="monospace">{n.label}</text>
        </g>
      ))}
      <text x={w / 2} y={h - 4} textAnchor="middle" fill="#3f3f46" fontSize="6" fontFamily="monospace">
        {clients.length} clients · {meshPods.length} pods · knowledge graph view
      </text>
    </svg>
  );
}

function AlgoSection({ phase }) {
  if (phase === 'people') return null;
  const algos = getAlgorithmsForScope('ont');
  const statusColors = { active: 'text-emerald-400', available: 'text-blue-400', 'not-wrapped': 'text-zinc-500' };
  const statusLabels = { active: 'LIVE', available: 'READY', 'not-wrapped': 'RAW' };
  return (
    <div className="border-t border-white/5 px-4 py-3">
      <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-widest text-zinc-300">
        Applicable Algorithms ({algos.length})
      </div>
      <div className="space-y-1">
        {algos.map(a => (
          <div key={a.id} className="flex items-center justify-between rounded-sm bg-white/[0.03] px-2 py-1 font-mono text-[10.5px]">
            <span className="truncate text-zinc-300">{a.id} {a.name}</span>
            <span className={`shrink-0 text-[9px] font-bold uppercase ${statusColors[a.status]}`}>{statusLabels[a.status]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentSection({ phase }) {
  if (phase !== 'agents') return null;
  const agents = getAgentsForScope();
  return (
    <div className="border-t border-white/5 px-4 py-3">
      <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-widest text-purple-300">
        AI Agents
      </div>
      <div className="space-y-1">
        {agents.map(a => (
          <div key={a.id} className="rounded-sm border border-purple-500/10 bg-purple-500/5 px-2 py-1.5">
            <div className="flex items-center justify-between text-[10.5px]">
              <span className="font-semibold text-zinc-200">{a.name}</span>
              <span className={`text-[9px] font-bold uppercase ${a.status === 'prototype' ? 'text-purple-400' : 'text-zinc-500'}`}>
                {a.status === 'prototype' ? 'PROTO' : 'SLOT'}
              </span>
            </div>
            <div className="text-[9px] text-zinc-500">{a.capability}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Subscriber360({ ont, showSources, phase, onClose }) {
  const home = useHomeNetwork(ont);
  if (!home) return null;
  const { gateway, meshPods, clients } = home;
  const radio6 = gateway.radios.find((r) => r.band === '6 GHz');

  return (
    <div className="absolute right-4 top-[7.5rem] bottom-[5.5rem] z-30 w-[24rem]">
      <div className="glass flex h-full flex-col overflow-y-auto rounded-md">
        <div className="flex items-start justify-between border-b border-white/10 px-4 pb-3 pt-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-axon-teal">
              Subscriber 360°
            </div>
            <div className="mt-0.5 text-base font-semibold text-white">{ont.subscriberId}</div>
            <div className="text-[11px] text-zinc-400">{ont.serial} · {ont.neighborhoodName}</div>
          </div>
          <button
            onClick={onClose}
            className="rounded-sm border border-white/15 px-2 py-0.5 text-[11px] text-zinc-200 hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        <Section title="Fixed Broadband" source="orchestrator">
          <Row label="Plan" value={`Quantum Fiber ${ont.plan}`} />
          <Row label="ONT" value={`${ont.model} (${ont.serial})`} />
          <Row label="RX Power" value={ont.rxPowerDbm !== null ? `${ont.rxPowerDbm} dBm` : 'no signal'} />
          <Row label="Technology" value={ont.technology} />
          <Row label="Uptime" value={`${Math.floor(ont.uptime_hours / 24)} days`} />
        </Section>

        <Section title="Home Wi-Fi" source="cloudcheck">
          <Row label="Gateway" value={`${gateway.model} v${gateway.firmware}`} />
          <Row label="Mesh Pods" value={meshPods.length} />
          <Row label="Clients" value={`${clients.length} connected`} />
          <Row label="6 GHz Channel" value={`${radio6.channel} · ${radio6.channelWidth}`} />
          <Row label="6 GHz Util." value={`${radio6.utilizationPercent}%`} />
          <Row label="QoE Score" value={`${gateway.qoeScore}/100`} />
          <Row label="Self-Healing (7d)" value={gateway.selfHealingEvents7d} />
        </Section>

        <Section title="Analytics" source="expresse">
          <Row label="Avg Throughput (30d)" value="412 Mbps" />
          <Row label="Peak Usage" value="8–10 PM weekdays" />
          <Row label="Support Tickets (90d)" value="0" />
          <Row label="Churn Risk" value="Low" />
        </Section>

        <Section title="Mobile (Fixed-Mobile Convergence)" source="greenwave" missing>
          <div className="space-y-1 text-[10.5px]">
            <Row label="Mobile Line" value="?" />
            <Row label="Cell Tower" value="?" />
            <Row label="Signal (RSRP)" value="?" />
            <Row label="Handover Events" value="?" />
            <Row label="Data Usage (30d)" value="?" />
          </div>
        </Section>

        <Section title="Inventory & Lifecycle" source="inventory" missing>
          <div className="space-y-1 text-[10.5px]">
            <Row label="Install Date" value="?" />
            <Row label="Warranty Exp." value="?" />
            <Row label="Asset Tag" value="?" />
            <Row label="Last Truck Roll" value="?" />
            <Row label="Replacement ETA" value="?" />
          </div>
        </Section>

        <Section title="CRM & Billing" source="expresse" missing>
          <div className="space-y-1 text-[10.5px]">
            <Row label="Billing Status" value="?" />
            <Row label="MRR" value="?" />
            <Row label="Contract End" value="?" />
            <Row label="Support Tier" value="?" />
          </div>
        </Section>

        <AlgoSection phase={phase} />
        <AgentSection phase={phase} />

        <Section title="Graph Twin View" source="unified">
          <MiniGraphSVG ont={ont} gateway={gateway} meshPods={meshPods} clients={clients} />
          <div className="mt-1 text-[10.5px] italic text-zinc-400">
            Every silo's data linked through reality — the unified knowledge graph.
          </div>
          <div className="mt-2 flex gap-2">
            <button className="flex-1 rounded-sm border border-axon-teal/50 bg-axon-teal/10 px-2 py-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-axon-teal">
              Query Agent
            </button>
            <button className="flex-1 rounded-sm border border-axon-blue/50 bg-axon-blue/10 px-2 py-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-axon-blue">
              Analytics
            </button>
          </div>
        </Section>

        <div className="border-t border-white/5 px-4 py-3">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
            Connected Devices ({clients.length})
          </div>
          <div className="mt-2 max-h-40 space-y-1 overflow-y-auto font-mono text-[10.5px]">
            {clients.slice(0, 12).map((c) => (
              <div key={c.id} className="flex items-center justify-between gap-2 text-zinc-300">
                <span className="truncate">{c.vendor} {c.deviceType}</span>
                <span className="text-zinc-500">{c.band} · {c.rssi} dBm</span>
              </div>
            ))}
            {clients.length > 12 && (
              <div className="text-zinc-500">+ {clients.length - 12} more</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
