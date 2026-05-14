import React from 'react';

export default function GlobeControls({ globeOpacity, setGlobeOpacity }) {
  return (
    <div
      className="fixed bottom-20 right-4 z-30 flex items-center gap-3 rounded-xl px-4 py-2"
      style={{ background: 'rgba(13,31,60,0.85)', backdropFilter: 'blur(12px)' }}
      data-testid="globe-controls"
    >
      <button
        className="text-[10px] font-semibold uppercase tracking-wider text-axon-teal/70 hover:text-axon-teal transition-colors whitespace-nowrap"
        onClick={() => setGlobeOpacity(globeOpacity > 0.3 ? 0.08 : 1.0)}
        title={globeOpacity > 0.3 ? 'Switch to Network View' : 'Show Earth'}
      >
        {globeOpacity > 0.3 ? '⬡ Network' : '🌍 Earth'}
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={Math.round(globeOpacity * 100)}
        onChange={(e) => setGlobeOpacity(Number(e.target.value) / 100)}
        className="w-20 h-1 accent-axon-teal cursor-pointer"
        title="Globe Opacity"
        data-testid="globe-opacity-slider"
      />
      <span className="text-[10px] text-white/40 w-7 text-right font-mono">
        {Math.round(globeOpacity * 100)}%
      </span>
    </div>
  );
}
