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

const TIER_LABELS = { 1: 'Tier 1 · $50B+', 2: 'Tier 2 · $15-50B', 3: 'Tier 3 · $5-15B', 4: 'Tier 4 · $1-5B' };
const REGION_NAMES = { NA: 'North America', EU: 'Europe', APAC: 'Asia-Pacific', LATAM: 'Latin America', MEA: 'Middle East & Africa' };

function seedFromId(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = ((h << 5) - h + id.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pctRange(seed, min, max, step = 0.1) {
  const raw = min + ((seed % 1000) / 1000) * (max - min);
  return Math.round(raw / step) * step;
}

function SectionHeader({ title }) {
  return (
    <div className="mb-1.5 mt-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
      {title}
    </div>
  );
}

function KPICard({ label, value, trend, color = 'text-white' }) {
  return (
    <div className="flex items-center justify-between rounded-sm border border-white/5 bg-white/[0.02] px-2 py-1.5">
      <span className="text-[10px] text-zinc-400">{label}</span>
      <div className="flex items-center gap-1.5">
        <span className={`font-mono text-[11px] ${color}`}>{value}</span>
        {trend && <span className={`text-[9px] ${trend.startsWith('+') || trend.startsWith('↑') ? 'text-emerald-400' : 'text-red-400'}`}>{trend}</span>}
      </div>
    </div>
  );
}

function OperatorDetail({ data, onClose, role, year }) {
  const revB = (data.revenue / 1e9).toFixed(1);
  const s = seedFromId(data.id);

  const ebitdaMargin = pctRange(s, 28, 48);
  const arpu = Math.round(pctRange(s * 3, 8, 65, 1));
  const capexIntensity = pctRange(s * 7, 12, 25);
  const churnRate = pctRange(s * 11, 0.8, 2.4);
  const costPerSub = Math.round(pctRange(s * 13, 3, 18, 1));
  const axonRoi = Math.round(pctRange(s * 17, 180, 420, 1));

  const techOptions = ['GPON + XGS-PON', 'XGS-PON', 'NG-PON2 pilot', 'GPON legacy', 'P2P + GPON'];
  const tech = techOptions[s % techOptions.length];
  const cloudReady = ['Early', 'Partial', 'Advanced', 'Cloud-native'][s % 4];
  const integrationComplexity = (s % 4) + 2;
  const deployMonths = [6, 9, 12, 15, 18][(s * 3) % 5];
  const anLevel = Math.min(4, Math.max(0, (s % 5)));
  const apiMaturity = ['None', 'Basic REST', 'Full REST', 'GraphQL + REST', 'Event-driven'][s % 5];

  const nodeCount = Math.round(data.revenue / 1e9 * pctRange(s * 23, 800, 2200, 1));
  const incidentRate = Math.round(pctRange(s * 29, 40, 320, 1));
  const mttrMin = Math.round(pctRange(s * 31, 12, 90, 1));
  const slaCompliance = pctRange(s * 37, 97.5, 99.95, 0.01);
  const alarmCount = Math.round(pctRange(s * 41, 5, 85, 1));

  const nps = Math.round(pctRange(s * 43, 15, 72, 1));
  const appRating = pctRange(s * 47, 3.2, 4.8, 0.1);
  const complaints = Math.round(data.revenue / 1e9 * pctRange(s * 53, 50, 200, 1));
  const selfService = pctRange(s * 59, 35, 78);
  const digitalEngagement = pctRange(s * 61, 22, 68);

  const dealSize = data.tier === 1 ? pctRange(s * 67, 2.5, 8.0, 0.5) : data.tier === 2 ? pctRange(s * 67, 0.8, 3.0, 0.1) : pctRange(s * 67, 0.3, 1.2, 0.1);
  const stages = ['Discovery', 'Qualified', 'Technical Eval', 'Negotiation', 'Verbal Commit'];
  const pipelineStage = data.status === 'active' ? 'Deployed' : stages[(s * 71) % stages.length];
  const winProb = data.status === 'active' ? 100 : Math.round(pctRange(s * 73, 15, 75, 1));
  const competitors = [['Nokia AVA', 'Ericsson BDGS'], ['Amdocs', 'Netcracker'], ['Huawei iMaster'], ['Nokia AVA', 'TEOCO'], ['Ericsson BDGS', 'Amdocs']][(s * 79) % 5];
  const decisionQ = data.status === 'active' ? '—' : `Q${((s * 83) % 4) + 1} ${year + ((s * 89) % 2)}`;

  return (
    <>
      <PanelHeader
        kicker="Global Operator"
        title={data.name}
        subtitle={`${data.country} · ${REGION_NAMES[data.region] || data.region}`}
        status={data.status === 'active' ? 'healthy' : 'offline'}
        onClose={onClose}
      />
      <div className="px-4 py-3 space-y-1">
        <Field label="Revenue" value={`$${revB}B`} source={null} showSources={false} />
        <Field label="Subscribers" value={data.subs} source={null} showSources={false} />
        <Field label="Tier" value={TIER_LABELS[data.tier]} source={null} showSources={false} />
        <Field label="Region" value={REGION_NAMES[data.region]} source={null} showSources={false} />
        <Field label="Status" value={data.status === 'active' ? 'AXON Customer' : 'Prospect'} source={null} showSources={false} />

        {data.status === 'active' && (
          <div className="mt-2 rounded-sm border border-axon-teal/20 bg-axon-teal/5 px-2 py-1.5 text-center text-[10px] text-axon-teal">
            Active AXON Digital Twin deployment
          </div>
        )}
        {data.status === 'prospect' && (
          <div className="mt-2 rounded-sm border border-amber-500/20 bg-amber-500/5 px-2 py-1.5 text-center text-[10px] text-amber-400">
            Addressable market — no deployment yet
          </div>
        )}

        {(role === 'ceo' || role === 'consumer') && (
          <>
            <SectionHeader title="Sales Pipeline" />
            <KPICard label="Deal Size" value={`$${dealSize}M/yr`} color="text-emerald-400" />
            <KPICard label="Pipeline Stage" value={pipelineStage} color={data.status === 'active' ? 'text-axon-teal' : 'text-amber-400'} />
            <KPICard label="Win Probability" value={`${winProb}%`} color={winProb > 60 ? 'text-emerald-400' : winProb > 35 ? 'text-amber-400' : 'text-zinc-300'} />
            <KPICard label="Decision Timeline" value={decisionQ} />
            <div className="mt-1.5">
              <div className="text-[10px] text-zinc-500 mb-1">Competitive Landscape</div>
              <div className="flex flex-wrap gap-1">
                {competitors.map((c) => (
                  <span key={c} className="rounded-full border border-red-500/20 bg-red-500/5 px-2 py-0.5 text-[9px] text-red-400">{c}</span>
                ))}
              </div>
            </div>
          </>
        )}

        {role === 'cfo' && (
          <>
            <SectionHeader title="Financial Metrics" />
            <KPICard label="EBITDA Margin" value={`${ebitdaMargin}%`} trend={ebitdaMargin > 38 ? '↑' : '↓'} color="text-emerald-400" />
            <KPICard label="ARPU" value={`$${arpu}/mo`} color="text-white" />
            <KPICard label="CapEx Intensity" value={`${capexIntensity}%`} color={capexIntensity > 20 ? 'text-amber-400' : 'text-emerald-400'} />
            <KPICard label="Subscriber Churn" value={`${churnRate}%/mo`} color={churnRate > 1.5 ? 'text-red-400' : 'text-emerald-400'} />
            <KPICard label="Cost / Subscriber" value={`$${costPerSub}/mo`} color="text-white" />
            <SectionHeader title="AXON Value Case" />
            <KPICard label="Projected ROI" value={`${axonRoi}%`} color="text-axon-teal" />
            <KPICard label="Deal Size" value={`$${dealSize}M/yr`} color="text-emerald-400" />
            <KPICard label="Payback Period" value={`${Math.round(12 / (axonRoi / 100))} months`} color="text-white" />
          </>
        )}

        {role === 'cto' && (
          <>
            <SectionHeader title="Technology Profile" />
            <KPICard label="Access Network" value={tech} color="text-purple-400" />
            <KPICard label="Cloud Readiness" value={cloudReady} color={cloudReady === 'Cloud-native' ? 'text-emerald-400' : cloudReady === 'Early' ? 'text-red-400' : 'text-amber-400'} />
            <KPICard label="Integration Complexity" value={`${integrationComplexity}/5`} color={integrationComplexity > 3 ? 'text-red-400' : 'text-emerald-400'} />
            <KPICard label="Deploy Timeline" value={`${deployMonths} months`} color="text-white" />
            <KPICard label="Current AN Level" value={`Level ${anLevel}`} color="text-axon-teal" />
            <KPICard label="API Maturity" value={apiMaturity} color="text-purple-400" />
          </>
        )}

        {role === 'noc' && (
          <>
            <SectionHeader title="Network Operations" />
            <KPICard label="Network Nodes" value={fmt(nodeCount)} color="text-white" />
            <KPICard label="Incidents / Month" value={fmt(incidentRate)} color={incidentRate > 200 ? 'text-red-400' : 'text-amber-400'} />
            <KPICard label="MTTR" value={`${mttrMin} min`} color={mttrMin > 45 ? 'text-red-400' : 'text-emerald-400'} />
            <KPICard label="SLA Compliance" value={`${slaCompliance.toFixed(2)}%`} color={slaCompliance > 99.5 ? 'text-emerald-400' : 'text-amber-400'} />
            <KPICard label="Active Alarms" value={alarmCount} color={alarmCount > 40 ? 'text-red-400' : 'text-amber-400'} />
          </>
        )}

        {role === 'consumer' && (
          <>
            <SectionHeader title="Customer Experience" />
            <KPICard label="NPS Score" value={nps} color={nps > 50 ? 'text-emerald-400' : nps > 30 ? 'text-amber-400' : 'text-red-400'} />
            <KPICard label="App Rating" value={`${appRating.toFixed(1)}★`} color={appRating > 4.0 ? 'text-emerald-400' : 'text-amber-400'} />
            <KPICard label="Complaints / Month" value={fmt(complaints)} color="text-white" />
            <KPICard label="Self-Service Rate" value={`${selfService}%`} color={selfService > 60 ? 'text-emerald-400' : 'text-amber-400'} />
            <KPICard label="Digital Engagement" value={`${digitalEngagement}%`} color="text-white" />
          </>
        )}
      </div>
    </>
  );
}

const FRAMEWORKS = ['PyTorch', 'TensorFlow', 'scikit-learn', 'XGBoost', 'LightGBM', 'ONNX Runtime', 'JAX', 'CatBoost'];
const OWNERS = [
  { name: 'Dr. Priya Sharma', team: 'Network AI' },
  { name: 'Marcus Lindqvist', team: 'Platform DS' },
  { name: 'Yuki Tanaka', team: 'Edge Intelligence' },
  { name: 'Ahmed El-Khatib', team: 'Anomaly Detection' },
  { name: 'Sofia Andersson', team: 'Customer AI' },
  { name: 'James Chen', team: 'Optimization' },
  { name: 'Elena Popova', team: 'RAN Analytics' },
  { name: 'David Okonkwo', team: 'Digital Twin Core' },
];
const REVIEWERS = ['ML Platform Team', 'Security Review', 'Ethics Board', 'Domain Expert', 'Performance QA'];
const DEPLOY_TARGETS = ['Edge Gateway (ARM)', 'MEC / Edge Cloud', 'Regional GPU Cluster', 'Central Cloud (K8s)', 'Federated (Multi-site)', 'Embedded (ONNX)'];

function ModelDetail({ data, onClose }) {
  const s = seedFromId(data.id);
  const owner = OWNERS[s % OWNERS.length];
  const framework = FRAMEWORKS[s % FRAMEWORKS.length];
  const major = (s % 4) + 1;
  const minor = (s * 3) % 12;
  const patch = (s * 7) % 20;
  const version = `v${major}.${minor}.${patch}`;
  const totalVersions = major * 10 + minor + 3;
  const deployTarget = DEPLOY_TARGETS[s % DEPLOY_TARGETS.length];
  const reviewer1 = REVIEWERS[s % REVIEWERS.length];
  const reviewer2 = REVIEWERS[(s * 3) % REVIEWERS.length];

  const accuracy = pctRange(s * 19, 88, 99.5, 0.1);
  const f1 = pctRange(s * 23, 0.85, 0.98, 0.01);
  const latencyMs = data.id.includes('home') || data.id.includes('wifi') || data.id.includes('ont')
    ? pctRange(s * 29, 0.1, 2.0, 0.1)
    : data.id.includes('co-') || data.id.includes('ran-')
    ? pctRange(s * 29, 1, 12, 0.5)
    : pctRange(s * 29, 15, 180, 1);
  const modelSizeMB = data.id.includes('suite') || data.id.includes('var')
    ? pctRange(s * 31, 50, 400, 10)
    : pctRange(s * 31, 2, 120, 1);
  const trainingSamples = Math.round(pctRange(s * 37, 50000, 5000000, 1000));
  const lastTrained = `2026-0${(s % 4) + 1}-${String((s % 28) + 1).padStart(2, '0')}`;
  const retrainCadence = ['Daily', 'Weekly', 'Bi-weekly', 'Monthly', 'Quarterly'][(s * 41) % 5];
  const driftScore = pctRange(s * 43, 0.01, 0.15, 0.01);

  const accessLevel = data.status === 'active' ? 'Production' : data.status === 'prototype' ? 'Staging' : 'Dev Only';
  const accessColor = data.status === 'active' ? 'text-emerald-400' : data.status === 'prototype' ? 'text-amber-400' : 'text-zinc-500';

  const repoName = `axon-models/${data.id}`;
  const notebookName = `${data.id.replace(/-/g, '_')}_analysis.ipynb`;

  const commits = Math.round(pctRange(s * 47, 30, 420, 1));
  const contributors = Math.round(pctRange(s * 53, 2, 12, 1));
  const openPRs = Math.round(pctRange(s * 59, 0, 5, 1));
  const coverage = pctRange(s * 61, 72, 96, 1);

  const historyEntries = [
    { ver: version, date: lastTrained, note: 'Production release', tag: 'LATEST' },
    { ver: `v${major}.${minor > 0 ? minor - 1 : 0}.${(patch + 8) % 20}`, date: `2026-0${((s % 4)) || 1}-${String(((s % 20) + 1)).padStart(2, '0')}`, note: 'Hyperparameter tuning', tag: null },
    { ver: `v${major}.${minor > 1 ? minor - 2 : 0}.0`, date: `2025-12-${String((s % 28) + 1).padStart(2, '0')}`, note: 'Architecture change', tag: 'MILESTONE' },
    { ver: `v${major > 1 ? major - 1 : 1}.0.0`, date: '2025-09-15', note: 'Initial production deploy', tag: 'GA' },
  ];

  const statusColor = data.status === 'active' ? 'healthy' : data.status === 'prototype' ? 'degraded' : 'offline';

  return (
    <>
      <PanelHeader
        kicker="DS Model"
        title={data.name}
        subtitle={`${data.type.toUpperCase()} · ${framework}`}
        status={statusColor}
        onClose={onClose}
      />
      <div className="px-4 py-3 space-y-1">
        <SectionHeader title="Repository" />
        <div className="rounded-sm border border-white/10 bg-white/[0.03] px-2.5 py-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-500">⌥</span>
            <span className="font-mono text-[10px] text-axon-teal">{repoName}</span>
          </div>
          <div className="mt-1.5 grid grid-cols-4 gap-1 text-center text-[9px]">
            <div><div className="font-mono text-white">{commits}</div><div className="text-zinc-500">commits</div></div>
            <div><div className="font-mono text-white">{contributors}</div><div className="text-zinc-500">contrib</div></div>
            <div><div className="font-mono text-amber-400">{openPRs}</div><div className="text-zinc-500">open PRs</div></div>
            <div><div className="font-mono text-emerald-400">{coverage}%</div><div className="text-zinc-500">coverage</div></div>
          </div>
        </div>

        <div className="rounded-sm border border-purple-500/20 bg-purple-500/5 px-2.5 py-1.5 mt-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-purple-400">▣</span>
            <span className="font-mono text-[10px] text-purple-300">{notebookName}</span>
          </div>
          <div className="text-[9px] text-zinc-500 mt-0.5">Jupyter · EDA + evaluation + drift analysis</div>
        </div>

        <SectionHeader title="Version & Ownership" />
        <KPICard label="Current Version" value={version} color="text-axon-teal" />
        <KPICard label="Total Versions" value={totalVersions} color="text-white" />
        <KPICard label="Owner" value={owner.name} color="text-white" />
        <KPICard label="Team" value={owner.team} color="text-purple-400" />
        <KPICard label="Reviewers" value={`${reviewer1} + ${reviewer2}`} color="text-zinc-300" />

        <SectionHeader title="Access & Deployment" />
        <KPICard label="Access Level" value={accessLevel} color={accessColor} />
        <KPICard label="Deploy Target" value={deployTarget} color="text-blue-400" />
        <KPICard label="Model Size" value={`${modelSizeMB} MB`} color="text-white" />
        <KPICard label="Inference Latency" value={latencyMs < 10 ? `${latencyMs} ms` : `${Math.round(latencyMs)} ms`} color={latencyMs < 5 ? 'text-emerald-400' : 'text-amber-400'} />

        <SectionHeader title="Training & Performance" />
        <KPICard label="Framework" value={framework} color="text-cyan-400" />
        <KPICard label="Accuracy" value={`${accuracy}%`} color={accuracy > 95 ? 'text-emerald-400' : 'text-amber-400'} />
        <KPICard label="F1 Score" value={f1.toFixed(2)} color={f1 > 0.92 ? 'text-emerald-400' : 'text-amber-400'} />
        <KPICard label="Training Samples" value={fmt(trainingSamples)} color="text-white" />
        <KPICard label="Last Trained" value={lastTrained} color="text-white" />
        <KPICard label="Retrain Cadence" value={retrainCadence} color="text-blue-400" />
        <KPICard label="Drift Score" value={driftScore.toFixed(2)} color={driftScore > 0.08 ? 'text-red-400' : 'text-emerald-400'} trend={driftScore > 0.08 ? '↑ retrain needed' : null} />

        <SectionHeader title="Version History" />
        <div className="space-y-1">
          {historyEntries.map((h, i) => (
            <div key={i} className="flex items-center justify-between rounded-sm border border-white/5 bg-white/[0.02] px-2 py-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-zinc-200">{h.ver}</span>
                {h.tag && (
                  <span className={`rounded-full px-1.5 py-0.5 text-[7px] font-bold uppercase ${
                    h.tag === 'LATEST' ? 'bg-emerald-500/20 text-emerald-400' :
                    h.tag === 'GA' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>{h.tag}</span>
                )}
              </div>
              <div className="text-right">
                <div className="font-mono text-[9px] text-zinc-500">{h.date}</div>
                <div className="text-[8px] text-zinc-600">{h.note}</div>
              </div>
            </div>
          ))}
        </div>

        <SectionHeader title="Governance" />
        <div className="space-y-1.5 text-[10px]">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${data.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <span className="text-zinc-300">{data.status === 'active' ? 'Approved for production' : 'Pending production approval'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-zinc-300">Bias audit passed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${driftScore > 0.08 ? 'bg-red-400' : 'bg-emerald-400'}`} />
            <span className="text-zinc-300">{driftScore > 0.08 ? 'Drift alert — retrain scheduled' : 'Drift within tolerance'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-zinc-300">Data lineage documented</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-zinc-300">Explainability report available</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default function DeviceDetail({ selection, onClose, onOpenSubscriber360, showSources, phase, year, role }) {
  if (!selection) return null;
  return (
    <div className="absolute right-4 top-[7.5rem] bottom-[5.5rem] z-20 w-[22rem]">
      <div className="glass flex h-full flex-col overflow-y-auto rounded-md">
        {selection.type === 'metro' && <MetroDetail data={selection.data} onClose={onClose} showSources={showSources} year={year} />}
        {selection.type === 'co' && <CODetail data={selection.data} onClose={onClose} showSources={showSources} phase={phase} />}
        {selection.type === 'splitter' && <SplitterDetail data={selection.data} onClose={onClose} showSources={showSources} />}
        {selection.type === 'tower' && <TowerDetail data={selection.data} onClose={onClose} showSources={showSources} phase={phase} />}
        {selection.type === 'operator' && <OperatorDetail data={selection.data} onClose={onClose} role={role} year={year} />}
        {selection.type === 'model' && <ModelDetail data={selection.data} onClose={onClose} />}
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
