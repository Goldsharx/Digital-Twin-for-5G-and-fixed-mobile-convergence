export const ALGORITHMS = [
  { id: '#027', name: 'GPON optical budget calculator', team: 'ds', status: 'active', scope: 'ont' },
  { id: '#043', name: 'DSL line quality predictor', team: 'ds', status: 'active', scope: 'co' },
  { id: '#089', name: 'Statistical anomaly detector', team: 'ds', status: 'active', scope: 'metro' },
  { id: '#127', name: 'PON power budget analyzer', team: 'ds', status: 'active', scope: 'ont' },
  { id: '#156', name: 'Fiber fault locator (OTDR)', team: 'ds', status: 'active', scope: 'co' },
  { id: '#203', name: 'Laser degradation predictor', team: 'ds', status: 'active', scope: 'ont' },
  { id: '#218', name: 'Noise floor trend analyzer', team: 'ds', status: 'available', scope: 'ont' },
  { id: '#276', name: 'Subscriber churn scorer', team: 'ds', status: 'available', scope: 'ont' },
  { id: '#305', name: 'Capacity planning model', team: 'ds', status: 'available', scope: 'co' },
  { id: '#341', name: 'Wi-Fi channel optimizer', team: 'ds', status: 'active', scope: 'ont' },
  { id: '#378', name: 'Mesh backhaul quality monitor', team: 'ds', status: 'active', scope: 'ont' },
  { id: '#412', name: 'Firmware risk scorer', team: 'ds', status: 'not-wrapped', scope: 'ont' },
  { id: '#445', name: 'QoE regression model', team: 'ds', status: 'not-wrapped', scope: 'metro' },
  { id: '#489', name: 'Bandwidth utilization forecaster', team: 'ds', status: 'available', scope: 'co' },
  { id: '#512', name: 'Splitter fault correlator', team: 'ds', status: 'not-wrapped', scope: 'co' },
];

export const AI_AGENTS = [
  { id: 'noc-persona', name: 'NOC Persona', capability: 'Auto-diagnose faults, escalate, create tickets', status: 'prototype', team: 'ai' },
  { id: 'support-persona', name: 'Support Persona', capability: 'Generate subscriber reports, suggest fixes', status: 'not-built', team: 'ai' },
  { id: 'self-heal-squad', name: 'Self-Healing Squad', capability: 'Detect → Diagnose → Fix → Verify loop', status: 'not-built', team: 'ai' },
  { id: 'capacity-planner', name: 'Capacity Planner', capability: 'Predict congestion, recommend splits', status: 'not-built', team: 'ai' },
  { id: 'field-ops', name: 'Field Ops Coordinator', capability: 'Optimize truck rolls, dispatch scheduling', status: 'not-built', team: 'ai' },
  { id: 'neurosquad', name: 'Neurosquad Builder', capability: 'Compose custom agent flows per use case', status: 'not-built', team: 'ai' },
];

export function getAlgorithmsForScope(scope) {
  return ALGORITHMS.filter(a => a.scope === scope || a.scope === 'all');
}

export function getAgentsForScope() {
  return AI_AGENTS;
}
