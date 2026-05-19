import React, { useState } from 'react';

const MEETING_META = {
  title: 'CTO Discovery Call — Sid Dattagupta',
  date: '2026-05-18',
  duration: '65 min',
  participants: ['Sid Dattagupta (CTO)', 'Nicolas Waern', 'David Hallas', 'Tomas Sørensen', 'Krista Robert'],
  source: 'Fireflies transcript',
};

const INSIGHT_CATEGORIES = [
  {
    id: 'problem',
    label: 'Problem Statements',
    color: 'text-red-400',
    border: 'border-red-500/30',
    bg: 'bg-red-500/5',
    items: [
      {
        quote: '"The time and space normalization and overall harmonization of the data is very, very key for any data driven platform. Otherwise this digital twin is completely useless."',
        speaker: 'Sid',
        timestamp: '14:48',
        demoMapping: 'Timeline slider + era transitions show time normalization across POPs',
        featureRef: 'TimeSlider',
      },
      {
        quote: '"In the networking world, there are many, many different POPs... those digital twins must be interconnected. You have to create a federation of the digital twins."',
        speaker: 'Sid',
        timestamp: '12:43',
        demoMapping: '7-level zoom: Planet → Metro → CO → ONT shows POP hierarchy',
        featureRef: 'Globe',
      },
      {
        quote: '"Even if you do the time previous, the dependent POP, the information in the dependent POP at exactly the same time, maybe not normalized enough. So your entropy in the data is very, very key."',
        speaker: 'Sid',
        timestamp: '14:33',
        demoMapping: 'Dynamic stats recalculate per timeline year across all metros',
        featureRef: 'StatsBar',
      },
      {
        quote: '"The data lake doesn\'t solve it by default. Data lake just picks the data."',
        speaker: 'Sid',
        timestamp: '15:07',
        demoMapping: 'Architecture panel shows graph-native approach over data lake',
        featureRef: 'ArchitecturePanel',
      },
    ],
  },
  {
    id: 'tech',
    label: 'Technology Requirements',
    color: 'text-purple-400',
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/5',
    items: [
      {
        quote: '"Graph databases... they primarily used Neo4J... Tiger graph was the only one that cut it."',
        speaker: 'Sid',
        timestamp: '24:24',
        demoMapping: 'Architecture panel: Knowledge Graph layer in intelligence stack',
        featureRef: 'ArchitecturePanel',
      },
      {
        quote: '"OLT access data, optical line transport... now everybody is trying to get real-time telemetry because it adds more value."',
        speaker: 'Sid',
        timestamp: '58:57',
        demoMapping: 'GPON topology: OLTs → splitters → ONTs with live telemetry simulation',
        featureRef: 'Globe (GPON)',
      },
      {
        quote: '"Kafka queuing system... state manipulations, persistence of the states which added to the level of data consistency and integrity."',
        speaker: 'Sid',
        timestamp: '59:54',
        demoMapping: 'Event ticker shows real-time alarm stream (Kafka-style)',
        featureRef: 'EventTicker',
      },
      {
        quote: '"Edge native... privacy, security and then it\'s more closed loop federated learning."',
        speaker: 'Sid + Nicolas',
        timestamp: '07:54',
        demoMapping: 'Models panel: edge-deployed models at Home/ONT/CO layers',
        featureRef: 'ModelMapPanel',
      },
      {
        quote: '"Multi-agentic systems... you have to have a delegate for all these individual POPs and locations to have their own digital twin."',
        speaker: 'Sid',
        timestamp: '13:31',
        demoMapping: 'Neurosquad panel: 6 AI agent squads with per-scope deployment',
        featureRef: 'NeurosquadPanel',
      },
    ],
  },
  {
    id: 'business',
    label: 'Business Anchors',
    color: 'text-emerald-400',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/5',
    items: [
      {
        quote: '"Churn and ARPU... How do we reduce churn and how do we increase the average revenue per user?"',
        speaker: 'Sid',
        timestamp: '47:30',
        demoMapping: 'KPI panel: Churn Reduction 18% ($6.1M/yr) + ARPU Lift +$8/mo ($5.2M/yr)',
        featureRef: 'KPIPanel',
      },
      {
        quote: '"Not staring at the data, not staring at the data harmonization and looking at the business impact and also anchor it at the CFO level."',
        speaker: 'Nicolas (agreed by Sid)',
        timestamp: '58:12',
        demoMapping: 'CFO role view: EBITDA, CapEx, ROI projections per operator',
        featureRef: 'Role: CFO',
      },
      {
        quote: '"Churn happens when you\'re pissed off at the operator."',
        speaker: 'Sid',
        timestamp: '48:24',
        demoMapping: 'CX role view: NPS, App Rating, Complaints, Self-Service Rate',
        featureRef: 'Role: CX',
      },
    ],
  },
  {
    id: 'vision',
    label: 'Strategic Vision',
    color: 'text-axon-teal',
    border: 'border-axon-teal/30',
    bg: 'bg-axon-teal/5',
    items: [
      {
        quote: '"Moving from proprietary hardware-software systems to decoupled, distributed models... cloud to edge."',
        speaker: 'Nicolas + Sid',
        timestamp: '48:00',
        demoMapping: 'AN Level gauge: L0 (proprietary) → L5 (autonomous), timeline-reactive',
        featureRef: 'ArchitecturePanel',
      },
      {
        quote: '"My expertise is to bridge all the knowledge that you have... into the Digital Twin space."',
        speaker: 'Nicolas',
        timestamp: '46:06',
        demoMapping: 'Source provenance badges: which AXON platform owns each data field',
        featureRef: 'DeviceDetail',
      },
    ],
  },
];

const COVERAGE_STATS = {
  totalInsights: INSIGHT_CATEGORIES.reduce((acc, c) => acc + c.items.length, 0),
  mappedToDemo: INSIGHT_CATEGORIES.reduce((acc, c) => acc + c.items.filter(i => i.demoMapping).length, 0),
  uniqueFeatures: [...new Set(INSIGHT_CATEGORIES.flatMap(c => c.items.map(i => i.featureRef)))].length,
};

function InsightCard({ item, expanded, onToggle }) {
  return (
    <div
      className="cursor-pointer rounded-sm border border-white/5 bg-white/[0.02] px-3 py-2 transition hover:bg-white/[0.04]"
      onClick={onToggle}
    >
      <div className="text-[10px] italic text-zinc-300 leading-relaxed">
        {item.quote}
      </div>
      <div className="mt-1 flex items-center gap-2 text-[9px] text-zinc-500">
        <span>— {item.speaker}</span>
        <span className="text-zinc-600">@{item.timestamp}</span>
      </div>
      {expanded && (
        <div className="mt-2 rounded-sm border border-axon-teal/20 bg-axon-teal/5 px-2 py-1.5">
          <div className="text-[9px] font-semibold uppercase tracking-widest text-axon-teal/70 mb-0.5">
            Demo Mapping
          </div>
          <div className="text-[10px] text-axon-teal">{item.demoMapping}</div>
          <div className="mt-1 text-[9px] text-zinc-500">Feature: {item.featureRef}</div>
        </div>
      )}
    </div>
  );
}

export default function CTOMeetingPanel({ visible, onClose }) {
  const [expandedId, setExpandedId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('problem');

  if (!visible) return null;

  const category = INSIGHT_CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div className="absolute right-4 top-[7rem] z-40 flex max-h-[calc(100vh-10rem)] w-[420px] flex-col rounded-sm border border-white/10 bg-axon-deep/95 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
            <span className="text-[11px] font-semibold text-white">CTO Meeting Insights</span>
          </div>
          <div className="mt-0.5 text-[9px] text-zinc-500">
            {MEETING_META.date} · {MEETING_META.duration} · {MEETING_META.participants.length} attendees
          </div>
        </div>
        <button onClick={onClose} className="text-zinc-500 transition hover:text-white">✕</button>
      </div>

      <div className="border-b border-white/5 px-4 py-2">
        <div className="flex items-center gap-3 text-[10px]">
          <span className="text-zinc-500">Coverage:</span>
          <span className="font-mono text-emerald-400">{COVERAGE_STATS.mappedToDemo}/{COVERAGE_STATS.totalInsights} mapped</span>
          <span className="text-zinc-600">·</span>
          <span className="font-mono text-axon-teal">{COVERAGE_STATS.uniqueFeatures} features</span>
          <span className="text-zinc-600">·</span>
          <span className="font-mono text-emerald-400">{Math.round(COVERAGE_STATS.mappedToDemo / COVERAGE_STATS.totalInsights * 100)}%</span>
        </div>
      </div>

      <div className="flex border-b border-white/5">
        {INSIGHT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex-1 px-2 py-2 text-[9px] font-medium uppercase tracking-wider transition ${
              activeCategory === cat.id
                ? `${cat.color} border-b-2 ${cat.border.replace('border-', 'border-b-')}`
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {cat.label.split(' ')[0]}
            <span className="ml-1 font-mono text-zinc-600">{cat.items.length}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {category?.items.map((item, i) => (
          <InsightCard
            key={i}
            item={item}
            expanded={expandedId === `${activeCategory}-${i}`}
            onToggle={() => setExpandedId(expandedId === `${activeCategory}-${i}` ? null : `${activeCategory}-${i}`)}
          />
        ))}
      </div>

      <div className="border-t border-white/5 px-4 py-2">
        <div className="text-[9px] text-zinc-600 text-center">
          Source: Fireflies · {MEETING_META.title} · Click insights to see demo mapping
        </div>
      </div>
    </div>
  );
}
