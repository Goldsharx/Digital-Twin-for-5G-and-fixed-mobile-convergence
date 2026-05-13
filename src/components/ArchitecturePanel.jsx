import React from 'react';
import { PLATFORMS } from '../data/constants.js';

const PLATFORM_LIST = ['orchestrator', 'cloudcheck', 'expresse', 'greenwave', 'inventory'];

const LAYERS = [
  { id: 'algorithms', label: '400 Algorithms', sub: 'Rule-based ML · Anomaly detection · Regression', color: '#3b82f6' },
  { id: 'kg', label: 'Knowledge Graph', sub: 'Topology + telemetry + customer context unified', color: '#22c55e' },
  { id: 'agents', label: 'AI Agent Layer', sub: 'Agentic personas · Neurosquads · Orchestrator', color: '#8b5cf6' },
  { id: 'twin', label: 'Digital Twin', sub: 'Physical + logical + simulation · Past/Present/Future', color: '#06b6d4' },
];

export default function ArchitecturePanel({ visible, onClose, year }) {
  if (!visible) return null;

  const unifiedPct = year <= 2025 ? 15 : year <= 2026 ? 30 : year <= 2027 ? 55 : year <= 2028 ? 80 : 95;

  return (
    <div className="pointer-events-auto absolute right-4 top-[10rem] z-30 w-[22rem]">
      <div className="glass rounded-md">
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-axon-teal">
            Platform Architecture
          </div>
          <button
            onClick={onClose}
            className="rounded-sm border border-white/15 px-1.5 py-0.5 text-[10px] text-zinc-300 hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 p-3">
          <div>
            <div className="mb-1.5 text-[9px] font-semibold uppercase tracking-widest text-zinc-500">
              Source Platforms
            </div>
            <div className="space-y-1">
              {PLATFORM_LIST.map((key) => {
                const p = PLATFORMS[key];
                const connected = ['orchestrator', 'cloudcheck', 'expresse'].includes(key);
                return (
                  <div key={key} className="flex items-center gap-2">
                    <div
                      className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: p.color }}
                    />
                    <div className="flex-1 text-[10px] text-zinc-300">{p.name}</div>
                    <div className="font-mono text-[9px] text-zinc-500">{p.db}</div>
                    <div className={`text-[9px] ${connected ? 'text-status-healthy' : 'text-zinc-600'}`}>
                      {connected ? '●' : '○'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col items-center gap-0.5 py-1">
            <div className="h-4 w-px bg-zinc-600" />
            <div className="rounded-sm border border-zinc-600 px-2 py-0.5 text-[8px] font-mono text-zinc-400">
              ETL · API · Event Streams
            </div>
            <div className="h-4 w-px bg-zinc-600" />
          </div>

          <div>
            <div className="mb-1.5 text-[9px] font-semibold uppercase tracking-widest text-zinc-500">
              Intelligence Stack
            </div>
            <div className="space-y-1">
              {LAYERS.map((layer) => (
                <div
                  key={layer.id}
                  className="rounded-sm border px-2 py-1.5"
                  style={{
                    borderColor: `${layer.color}33`,
                    backgroundColor: `${layer.color}08`
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: layer.color }}
                    />
                    <span className="text-[10px] font-semibold text-zinc-200">{layer.label}</span>
                  </div>
                  <div className="ml-3.5 text-[9px] text-zinc-500">{layer.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[9px] font-semibold uppercase tracking-widest text-zinc-500">
                Unification Progress
              </span>
              <span className="font-mono text-[10px] text-axon-teal">{unifiedPct}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-axon-blue to-axon-teal transition-all duration-700"
                style={{ width: `${unifiedPct}%` }}
              />
            </div>
            <div className="mt-0.5 flex justify-between font-mono text-[8px] text-zinc-600">
              <span>Fragmented</span>
              <span>Unified Twin</span>
            </div>
          </div>

          <div className="rounded-sm border border-white/5 bg-white/[0.02] px-2 py-1.5">
            <div className="text-[9px] font-semibold uppercase tracking-widest text-zinc-500">Methodology</div>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex h-6 flex-1 overflow-hidden rounded-sm">
                <div className="flex items-center justify-center bg-blue-500/20 text-[8px] font-bold text-blue-400" style={{ width: '90%' }}>
                  90% Algorithms
                </div>
                <div className="flex items-center justify-center bg-purple-500/30 text-[8px] font-bold text-purple-400" style={{ width: '10%' }} />
              </div>
              <span className="text-[9px] text-zinc-500 whitespace-nowrap">MAGS</span>
            </div>
            <div className="mt-0.5 text-[8px] text-zinc-600">
              90% data science substrate · 10% LLM reasoning surface
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
