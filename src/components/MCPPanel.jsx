import React, { useState } from 'react';

const MCP_ENDPOINTS = [
  {
    id: 'network-health',
    name: 'network.health',
    method: 'GET',
    description: 'Real-time network health score by metro, CO, or ONT scope',
    pricing: '$0.002/query',
    latency: '< 200ms',
    example: '{ "scope": "metro:denver", "metrics": ["health_score", "alarm_count"] }',
    consumers: ['NOC dashboards', 'Customer AI agents', 'SLA monitors'],
  },
  {
    id: 'topology-query',
    name: 'topology.query',
    method: 'GET',
    description: 'GPON topology traversal — OLTs, splitters, ONTs, gateways',
    pricing: '$0.005/query',
    latency: '< 500ms',
    example: '{ "root": "co:denver-downtown", "depth": 3, "include": ["ont", "gateway"] }',
    consumers: ['Planning tools', 'Capacity models', 'GIS systems'],
  },
  {
    id: 'subscriber-analytics',
    name: 'subscriber.analytics',
    method: 'GET',
    description: 'Aggregated subscriber experience metrics — ARPU, churn risk, QoE',
    pricing: '$0.008/query',
    latency: '< 1s',
    example: '{ "metro": "salt-lake-city", "metrics": ["arpu", "churn_risk", "qoe_score"] }',
    consumers: ['Revenue platforms', 'CRM systems', 'BI dashboards'],
  },
  {
    id: 'alarm-stream',
    name: 'alarm.stream',
    method: 'SSE',
    description: 'Real-time alarm event stream with correlation annotations',
    pricing: '$0.001/event',
    latency: 'real-time',
    example: '{ "scope": "metro:*", "severity": ["alarm", "offline"], "correlate": true }',
    consumers: ['SIEM integrations', 'Incident platforms', 'AI copilots'],
  },
  {
    id: 'capacity-forecast',
    name: 'capacity.forecast',
    method: 'POST',
    description: '90-day capacity prediction for ports, bandwidth, and subscriber growth',
    pricing: '$0.025/query',
    latency: '< 3s',
    example: '{ "co": "denver-downtown", "horizon_days": 90, "confidence": 0.95 }',
    consumers: ['CapEx planning', 'Upgrade schedulers', 'Board reports'],
  },
  {
    id: 'twin-snapshot',
    name: 'twin.snapshot',
    method: 'GET',
    description: 'Full digital twin state snapshot for a scope — JSON-LD format',
    pricing: '$0.05/snapshot',
    latency: '< 2s',
    example: '{ "scope": "metro:denver", "format": "json-ld", "include_history": false }',
    consumers: ['Compliance exports', 'Audit trails', 'Partner integrations'],
  },
];

function EndpointCard({ ep, expanded, onToggle }) {
  const methodColor = ep.method === 'SSE' ? 'text-amber-400 bg-amber-500/15' : ep.method === 'POST' ? 'text-blue-400 bg-blue-500/15' : 'text-emerald-400 bg-emerald-500/15';

  return (
    <div className="rounded-sm border border-white/5 bg-white/[0.02] transition hover:bg-white/[0.04]">
      <button onClick={onToggle} className="w-full px-2.5 py-2 text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`rounded-sm px-1 py-0.5 text-[8px] font-bold ${methodColor}`}>{ep.method}</span>
            <span className="font-mono text-[10.5px] text-zinc-100">{ep.name}</span>
          </div>
          <span className="font-mono text-[9px] text-emerald-400">{ep.pricing}</span>
        </div>
        <div className="mt-0.5 text-[9px] text-zinc-500">{ep.description}</div>
      </button>

      {expanded && (
        <div className="border-t border-white/5 px-2.5 py-2 space-y-2">
          <div>
            <div className="text-[8px] font-semibold uppercase tracking-wider text-zinc-500 mb-0.5">Example Query</div>
            <pre className="rounded-sm bg-black/30 p-1.5 font-mono text-[9px] text-axon-teal overflow-x-auto">
              {ep.example}
            </pre>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[8px] font-semibold uppercase tracking-wider text-zinc-500">Latency</div>
              <div className="font-mono text-[10px] text-zinc-300">{ep.latency}</div>
            </div>
            <div className="text-right">
              <div className="text-[8px] font-semibold uppercase tracking-wider text-zinc-500">Consumers</div>
              <div className="text-[9px] text-zinc-400">{ep.consumers.join(' · ')}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MCPPanel({ visible, onClose }) {
  const [expandedId, setExpandedId] = useState(null);

  if (!visible) return null;

  const totalEndpoints = MCP_ENDPOINTS.length;
  const avgPrice = MCP_ENDPOINTS.reduce((sum, ep) => {
    const num = parseFloat(ep.pricing.replace('$', '').replace('/query', '').replace('/event', '').replace('/snapshot', ''));
    return sum + num;
  }, 0) / totalEndpoints;

  return (
    <div className="pointer-events-auto absolute right-4 top-[10rem] z-30 w-[24rem]">
      <div className="glass flex max-h-[32rem] flex-col overflow-hidden rounded-md">
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-axon-teal">
            MCP Agent API · Data as a Service
          </div>
          <button
            onClick={onClose}
            className="rounded-sm border border-white/15 px-1.5 py-0.5 text-[10px] text-zinc-300 hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        <div className="border-b border-white/5 px-3 py-2">
          <div className="text-[10px] text-zinc-400 mb-1.5">
            Outward-facing API endpoints for customer AI systems. Per-query pricing like D&B.
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="font-mono text-sm font-semibold text-axon-teal">{totalEndpoints}</div>
              <div className="text-[8px] text-zinc-500">Endpoints</div>
            </div>
            <div>
              <div className="font-mono text-sm font-semibold text-emerald-400">$15M</div>
              <div className="text-[8px] text-zinc-500">ARR Target</div>
            </div>
            <div>
              <div className="font-mono text-sm font-semibold text-amber-400">{'<1s'}</div>
              <div className="text-[8px] text-zinc-500">Avg Latency</div>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto px-3 py-2 space-y-1.5">
          {MCP_ENDPOINTS.map((ep) => (
            <EndpointCard
              key={ep.id}
              ep={ep}
              expanded={expandedId === ep.id}
              onToggle={() => setExpandedId(expandedId === ep.id ? null : ep.id)}
            />
          ))}
        </div>

        <div className="border-t border-white/5 px-3 py-2">
          <div className="flex items-center justify-between text-[9px]">
            <span className="text-zinc-500">Protocol: MCP (Model Context Protocol)</span>
            <span className="text-zinc-500">Auth: mTLS + API Key</span>
          </div>
          <div className="mt-1 rounded-sm border border-axon-teal/20 bg-axon-teal/5 px-2 py-1.5 text-center">
            <div className="text-[10px] text-axon-teal font-semibold">Customer AI agents query AXON data in real-time</div>
            <div className="text-[9px] text-zinc-400 mt-0.5">Network health · Topology · Subscribers · Capacity · Alarms</div>
          </div>
        </div>
      </div>
    </div>
  );
}
