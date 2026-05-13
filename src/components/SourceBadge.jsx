import React from 'react';
import { PLATFORMS } from '../data/constants.js';

export default function SourceBadge({ platform, missing = false }) {
  const p = PLATFORMS[platform];
  if (!p) return null;
  const dotStyle = {
    backgroundColor: missing ? 'transparent' : p.color,
    borderColor: p.color
  };
  return (
    <span
      title={missing ? `${p.name} (not connected)` : `Source: ${p.name} (${p.db})`}
      className={`inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider ${
        missing ? 'text-zinc-500' : 'text-zinc-200'
      }`}
      style={{
        borderColor: missing ? '#4b5563' : `${p.color}55`,
        backgroundColor: missing ? 'transparent' : `${p.color}18`
      }}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full border"
        style={dotStyle}
      />
      {p.short}
      {missing && ' —'}
    </span>
  );
}
