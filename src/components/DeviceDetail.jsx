import React from 'react';
import SourceBadge from './SourceBadge.jsx';
import { STATUS_COLORS } from '../data/constants.js';
import { useHomeNetwork } from '../hooks/useGeneratedData.js';

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

function MetroDetail({ data, onClose, showSources }) {
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
        <Field label="Subscribers" value={fmt(data.subscriberCount)} source="expresse" showSources={showSources} />
        <Field label="Homes Passed" value={fmt(data.homesPassed)} source="inventory" missing showSources={showSources} />
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

function CODetail({ data, onClose, showSources }) {
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

function ONTDetail({ data, onClose, onOpenSubscriber360, showSources }) {
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

export default function DeviceDetail({ selection, onClose, onOpenSubscriber360, showSources }) {
  if (!selection) return null;
  return (
    <div className="absolute right-4 top-[7.5rem] bottom-[5.5rem] z-20 w-[22rem]">
      <div className="glass flex h-full flex-col overflow-y-auto rounded-md">
        {selection.type === 'metro' && <MetroDetail data={selection.data} onClose={onClose} showSources={showSources} />}
        {selection.type === 'co' && <CODetail data={selection.data} onClose={onClose} showSources={showSources} />}
        {selection.type === 'splitter' && <SplitterDetail data={selection.data} onClose={onClose} showSources={showSources} />}
        {selection.type === 'ont' && (
          <ONTDetail
            data={selection.data}
            onClose={onClose}
            onOpenSubscriber360={onOpenSubscriber360}
            showSources={showSources}
          />
        )}
      </div>
    </div>
  );
}
