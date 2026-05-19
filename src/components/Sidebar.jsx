import React, { useMemo } from 'react';
import { METROS, METRO_AGGREGATE } from '../data/metros.js';
import { CENTRAL_OFFICES } from '../data/centralOffices.js';
import { PLATFORMS } from '../data/constants.js';
import { interpolateGrowth, getTotalSubscribers, getActiveMetroCount, getActiveMetroIds } from '../data/timeline.js';
import { MARKET_SIZING, getMarketSizing, TOTAL_GLOBAL_OPERATORS, TOTAL_GLOBAL_REVENUE, TOTAL_GLOBAL_SUBS, REGION_STATS } from '../data/globalOperators.js';
import ANLevelGauge from './ANLevelGauge.jsx';

function fmt(n) {
  return n.toLocaleString('en-US');
}

function StatusBar({ counts, total }) {
  const pct = (k) => (total > 0 ? (counts[k] / total) * 100 : 0);
  return (
    <div className="space-y-1.5">
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-axon-deep">
        <div className="bg-status-healthy" style={{ width: `${pct('healthy')}%` }} />
        <div className="bg-status-degraded" style={{ width: `${pct('degraded')}%` }} />
        <div className="bg-status-alarm" style={{ width: `${pct('alarm')}%` }} />
        <div className="bg-status-offline" style={{ width: `${pct('offline')}%` }} />
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 font-mono text-[10.5px] text-zinc-300">
        <div><span className="dot dot-healthy" />Healthy {fmt(counts.healthy)}</div>
        <div><span className="dot dot-degraded" />Degraded {fmt(counts.degraded)}</div>
        <div><span className="dot dot-alarm" />Alarm {fmt(counts.alarm)}</div>
        <div><span className="dot dot-offline" />Offline {fmt(counts.offline)}</div>
      </div>
    </div>
  );
}

function PlatformList({ showSources, onToggleSources }) {
  return (
    <div>
      <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
        Data Platforms
      </div>
      <ul className="space-y-1 font-mono text-[11px]">
        {Object.entries(PLATFORMS).filter(([k]) => k !== 'unified').map(([key, p]) => {
          const connected = ['orchestrator', 'cloudcheck', 'expresse'].includes(key);
          return (
            <li key={key} className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-zinc-200">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: connected ? p.color : 'transparent', border: `1px solid ${p.color}` }}
                />
                {p.name}
              </span>
              <span className={connected ? 'text-status-healthy' : 'text-zinc-500'}>
                {connected ? '✓' : '—'}
              </span>
            </li>
          );
        })}
        <li className="flex items-center justify-between pt-1">
          <span className="flex items-center gap-2 text-axon-teal">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: PLATFORMS.unified.color }}
            />
            {PLATFORMS.unified.name}
          </span>
          <span className="text-axon-teal">target</span>
        </li>
      </ul>
      <button
        onClick={onToggleSources}
        className="mt-2.5 w-full rounded-sm border border-axon-teal/50 bg-axon-teal/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-axon-teal transition hover:bg-axon-teal/20"
      >
        {showSources ? 'Hide Data Sources' : 'Show Data Sources'}
      </button>
    </div>
  );
}

const ROLES = [
  { id: 'noc', label: 'NOC', color: 'border-red-500/50 bg-red-500/10 text-red-400' },
  { id: 'cto', label: 'CTO', color: 'border-purple-500/50 bg-purple-500/10 text-purple-400' },
  { id: 'cfo', label: 'CFO', color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' },
  { id: 'ceo', label: 'CEO', color: 'border-amber-500/50 bg-amber-500/10 text-amber-400' },
  { id: 'consumer', label: 'CX', color: 'border-blue-500/50 bg-blue-500/10 text-blue-400' },
];

export default function Sidebar({
  zoomLevel,
  focusedMetro,
  focusedCO,
  onts,
  showSources,
  year,
  role,
  onRoleChange,
  onToggleSources,
  onReset,
  onStartStory,
  onToggleKPIs,
  onToggleArchitecture,
  onToggleNeurosquads,
  onToggleMCP,
  showOperators,
  onToggleOperators,
  onToggleModelMap,
  onToggleCTOMeeting
}) {
  // Compute health buckets for the current scope.
  const scopeCounts = useMemo(() => {
    if (focusedCO && onts.length > 0) {
      const filtered = onts.filter((o) => o.coId === focusedCO.id);
      return aggregateStatuses(filtered);
    }
    if (focusedMetro && onts.length > 0) {
      return aggregateStatuses(onts);
    }
    // Planet-level: synthesize realistic global numbers from subscriber counts.
    const total = getTotalSubscribers(year);
    return {
      total,
      healthy: Math.round(total * 0.92),
      degraded: Math.round(total * 0.05),
      alarm: Math.round(total * 0.02),
      offline: Math.round(total * 0.01)
    };
  }, [focusedMetro, focusedCO, onts, year]);

  const issues = useMemo(() => buildTopIssues({ focusedMetro, focusedCO, onts }), [focusedMetro, focusedCO, onts]);
  const mkt = useMemo(() => getMarketSizing(year), [year]);

  return (
    <div className="pointer-events-auto absolute left-4 top-[10rem] bottom-[5.5rem] z-30 w-[19rem] overflow-y-auto pr-1">
      <div className="glass space-y-4 rounded-md p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
              Zoom Scope
            </div>
            <div className="mt-0.5 font-mono text-sm capitalize text-axon-teal">{zoomLevel}</div>
          </div>
          <div className="flex gap-1">
            {ROLES.map((r) => (
              <button
                key={r.id}
                onClick={() => onRoleChange?.(r.id)}
                className={`rounded-sm border px-1.5 py-0.5 text-[9px] font-semibold transition ${
                  role === r.id ? r.color : 'border-white/10 bg-white/5 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          {focusedCO ? (
            <>
              <div className="text-base font-semibold">{focusedCO.name}</div>
              <div className="text-[11px] text-zinc-400">{focusedCO.address}</div>
              <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 font-mono text-[11px] text-zinc-200">
                <div>OLTs <span className="text-white">{focusedCO.oltCount}</span></div>
                <div>PON Ports <span className="text-white">{focusedCO.ponPorts}</span></div>
                <div>Subs <span className="text-white">{fmt(focusedCO.subscribersServed)}</span></div>
                <div>Tech <span className="text-white">{focusedCO.technology}</span></div>
              </div>
            </>
          ) : focusedMetro ? (() => {
            const metroSubs = interpolateGrowth(focusedMetro.id, year);
            return (
              <>
                <div className="text-base font-semibold">{focusedMetro.name}</div>
                <div className="text-[11px] text-zinc-400">Top plan: {focusedMetro.topTier}</div>
                <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 font-mono text-[11px] text-zinc-200">
                  <div>Subscribers <span className="text-white">{fmt(metroSubs)}</span></div>
                  <div>Homes Passed <span className="text-white">{fmt(Math.round(metroSubs * 2.88))}</span></div>
                  <div>COs <span className="text-white">{focusedMetro.centralOffices}</span></div>
                  <div>State <span className="text-white">{focusedMetro.state}</span></div>
                </div>
              </>
            );
          })() : (() => {
            const totalSubs = getTotalSubscribers(year);
            const activeIds = getActiveMetroIds(year);
            const activeCOs = METROS.filter((m) => activeIds.includes(m.id)).reduce((sum, m) => sum + (m.centralOffices || 0), 0);
            return (
              <>
                <div className="text-base font-semibold">All Metros · Quantum Fiber Footprint</div>
                <div className="text-[11px] text-zinc-400">Click a metro pin to drill in.</div>
                <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 font-mono text-[11px] text-zinc-200">
                  <div>Subscribers <span className="text-white">{fmt(totalSubs)}</span></div>
                  <div>Homes Passed <span className="text-white">{fmt(Math.round(totalSubs * 2.88))}</span></div>
                  <div>COs <span className="text-white">{activeCOs}</span></div>
                  <div>Metros <span className="text-white">{getActiveMetroCount(year)}</span></div>
                </div>
              </>
            );
          })()}
        </div>

        <div>
          <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
            Network Health
          </div>
          <StatusBar counts={scopeCounts} total={scopeCounts.total} />
          <div className="mt-1 font-mono text-[10px] text-zinc-400">
            Health score:{' '}
            <span className="text-white">
              {scopeCounts.total > 0
                ? Math.round((scopeCounts.healthy / scopeCounts.total) * 100)
                : 0}
              %
            </span>
          </div>
        </div>

        <ANLevelGauge year={year} />

        {(role === 'noc' || role === 'cto') && (
          <div>
            <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
              {role === 'cto' ? 'Technical Priorities' : 'Top Issues'}
            </div>
            <ul className="space-y-1.5 text-[11px]">
              {issues.map((issue) => (
                <li key={issue.id} className="flex gap-2">
                  <span className={`mt-0.5 dot dot-${issue.severity}`} />
                  <div>
                    <div className="font-semibold text-zinc-100">{issue.title}</div>
                    <div className="text-[10px] text-zinc-400">{issue.detail}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {role === 'cfo' && (
          <div>
            <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
              Financial Overview
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-sm border border-white/5 bg-white/[0.02] px-2 py-1.5">
                <span className="text-[10px] text-zinc-300">Current ARR</span>
                <span className="font-mono text-[11px] text-emerald-400">$67M</span>
              </div>
              <div className="flex items-center justify-between rounded-sm border border-white/5 bg-white/[0.02] px-2 py-1.5">
                <span className="text-[10px] text-zinc-300">Target ARR</span>
                <span className="font-mono text-[11px] text-axon-teal">$108M</span>
              </div>
              <div className="flex items-center justify-between rounded-sm border border-white/5 bg-white/[0.02] px-2 py-1.5">
                <span className="text-[10px] text-zinc-300">CapEx Savings</span>
                <span className="font-mono text-[11px] text-emerald-400">$22.4M/yr</span>
              </div>
              <div className="flex items-center justify-between rounded-sm border border-white/5 bg-white/[0.02] px-2 py-1.5">
                <span className="text-[10px] text-zinc-300">Churn Impact</span>
                <span className="font-mono text-[11px] text-amber-400">-18% → $14M saved</span>
              </div>
              <div className="flex items-center justify-between rounded-sm border border-white/5 bg-white/[0.02] px-2 py-1.5">
                <span className="text-[10px] text-zinc-300">Truck Roll Savings</span>
                <span className="font-mono text-[11px] text-emerald-400">-32% → $8.2M/yr</span>
              </div>
            </div>
          </div>
        )}

        {role === 'ceo' && (
          <div>
            <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
              Market Opportunity
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-sm border border-white/5 bg-white/[0.02] px-2 py-1.5">
                <span className="text-[10px] text-zinc-300">TAM (DT Market)</span>
                <span className="font-mono text-[11px] text-amber-400">{MARKET_SIZING.tam.label}</span>
              </div>
              <div className="flex items-center justify-between rounded-sm border border-white/5 bg-white/[0.02] px-2 py-1.5">
                <span className="text-[10px] text-zinc-300">SAM (Telecom DT)</span>
                <span className="font-mono text-[11px] text-amber-400">{MARKET_SIZING.sam.label}</span>
              </div>
              <div className="flex items-center justify-between rounded-sm border border-white/5 bg-white/[0.02] px-2 py-1.5">
                <span className="text-[10px] text-zinc-300">SOM (Top 100)</span>
                <span className="font-mono text-[11px] text-emerald-400">{MARKET_SIZING.som.label}</span>
              </div>
              <div className="flex items-center justify-between rounded-sm border border-white/5 bg-white/[0.02] px-2 py-1.5">
                <span className="text-[10px] text-zinc-300">Global Operators</span>
                <span className="font-mono text-[11px] text-white">{TOTAL_GLOBAL_OPERATORS} mapped · 800+ total</span>
              </div>
              <div className="flex items-center justify-between rounded-sm border border-white/5 bg-white/[0.02] px-2 py-1.5">
                <span className="text-[10px] text-zinc-300">Global Subs</span>
                <span className="font-mono text-[11px] text-white">{TOTAL_GLOBAL_SUBS}</span>
              </div>
              <div className="flex items-center justify-between rounded-sm border border-white/5 bg-white/[0.02] px-2 py-1.5">
                <span className="text-[10px] text-zinc-300">Industry Revenue</span>
                <span className="font-mono text-[11px] text-white">{TOTAL_GLOBAL_REVENUE}</span>
              </div>
              <div className="flex items-center justify-between rounded-sm border border-white/5 bg-white/[0.02] px-2 py-1.5">
                <span className="text-[10px] text-zinc-300">CAGR 2026→2031</span>
                <span className="font-mono text-[11px] text-emerald-400">{MARKET_SIZING.cagr}%</span>
              </div>
            </div>
          </div>
        )}

        {role === 'consumer' && (
          <div>
            <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
              Customer Experience
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-sm border border-white/5 bg-white/[0.02] px-2 py-1.5">
                <span className="text-[10px] text-zinc-300">Avg Speed Test</span>
                <span className="font-mono text-[11px] text-emerald-400">842 Mbps</span>
              </div>
              <div className="flex items-center justify-between rounded-sm border border-white/5 bg-white/[0.02] px-2 py-1.5">
                <span className="text-[10px] text-zinc-300">Wi-Fi Score</span>
                <span className="font-mono text-[11px] text-axon-teal">94/100</span>
              </div>
              <div className="flex items-center justify-between rounded-sm border border-white/5 bg-white/[0.02] px-2 py-1.5">
                <span className="text-[10px] text-zinc-300">App Satisfaction</span>
                <span className="font-mono text-[11px] text-blue-400">4.6★</span>
              </div>
              <div className="flex items-center justify-between rounded-sm border border-white/5 bg-white/[0.02] px-2 py-1.5">
                <span className="text-[10px] text-zinc-300">Support CSAT</span>
                <span className="font-mono text-[11px] text-emerald-400">87%</span>
              </div>
            </div>
          </div>
        )}

        {role !== 'consumer' && role !== 'ceo' && (
          <PlatformList showSources={showSources} onToggleSources={onToggleSources} />
        )}

        <div className="grid grid-cols-4 gap-1.5 pt-1">
          <button
            onClick={onReset}
            className="rounded-sm border border-white/15 bg-white/5 px-2 py-1.5 text-[10px] font-medium text-zinc-200 transition hover:bg-white/10"
          >
            Reset
          </button>
          <button
            onClick={onStartStory}
            className="rounded-sm border border-axon-blue/60 bg-axon-blue/15 px-2 py-1.5 text-[10px] font-medium text-axon-blue transition hover:bg-axon-blue/30"
          >
            Story
          </button>
          <button
            onClick={onToggleKPIs}
            className="rounded-sm border border-emerald-500/50 bg-emerald-500/10 px-2 py-1.5 text-[10px] font-medium text-emerald-400 transition hover:bg-emerald-500/20"
          >
            KPIs
          </button>
          <button
            onClick={onToggleOperators}
            className={`rounded-sm border px-2 py-1.5 text-[10px] font-medium transition ${
              showOperators
                ? 'border-amber-500/60 bg-amber-500/20 text-amber-400'
                : 'border-amber-500/30 bg-amber-500/5 text-amber-400/50 hover:bg-amber-500/10'
            }`}
          >
            Operators
          </button>
          <button
            onClick={onToggleArchitecture}
            className="rounded-sm border border-purple-500/50 bg-purple-500/10 px-2 py-1.5 text-[10px] font-medium text-purple-400 transition hover:bg-purple-500/20"
          >
            Arch
          </button>
          <button
            onClick={onToggleNeurosquads}
            className="rounded-sm border border-violet-500/50 bg-violet-500/10 px-2 py-1.5 text-[10px] font-medium text-violet-400 transition hover:bg-violet-500/20"
          >
            Squads
          </button>
          <button
            onClick={onToggleMCP}
            className="rounded-sm border border-cyan-500/50 bg-cyan-500/10 px-2 py-1.5 text-[10px] font-medium text-cyan-400 transition hover:bg-cyan-500/20"
          >
            MCP
          </button>
          <button
            onClick={onToggleModelMap}
            className="rounded-sm border border-pink-500/50 bg-pink-500/10 px-2 py-1.5 text-[10px] font-medium text-pink-400 transition hover:bg-pink-500/20"
          >
            Models
          </button>
          <button
            onClick={onToggleCTOMeeting}
            className="rounded-sm border border-orange-500/50 bg-orange-500/10 px-2 py-1.5 text-[10px] font-medium text-orange-400 transition hover:bg-orange-500/20"
          >
            CTO
          </button>
        </div>

        {showOperators && (
          <div className="rounded-sm border border-amber-500/20 bg-amber-500/5 p-3">
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-amber-400">
              Market Sizing · TAM / SAM / SOM
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-400">TAM · Global DT</span>
                <span className="font-mono text-[11px] text-amber-400">{mkt.tamLabel}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-amber-500/40" style={{ width: '100%' }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-400">SAM · Telecom DT</span>
                <span className="font-mono text-[11px] text-amber-400">{mkt.samLabel}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-amber-500/60" style={{ width: `${(mkt.sam / mkt.tam * 100).toFixed(1)}%` }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-400">SOM · AXON Target</span>
                <span className="font-mono text-[11px] text-emerald-400">{mkt.somLabel}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-emerald-500/80" style={{ width: `${(mkt.som / mkt.sam * 100).toFixed(1)}%` }} />
              </div>
              <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
                <div className="text-zinc-500">Operators mapped</div>
                <div className="font-mono text-white text-right">{TOTAL_GLOBAL_OPERATORS}</div>
                <div className="text-zinc-500">Global subs</div>
                <div className="font-mono text-white text-right">{TOTAL_GLOBAL_SUBS}</div>
                <div className="text-zinc-500">Industry revenue</div>
                <div className="font-mono text-white text-right">{TOTAL_GLOBAL_REVENUE}</div>
                <div className="text-zinc-500">CAGR 2026→31</div>
                <div className="font-mono text-emerald-400 text-right">{MARKET_SIZING.cagr}%</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function aggregateStatuses(items) {
  const counts = { total: items.length, healthy: 0, degraded: 0, alarm: 0, offline: 0 };
  for (const it of items) {
    if (counts[it.status] !== undefined) counts[it.status] += 1;
  }
  return counts;
}

function buildTopIssues({ focusedMetro, focusedCO, onts }) {
  const out = [];

  if (focusedCO) {
    const ontsHere = onts.filter((o) => o.coId === focusedCO.id);
    const alarms = ontsHere.filter((o) => o.status === 'alarm').length;
    const degraded = ontsHere.filter((o) => o.status === 'degraded').length;
    const outdated = ontsHere.filter((o) => ['3.8.2', '3.9.14'].includes(o.firmware)).length;
    if (alarms > 0) out.push({ id: 'co-alarms', severity: 'alarm', title: `${alarms} ONTs in alarm`, detail: 'High optical loss / signal failure' });
    if (degraded > 0) out.push({ id: 'co-degraded', severity: 'degraded', title: `${degraded} ONTs degraded`, detail: 'RX power below threshold' });
    if (outdated > 0) out.push({ id: 'co-fw', severity: 'degraded', title: `${outdated} ONTs on stale firmware`, detail: 'Schedule rolling upgrade' });
    if (alarms > 0 && outdated > 0) {
      out.push({ id: 'co-corr', severity: 'alarm', title: 'Correlation: firmware → alarm', detail: `${Math.min(alarms, outdated)} alarms on stale firmware ONTs — root cause likely firmware bug` });
    }
    if (alarms > 3) {
      out.push({ id: 'co-cluster', severity: 'alarm', title: 'Alarm cluster detected', detail: 'Multiple ONTs on same splitter — check feeder fiber or splitter cabinet' });
    }
    if (out.length === 0) out.push({ id: 'co-ok', severity: 'healthy', title: 'No active incidents', detail: `${ontsHere.length} ONTs healthy` });
    return out;
  }

  if (focusedMetro) {
    const cos = CENTRAL_OFFICES.filter((c) => c.metroId === focusedMetro.id);
    cos
      .filter((c) => c.status !== 'healthy')
      .slice(0, 4)
      .forEach((c) => {
        out.push({
          id: `co-${c.id}`,
          severity: c.status,
          title: c.name,
          detail: c.status === 'alarm' ? 'OLT ports reporting failure' : 'Elevated optical loss on feeders'
        });
      });
    if (out.length === 0) out.push({ id: 'metro-ok', severity: 'healthy', title: 'All COs nominal', detail: `${cos.length} COs reporting healthy` });
    return out;
  }

  // Planet level — surface metro-level issues with correlation reasoning
  METROS.filter((m) => m.status !== 'healthy').forEach((m) => {
    out.push({
      id: `metro-${m.id}`,
      severity: m.status,
      title: m.name,
      detail: m.status === 'alarm' ? 'Multiple COs reporting incidents' : 'Elevated regional alarms'
    });
  });
  const alarmMetros = METROS.filter((m) => m.status === 'alarm');
  const degradedMetros = METROS.filter((m) => m.status === 'degraded');
  if (alarmMetros.length > 1) {
    out.push({
      id: 'corr-multi-alarm',
      severity: 'alarm',
      title: 'Cross-metro correlation detected',
      detail: `${alarmMetros.length} metros in alarm — likely upstream feeder or backbone event`
    });
  }
  if (degradedMetros.length >= 2) {
    out.push({
      id: 'corr-degraded-pattern',
      severity: 'degraded',
      title: 'Regional degradation pattern',
      detail: `${degradedMetros.length} metros degraded — check shared OLT firmware or weather event`
    });
  }
  if (out.length === 0) out.push({ id: 'all-ok', severity: 'healthy', title: 'Network nominal', detail: 'No regional incidents' });
  return out;
}
