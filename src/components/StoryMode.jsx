import React, { useEffect } from 'react';
import { METROS } from '../data/metros.js';
import { CENTRAL_OFFICES } from '../data/centralOffices.js';
import { generateGPONTree } from '../data/generators.js';

const STEPS = [
  {
    title: 'The footprint',
    narration:
      'AXON manages Quantum Fiber\'s network across 16 states, serving 1.1 million subscribers. Five core metros. One twin.',
    camera: { lat: 39.0, lng: -98.0, height: 8_000_000 },
    action: (ctx) => {
      ctx.setFocusedMetroId(null);
      ctx.setFocusedCOId(null);
      ctx.setSelection(null);
      ctx.setShowSubscriber360(false);
    }
  },
  {
    title: 'Denver Metro',
    narration:
      'Denver: 285,000 subscribers across 12 central offices. Each CO is a real building serving real homes.',
    camera: { lat: 39.74, lng: -104.99, height: 80_000 },
    action: (ctx) => {
      ctx.setFocusedMetroId('denver');
      ctx.setFocusedCOId(null);
      const m = METROS.find((mm) => mm.id === 'denver');
      ctx.setSelection({ type: 'metro', id: 'denver', data: m });
    }
  },
  {
    title: 'LoDo Central Office',
    narration:
      'LoDo CO serves 12,200 subscribers via 192 PON ports. XGS-PON aggregation. Nokia 7360 ISAM FX hardware.',
    camera: { lat: 39.7530, lng: -105.0000, height: 4_000 },
    action: (ctx) => {
      ctx.setFocusedMetroId('denver');
      ctx.setFocusedCOId('co-den-lodo');
      const co = CENTRAL_OFFICES.find((c) => c.id === 'co-den-lodo');
      ctx.setSelection({ type: 'co', id: co.id, data: co });
    }
  },
  {
    title: 'GPON splitter',
    narration:
      'Each GPON splitter serves 32 (or 64 with XGS-PON) homes via passive optical fiber. No power. No active electronics. Just light.',
    camera: { lat: 39.7530, lng: -105.0000, height: 1_500 },
    action: (ctx) => {
      ctx.setFocusedMetroId('denver');
      ctx.setFocusedCOId('co-den-lodo');
      const co = CENTRAL_OFFICES.find((c) => c.id === 'co-den-lodo');
      const tree = generateGPONTree(co, { maxPorts: 6 });
      ctx.setSelection({ type: 'splitter', id: tree.splitters[0].id, data: tree.splitters[0] });
    }
  },
  {
    title: 'A subscriber\'s ONT',
    narration:
      'A Q1000K SmartNID — RX power, firmware, plan, status, all live. This is the demarcation between AXON and the home.',
    camera: null,
    cameraFromOnt: true,
    action: (ctx) => {
      ctx.setFocusedMetroId('denver');
      ctx.setFocusedCOId('co-den-lodo');
      const co = CENTRAL_OFFICES.find((c) => c.id === 'co-den-lodo');
      const tree = generateGPONTree(co, { maxPorts: 6 });
      const ont = tree.onts.find((o) => o.status === 'healthy') || tree.onts[0];
      ctx.setSelection({ type: 'ont', id: ont.id, data: ont });
      ctx.flyTo(ont.lat, ont.lng, 350, 2.5);
    }
  },
  {
    title: 'Inside the home — Wi-Fi 7',
    narration:
      'W1700K Wi-Fi 7 router with mesh pods. Tri-band MLO. 6 GHz at 320 MHz. Connected devices: phones, TVs, IoT — all visible.',
    camera: null,
    cameraFromOnt: true,
    action: () => {
      // selection already set on previous step
    }
  },
  {
    title: 'Subscriber 360°',
    narration:
      'Today this data lives in 5 separate platforms. The grey ? fields are the data that\'s missing — because the silos aren\'t talking yet.',
    camera: null,
    cameraFromOnt: true,
    action: (ctx) => {
      ctx.setShowSubscriber360(true);
    }
  },
  {
    title: 'The twin is reality',
    narration:
      'Tomorrow, every field is filled in by the graph twin. MCP makes it queryable by any agent. This is what AXON is building.',
    camera: { lat: 39.0, lng: -98.0, height: 8_000_000 },
    action: (ctx) => {
      ctx.setShowSubscriber360(false);
      ctx.setFocusedMetroId(null);
      ctx.setFocusedCOId(null);
      ctx.setSelection(null);
    }
  }
];

export default function StoryMode({ step, onStep, onExit, flyTo, setFocusedMetroId, setFocusedCOId, setSelection, setShowSubscriber360 }) {
  const current = STEPS[step];

  useEffect(() => {
    if (!current) return;
    const ctx = { setFocusedMetroId, setFocusedCOId, setSelection, setShowSubscriber360, flyTo };
    current.action?.(ctx);
    if (current.camera) {
      flyTo(current.camera.lat, current.camera.lng, current.camera.height, 2.5);
    }
  }, [step]);

  if (!current) return null;

  return (
    <div className="absolute bottom-[3.5rem] left-1/2 z-30 -translate-x-1/2 px-4">
      <div className="glass max-w-2xl rounded-md px-5 py-3.5">
        <div className="flex items-center justify-between gap-4">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-axon-teal">
            Story Mode · Step {step + 1} / {STEPS.length}
          </div>
          <button
            onClick={onExit}
            className="rounded-sm border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-zinc-200 hover:bg-white/10"
          >
            Exit
          </button>
        </div>
        <div className="mt-1.5 text-base font-semibold text-white">{current.title}</div>
        <div className="mt-1 text-[12.5px] leading-relaxed text-zinc-200">
          {current.narration}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button
            disabled={step === 0}
            onClick={() => onStep(Math.max(0, step - 1))}
            className="rounded-sm border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium text-zinc-200 transition hover:bg-white/10 disabled:opacity-40"
          >
            ← Previous
          </button>
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => onStep(step + 1)}
              className="rounded-sm border border-axon-teal/60 bg-axon-teal/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-axon-teal transition hover:bg-axon-teal/25"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={onExit}
              className="rounded-sm border border-axon-teal/60 bg-axon-teal/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-axon-teal transition hover:bg-axon-teal/25"
            >
              Finish
            </button>
          )}
          <div className="ml-2 flex items-center gap-1">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1 w-5 rounded-full ${i === step ? 'bg-axon-teal' : 'bg-white/15'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
