import React, { useMemo } from 'react';
import { METROS, METRO_AGGREGATE } from '../data/metros.js';
import { CENTRAL_OFFICES } from '../data/centralOffices.js';
import { PLATFORMS } from '../data/constants.js';
import { interpolateGrowth, getTotalSubscribers, getActiveMetroCount } from '../data/timeline.js';

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

export default function Sidebar({
  zoomLevel,
  focusedMetro,
  focusedCO,
  onts,
  showSources,
  year,
  onToggleSources,
  onReset,
  onStartStory,
  onToggleKPIs
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
    const total = METRO_AGGREGATE.subscribers;
    return {
      total,
      healthy: Math.round(total * 0.92),
      degraded: Math.round(total * 0.05),
      alarm: Math.round(total * 0.02),
      offline: Math.round(total * 0.01)
    };
  }, [focusedMetro, focusedCO, onts]);

  const issues = useMemo(() => buildTopIssues({ focusedMetro, focusedCO, onts }), [focusedMetro, focusedCO, onts]);

  return (
    <div className="pointer-events-auto absolute left-4 top-[10rem] bottom-[5.5rem] z-30 w-[19rem] overflow-y-auto pr-1">
      <div className="glass space-y-4 rounded-md p-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
            Zoom Scope
          </div>
          <div className="mt-0.5 font-mono text-sm capitalize text-axon-teal">{zoomLevel}</div>
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
            return (
              <>
                <div className="text-base font-semibold">All Metros · Quantum Fiber Footprint</div>
                <div className="text-[11px] text-zinc-400">Click a metro pin to drill in.</div>
                <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 font-mono text-[11px] text-zinc-200">
                  <div>Subscribers <span className="text-white">{fmt(totalSubs)}</span></div>
                  <div>Homes Passed <span className="text-white">{fmt(Math.round(totalSubs * 2.88))}</span></div>
                  <div>COs <span className="text-white">{METRO_AGGREGATE.centralOffices}</span></div>
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

        <div>
          <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
            Top Issues
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

        <PlatformList showSources={showSources} onToggleSources={onToggleSources} />

        <div className="flex gap-2 pt-1">
          <button
            onClick={onReset}
            className="flex-1 rounded-sm border border-white/15 bg-white/5 px-2 py-1.5 text-[11px] font-medium text-zinc-200 transition hover:bg-white/10"
          >
            Reset
          </button>
          <button
            onClick={onStartStory}
            className="flex-1 rounded-sm border border-axon-blue/60 bg-axon-blue/15 px-2 py-1.5 text-[11px] font-medium text-axon-blue transition hover:bg-axon-blue/30"
          >
            Story
          </button>
          <button
            onClick={onToggleKPIs}
            className="flex-1 rounded-sm border border-emerald-500/50 bg-emerald-500/10 px-2 py-1.5 text-[11px] font-medium text-emerald-400 transition hover:bg-emerald-500/20"
          >
            KPIs
          </button>
        </div>
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

  // Planet level — surface metro-level issues
  METROS.filter((m) => m.status !== 'healthy').forEach((m) => {
    out.push({
      id: `metro-${m.id}`,
      severity: m.status,
      title: m.name,
      detail: m.status === 'alarm' ? 'Multiple COs reporting incidents' : 'Elevated regional alarms'
    });
  });
  if (out.length === 0) out.push({ id: 'all-ok', severity: 'healthy', title: 'Network nominal', detail: 'No regional incidents' });
  return out;
}
