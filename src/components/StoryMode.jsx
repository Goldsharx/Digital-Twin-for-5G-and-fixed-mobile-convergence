import React, { useEffect } from 'react';
import { METROS } from '../data/metros.js';
import { CENTRAL_OFFICES } from '../data/centralOffices.js';
import { generateGPONTree } from '../data/generators.js';

const STEPS = [
  {
    title: 'The Shared Reality',
    reality: 'From fog to alignment',
    narration:
      '881K subscribers across 16 states. Five metros. Five platforms that don\'t talk to each other. Right now, every team — NOC, engineering, finance, product — has their own version of the truth. The twin doesn\'t add a tool. It removes the fog. When everyone sees the same reality, the only question left is: how do we row toward the goal together?',
    camera: { lat: 39.0, lng: -98.0, height: 8_000_000 },
    action: (ctx) => {
      ctx.setFocusedMetroId(null);
      ctx.setFocusedCOId(null);
      ctx.setSelection(null);
      ctx.setShowSubscriber360(false);
    }
  },
  {
    title: 'Denver Metro — One Reality, Three Perspectives',
    reality: 'NOC sees alarms. CFO sees revenue. CX sees experience. Same data.',
    narration:
      '12 central offices, 285K subscribers. The NOC team sees alarm counts and firmware issues. The CFO sees $28M from Lumen and capacity costs. The product team sees a 94/100 Wi-Fi score. Nobody is wrong — they\'re all looking at the same metro from different altitudes. The twin gives each team their view without creating separate truths.',
    camera: { lat: 39.74, lng: -104.99, height: 80_000 },
    action: (ctx) => {
      ctx.setFocusedMetroId('denver');
      ctx.setFocusedCOId(null);
      const m = METROS.find((mm) => mm.id === 'denver');
      ctx.setSelection({ type: 'metro', id: 'denver', data: m });
    }
  },
  {
    title: 'LoDo CO — Where Blame Dies',
    reality: 'Source provenance replaces finger-pointing',
    narration:
      '12,200 subscribers, 192 PON ports. Every data field has a badge showing which platform owns it. When an alarm fires, nobody asks "whose system said that?" — the provenance is right there. The blue dots are what Orchestrator sees. The grey marks are what\'s missing. Honesty about gaps kills politics faster than any reorg.',
    camera: { lat: 39.7530, lng: -105.0000, height: 4_000 },
    action: (ctx) => {
      ctx.setFocusedMetroId('denver');
      ctx.setFocusedCOId('co-den-lodo');
      const co = CENTRAL_OFFICES.find((c) => c.id === 'co-den-lodo');
      ctx.setSelection({ type: 'co', id: co.id, data: co });
    }
  },
  {
    title: 'The Invisible Layer — Now Visible',
    reality: 'What you can see, you can fix. What you can\'t, you fight about.',
    narration:
      'Passive optical splitters — no power, no electronics. This is the invisible infrastructure between CO and home that nobody owns until it breaks. The install team says it\'s the NOC\'s problem. The NOC says it\'s the vendor\'s. When the topology is visible, the conversation changes: "Splitter cabinet on 16th and Wazee has 4 alarms — let\'s send someone."',
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
    title: 'The Demarcation — Where Responsibility Meets',
    reality: 'Five platforms, one subscriber. The twin ends "not my system."',
    narration:
      'RX power from Orchestrator. Firmware from CloudCheck. Mobile line from Greenwave. Install date from Inventory. Today these live in four different tools behind four different logins. A support call means four tabs and a prayer. The twin shows what\'s connected AND what\'s missing — because an honest gap is better than a confident guess.',
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
    title: 'Inside the Home — The Customer\'s Reality',
    reality: 'The subscriber doesn\'t care about your org chart',
    narration:
      'W1700K router, Wi-Fi 7, mesh pods, three frequency bands. The customer sees one thing: does my internet work? They don\'t know about the NOC, the splitter, or the firmware version. But when their stream buffers during the game, five teams start blaming each other. The twin traces the problem from living room to OLT in seconds. Root cause, not root blame.',
    camera: null,
    cameraFromOnt: true,
    action: () => {}
  },
  {
    title: 'Subscriber 360° — One View, Every Truth',
    reality: 'The boundary object — where all perspectives converge',
    narration:
      'Five platforms, one subscriber, one view. This is the boundary object. The NOC sees firmware and optical power. The CFO sees a $89/month subscriber at risk of churning. Customer success sees three truck rolls in two months. Nobody is looking at "their" data anymore — they\'re all looking at Mrs. Johnson. The goal becomes: keep Mrs. Johnson. Not: protect my silo.',
    camera: null,
    cameraFromOnt: true,
    action: (ctx) => {
      ctx.setShowSubscriber360(true);
    }
  },
  {
    title: 'The Path Forward — Same Boat, Same Direction',
    reality: 'AI doesn\'t replace people. Shared reality aligns them.',
    narration:
      'From L2 to L4: every gap becomes a field, every field becomes a signal, every signal becomes an action. 400 algorithms running where they\'re needed — not to replace the 50-person DS team, but to give them superpowers. 6 Neurosquads that catch problems before the customer calls. And a shared reality where the only question is: how do we row toward the goal together?',
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
        {current.reality && (
          <div className="mt-0.5 text-[10.5px] font-medium italic text-axon-teal/80">
            {current.reality}
          </div>
        )}
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
