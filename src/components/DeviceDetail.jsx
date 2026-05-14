import React from 'react';
import SourceBadge from './SourceBadge.jsx';
import { STATUS_COLORS } from '../data/constants.js';
import { interpolateGrowth } from '../data/timeline.js';
import { useHomeNetwork } from '../hooks/useGeneratedData.js';
import { getAlgorithmsForScope, getAgentsForScope } from '../data/algorithms.js';

function fmt(n) {
  return typeof n === 'number' ? n.toLocaleString('en-US') : n;
}

function Field({ label, value, source, missing = false, showSources = true, mono = true }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-white/5 py-1.5">
      <div className="text-[10.5px] uppercase tracking-wider text-zinc-400">{label}</div>
      <div className="flex items-center gap-2">
        <div className={`${mono ? 'font-mono' : ''} text-[12px] ${missing ? 'text-zinc-500' : 'text-white'}`}>
          {missing ? '?' : value}
        </div>
        {showSources && source && <SourceBadge platform={source} missing={missing} />}
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const s = STATUS_COLORS[status] || STATUS_COLORS.offline;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
      style={{ backgroundColor: `${s.hex}22`, color: s.hex, border: `1px solid ${s.hex}55` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.hex, boxShadow: `0 0 6px ${s.hex}` }} />
      {s.label}
    </span>
  );
}

function PanelHeader({ kicker, title, subtitle, status, onClose }) {
  return (
    <div className="border-b border-white/10 px-4 pb-3 pt-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-axon-teal">{kicker}</div>
          <div className="mt-0.5 text-base font-semibold text-white">{title}</div>
          {subtitle && <div className="text-[11px] text-zinc-400">{subtitle}</div>}
        </div>
        <div className="flex items-center gap-2">
          {status && <StatusPill status={status} />}
          <button
            onClick={onClose}
            className="rounded-sm border border-white/15 px-2 py-0.5 text-[11px] text-zinc-200 hover:bg-white/10"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

function MetroDetail({ data, onClose, showSources, year }) {
  return (
    <>
      <PanelHeader
        kicker="Metro"
        title={data.name}
        subtitle={`${data.state} · Top plan: ${data.topTier}`}
        status={data.status}
        onClose={onClose}
      />
      <div className="px-4 py-3">
        <Field label="Subscribers" value={fmt(interpolateGrowth(data.id, year) || data.subscriberCount)} source="expresse" showSources={showSources} />
        <Field label="Homes Passed" value={fmt(data.homesPassed || Math.round(interpolateGrowth(data.id, year) * 2.88))} source="inventory" missing={!data.homesPassed && !interpolateGrowth(data.id, year)} showSources={showSources} />
        <Field label="Central Offices" value={data.centralOffices} source="orchestrator" showSources={showSources} />
        <Field label="Top Tier" value={data.topTier} source="expresse" showSources={showSources} />
        <Field label="Status" value={STATUS_COLORS[data.status].label} source="orchestrator" showSources={showSources} />
        <div className="mt-2 text-[10.5px] italic text-zinc-400">
          Double-click the metro pin to drill into central offices.
        </div>
      </div>
    </>
  );
}

function AlgorithmSlots({ scope, phase }) {
  if (phase === 'people') return null;
  const algos = getAlgorithmsForScope(scope);
  if (algos.length === 0) return null;
  const statusColors = { active: 'text-emerald-400', available: 'text-blue-400', 'not-wrapped': 'text-zinc-500' };
  const statusLabels = { active: 'LIVE', available: 'READY', 'not-wrapped': 'RAW' };
  return (
    <div className="mt-3">
      <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        DS Algorithms ({algos.length} / 400+)
      </div>
      <div className="space-y-1">
        {algos.map((a) => (
          <div key={a.id} className="flex items-center justify-between gap-2 rounded-sm bg-white/[0.03] px-2 py-1">
            <span className="truncate text-[10.5px] text-zinc-300">{a.id} {a.name}</span>
            <span className={`text-[9px] font-bold uppercase tracking-wider ${statusColors[a.status]}`}>
              {statusLabels[a.status]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentSlots({ phase }) {
  if (phase !== 'agents') return null;
  const agents = getAgentsForScope();
  const statusColors = { prototype: 'text-purple-400', 'not-built': 'text-zinc-500' };
  return (
    <div className="mt-3">
      <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        AI Agents (5 Engineers)
      </div>
      <div className="space-y-1">
        {agents.map((a) => (
          <div key={a.id} className="flex items-center justify-between gap-2 rounded-sm border border-purple-500/10 bg-purple-500/5 px-2 py-1">
            <div className="min-w-0">
              <div className="truncate text-[10.5px] text-zinc-200">{a.name}</div>
              <div className="truncate text-[9px] text-zinc-500">{a.capability}</div>
            </div>
            <span className={`shrink-0 text-[9px] font-bold uppercase tracking-wider ${statusColors[a.status]}`}>
              {a.status === 'prototype' ? 'PROTO' : 'SLOT'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TowerDetail({ data, onClose, showSources, phase }) {
  return (
    <>
      <PanelHeader
        kicker={`Cell Tower · ${data.type}`}
        title={data.name}
        subtitle={`${data.vendor} ${data.model} · ${data.backhaul}`}
        status={data.status}
        onClose={onClose}
      />
      <div className="px-4 py-3">
        <Field label="Type" value={data.type} source="orchestrator" showSources={showSources} />
        <Field label="Height" value={`${data.heightM} m`} source="orchestrator" showSources={showSources} />
        <Field label="Sectors" value={data.sectors} source="orchestrator" showSources={showSources} />
        <Field label="Active Users" value={fmt(data.activeUsers)} source="orchestrator" showSources={showSources} />
        <Field label="Handovers/hr" value={fmt(data.handoversPerHour)} source="orchestrator" showSources={showSources} />
        <Field label="Backhaul" value={data.backhaul} source="orchestrator" showSources={showSources} />
        <Field label="Vendor" value={data.vendor} source="inventory" showSources={showSources} />
        <Field label="Model" value={data.model} source="inventory" showSources={showSources} />

        <div className="mb-2 mt-4 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
          Radio Units ({data.radios.length})
        </div>
        {data.radios.map((r, i) => (
          <div key={i} className="mb-2 rounded-sm border border-white/5 bg-white/[0.02] px-2.5 py-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-white">{r.band}</span>
              <span className="text-[9px] uppercase text-zinc-400">{r.tech}</span>
            </div>
            <div className="mt-1 grid grid-cols-3 gap-1 text-[10px]">
              <div><span className="text-zinc-500">Range </span><span className="text-zinc-300">{r.range_km} km</span></div>
              <div><span className="text-zinc-500">Users </span><span className="text-zinc-300">{r.activeUsers}</span></div>
              <div><span className="text-zinc-500">Util </span><span className="text-zinc-300">{r.utilizationPct}%</span></div>
            </div>
            <div className="mt-1 text-[10px]">
              <span className="text-zinc-500">Throughput </span><span className="text-zinc-300">{fmt(r.throughputMbps)} Mbps</span>
            </div>
          </div>
        ))}

        <Field label="Mobile Subscriber Link" value="?" source="greenwave" missing showSources={showSources} />
        <Field label="Fixed-Mobile Handover" value="?" source="greenwave" missing showSources={showSources} />

        <AlgorithmSlots scope="metro" phase={phase} />
        <AgentSlots phase={phase} />
      </div>
    </>
  );
}

function CODetail({ data, onClose, showSources, phase }) {
  return (
    <>
      <PanelHeader
        kicker="Central Office"
        title={data.name}
        subtitle={data.address}
        status={data.status}
        onClose={onClose}
      />
      <div className="px-4 py-3">
        <Field label="OLT Count" value={data.oltCount} source="orchestrator" showSources={showSources} />
        <Field label="PON Ports" value={data.ponPorts} source="orchestrator" showSources={showSources} />
        <Field label="Subscribers Served" value={fmt(data.subscribersServed)} source="expresse" showSources={showSources} />
        <Field label="Technology" value={data.technology} source="orchestrator" showSources={showSources} />
        <Field label="Vendor" value={data.vendor} source="inventory" missing showSources={showSources} />
        <Field label="Asset Lifecycle" value="—" source="inventory" missing showSources={showSources} />
        <Field label="Power / Cooling" value="?" source="inventory" missing showSources={showSources} />
        <Field label="Truck Rolls (30d)" value="?" source="inventory" missing showSources={showSources} />

        <AlgorithmSlots scope="co" phase={phase} />
        <AgentSlots phase={phase} />

        <div className="mt-2 text-[10.5px] italic text-zinc-400">
          Double-click to enter the GPON tree.
        </div>
      </div>
    </>
  );
}

function SplitterDetail({ data, onClose, showSources }) {
  return (
    <>
      <PanelHeader
        kicker="GPON Splitter"
        title={`Port ${data.ponPort + 1} · ${data.splitRatio}`}
        subtitle={`${data.neighborhoodName} · ${data.technology}`}
        status={data.status}
        onClose={onClose}
      />
      <div className="px-4 py-3">
        <Field label="Split Ratio" value={data.splitRatio} source="orchestrator" showSources={showSources} />
        <Field label="Active ONTs" value={data.activeOnts} source="orchestrator" showSources={showSources} />
        <Field label="Technology" value={data.technology} source="orchestrator" showSources={showSources} />
        <Field label="Neighborhood" value={data.neighborhoodName} source="inventory" missing showSources={showSources} />
        <Field label="Asset ID" value="—" source="inventory" missing showSources={showSources} />
      </div>
    </>
  );
}

function ONTDetail({ data, onClose, onOpenSubscriber360, showSources, phase }) {
  const home = useHomeNetwork(data);
  const radio6 = home?.gateway.radios.find((r) => r.band === '6 GHz');
  const totalClients = home ? (home.gateway.radios.reduce((s, r) => s + r.clientCount, 0) + home.meshPods.reduce((s, p) => s + p.clientCount, 0)) : 0;
  return (
    <>
      <PanelHeader
        kicker="Subscriber ONT"
        title={data.serial}
        subtitle={`${data.model} · ${data.plan} · ${data.subscriberId}`}
        status={data.status}
        onClose={onClose}
      />
      <div className="px-4 py-3">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">PON Layer</div>
        <Field label="RX Power" value={data.rxPowerDbm !== null ? `${data.rxPowerDbm} dBm` : 'no signal'} source="orchestrator" showSources={showSources} />
        <Field label="TX Power" value={data.txPowerDbm !== null ? `${data.txPowerDbm} dBm` : '—'} source="orchestrator" showSources={showSources} />
        <Field label="Distance from CO" value={`${data.distance_km} km`} source="orchestrator" showSources={showSources} />
        <Field label="Technology" value={data.technology} source="orchestrator" showSources={showSources} />
        <Field label="Firmware" value={data.firmware} source="orchestrator" showSources={showSources} />
        <Field label="Uptime" value={`${Math.floor(data.uptime_hours / 24)}d ${data.uptime_hours % 24}h`} source="orchestrator" showSources={showSources} />

        {home && (
          <>
            <div className="mb-2 mt-4 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Home Wi-Fi (Wi-Fi 7)</div>
            <Field label="Gateway" value={`${home.gateway.model} · ${home.gateway.firmware}`} source="cloudcheck" showSources={showSources} />
            <Field label="Mesh Pods" value={home.meshPods.length} source="cloudcheck" showSources={showSources} />
            <Field label="Connected Clients" value={totalClients} source="cloudcheck" showSources={showSources} />
            <Field label="6 GHz Channel" value={`${radio6.channel} · ${radio6.channelWidth}`} source="cloudcheck" showSources={showSources} />
            <Field label="6 GHz Utilization" value={`${radio6.utilizationPercent}%`} source="cloudcheck" showSources={showSources} />
            <Field label="QoE Score" value={`${home.gateway.qoeScore}/100`} source="cloudcheck" showSources={showSources} />
            <Field label="Self-Healing (7d)" value={home.gateway.selfHealingEvents7d} source="cloudcheck" showSources={showSources} />
          </>
        )}

        <div className="mb-2 mt-4 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Account</div>
        <Field label="Subscriber ID" value={data.subscriberId} source="expresse" showSources={showSources} />
        <Field label="Plan" value={data.plan} source="expresse" showSources={showSources} />
        <Field label="Billing Status" value="?" source="expresse" missing showSources={showSources} />
        <Field label="Mobile Line" value="?" source="greenwave" missing showSources={showSources} />
        <Field label="Handover Events" value="?" source="greenwave" missing showSources={showSources} />
        <Field label="Cell Tower Link" value="?" source="greenwave" missing showSources={showSources} />
        <Field label="Signal Strength" value="?" source="greenwave" missing showSources={showSources} />

        <div className="mb-2 mt-4 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Inventory & Lifecycle</div>
        <Field label="Install Date" value="?" source="inventory" missing showSources={showSources} />
        <Field label="Warranty Exp." value="?" source="inventory" missing showSources={showSources} />
        <Field label="Last Truck Roll" value="?" source="inventory" missing showSources={showSources} />
        <Field label="Asset Tag" value="?" source="inventory" missing showSources={showSources} />

        <AlgorithmSlots scope="ont" phase={phase} />
        <AgentSlots phase={phase} />

        <button
          onClick={onOpenSubscriber360}
          className="mt-4 w-full rounded-sm border border-axon-teal/60 bg-axon-teal/15 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-axon-teal transition hover:bg-axon-teal/25"
        >
          Open Subscriber 360°
        </button>
      </div>
    </>
  );
}

export default function DeviceDetail({ selection, onClose, onOpenSubscriber360, showSources, phase, year }) {
  if (!selection) return null;
  return (
    <div className="absolute right-4 top-[7.5rem] bottom-[5.5rem] z-20 w-[22rem]">
      <div className="glass flex h-full flex-col overflow-y-auto rounded-md">
        {selection.type === 'metro' && <MetroDetail data={selection.data} onClose={onClose} showSources={showSources} year={year} />}
        {selection.type === 'co' && <CODetail data={selection.data} onClose={onClose} showSources={showSources} phase={phase} />}
        {selection.type === 'splitter' && <SplitterDetail data={selection.data} onClose={onClose} showSources={showSources} />}
        {selection.type === 'tower' && <TowerDetail data={selection.data} onClose={onClose} showSources={showSources} phase={phase} />}
        {selection.type === 'ont' && (
          <ONTDetail
            data={selection.data}
            onClose={onClose}
            onOpenSubscriber360={onOpenSubscriber360}
            showSources={showSources}
            phase={phase}
          />
        )}
      </div>
    </div>
  );
}
