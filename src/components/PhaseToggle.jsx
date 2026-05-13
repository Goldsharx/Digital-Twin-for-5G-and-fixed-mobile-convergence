import React from 'react';

const PHASES = [
  { id: 'people', label: 'People', color: 'emerald', desc: 'Collaboration layer' },
  { id: 'systems', label: 'Systems', color: 'blue', desc: 'Data integration' },
  { id: 'agents', label: 'AI Agents', color: 'purple', desc: 'Autonomous ops' }
];

const COLOR_MAP = {
  emerald: { active: 'bg-emerald-600 text-white border-emerald-500', ring: 'ring-emerald-400/30' },
  blue: { active: 'bg-blue-600 text-white border-blue-500', ring: 'ring-blue-400/30' },
  purple: { active: 'bg-purple-600 text-white border-purple-500', ring: 'ring-purple-400/30' }
};

export default function PhaseToggle({ phase, setPhase }) {
  return (
    <div className="pointer-events-auto flex items-center gap-0.5 rounded-md border border-white/10 bg-axon-deep/80 p-0.5 backdrop-blur-sm">
      {PHASES.map((p) => {
        const active = phase === p.id;
        const cm = COLOR_MAP[p.color];
        return (
          <button
            key={p.id}
            onClick={() => setPhase(p.id)}
            title={p.desc}
            className={`rounded-sm px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-wider transition
              ${active ? `${cm.active} ring-2 ${cm.ring}` : 'border border-transparent text-zinc-400 hover:text-white'}`}
          >
            {p.label}
          </button>
        );
      })}
    </div>
  );
}
