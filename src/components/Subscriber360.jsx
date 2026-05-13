import React from 'react';
import SourceBadge from './SourceBadge.jsx';
import { useHomeNetwork } from '../hooks/useGeneratedData.js';
import { STATUS_COLORS } from '../data/constants.js';

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

function GraphAscii() {
  return (
    <pre className="overflow-x-auto rounded-sm border border-axon-teal/30 bg-axon-teal/5 px-3 py-2 font-mono text-[10.5px] leading-[1.3] text-axon-teal">{`Subscriber ─── Service ─── ONT
     │                     │
     │         ┌── Radio 2.4
     └── GW ───┤── Radio 5.0
          │    └── Radio 6.0
          ├── Pod 1
          └── Pod 2`}</pre>
  );
}

export default function Subscriber360({ ont, showSources, onClose }) {
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

        <Section title="Mobile" source="greenwave" missing />

        <Section title="Inventory" source="inventory" missing />

        <Section title="Graph Twin View" source="unified">
          <GraphAscii />
          <div className="mt-1 text-[10.5px] italic text-zinc-400">
            This is what the knowledge graph looks like — every silo's data
            linked through reality.
          </div>
          <div className="mt-2 flex gap-2">
            <button className="flex-1 rounded-sm border border-axon-teal/50 bg-axon-teal/10 px-2 py-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-axon-teal">
              🔍 Query Agent
            </button>
            <button className="flex-1 rounded-sm border border-axon-blue/50 bg-axon-blue/10 px-2 py-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-axon-blue">
              📊 Analytics
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
