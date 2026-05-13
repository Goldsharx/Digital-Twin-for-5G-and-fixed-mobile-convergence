import React from 'react';

export default function Breadcrumb({ zoomLevel, focusedMetro, focusedCO, selection, onReset, onBackToMetro }) {
  const crumbs = ['Planet'];
  if (focusedMetro) crumbs.push(focusedMetro.name);
  if (focusedCO) crumbs.push(focusedCO.name);
  if (selection?.type === 'splitter') crumbs.push(`Splitter #${selection.data.ponPort + 1}`);
  if (selection?.type === 'ont') crumbs.push(`ONT ${selection.data.serial}`);

  return (
    <div className="pointer-events-none absolute bottom-[3.25rem] left-0 right-0 z-20 flex justify-center px-4">
      <div className="pointer-events-auto glass-soft flex items-center gap-2 rounded-md px-3 py-1.5 font-mono text-[11px] text-zinc-300">
        {crumbs.map((c, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="text-zinc-600">›</span>}
            <span className={i === crumbs.length - 1 ? 'text-axon-teal' : ''}>{c}</span>
          </React.Fragment>
        ))}
        <span className="ml-3 text-[10px] uppercase tracking-wider text-zinc-500">
          ({zoomLevel})
        </span>
        {focusedCO && (
          <button
            onClick={onBackToMetro}
            className="ml-3 rounded-sm border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-zinc-200 hover:bg-white/10"
          >
            ← Back to metro
          </button>
        )}
        {(focusedMetro || focusedCO) && (
          <button
            onClick={onReset}
            className="ml-2 rounded-sm border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-zinc-200 hover:bg-white/10"
          >
            🌍 Planet
          </button>
        )}
      </div>
    </div>
  );
}
