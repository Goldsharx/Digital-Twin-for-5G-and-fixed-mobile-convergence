import React, { useState, useMemo } from 'react';

const MODEL_LAYERS = [
  {
    id: 'home-edge',
    name: 'Home Edge',
    scope: 'Gateway · Mesh · IoT',
    icon: '🏠',
    color: 'border-blue-500/40 bg-blue-500/10',
    latency: '<1ms',
    compute: 'On-device',
    models: [
      { id: 'wifi-channel-2g', name: 'Wi-Fi Channel Selection — 2.4 GHz', type: 'optimization', status: 'active' },
      { id: 'wifi-channel-5g', name: 'Wi-Fi Channel Selection — 5 GHz', type: 'optimization', status: 'active' },
      { id: 'wifi-channel-6g', name: 'Wi-Fi Channel Selection — 6 GHz', type: 'optimization', status: 'active' },
      { id: 'client-steer-band', name: 'Client Band Steering', type: 'classification', status: 'active' },
      { id: 'client-steer-ap', name: 'Client AP Steering', type: 'classification', status: 'active' },
      { id: 'client-steer-mesh', name: 'Mesh Pod Steering', type: 'optimization', status: 'active' },
      { id: 'qoe-tv', name: 'QoE Prediction — TV/Streaming', type: 'prediction', status: 'active' },
      { id: 'qoe-gaming', name: 'QoE Prediction — Gaming', type: 'prediction', status: 'active' },
      { id: 'qoe-iot', name: 'QoE Prediction — IoT', type: 'prediction', status: 'active' },
      { id: 'qoe-work', name: 'QoE Prediction — Work/Video', type: 'prediction', status: 'active' },
      { id: 'interference-ssid', name: 'Interference — Neighbor SSID', type: 'classification', status: 'active' },
      { id: 'interference-micro', name: 'Interference — Microwave/BT', type: 'classification', status: 'active' },
      { id: 'interference-radar', name: 'Interference — DFS Radar', type: 'classification', status: 'active' },
      { id: 'anomaly-latency', name: 'Anomaly Detection — Latency', type: 'anomaly', status: 'active' },
      { id: 'anomaly-jitter', name: 'Anomaly Detection — Jitter', type: 'anomaly', status: 'active' },
      { id: 'anomaly-packetloss', name: 'Anomaly Detection — Packet Loss', type: 'anomaly', status: 'active' },
      { id: 'mesh-topo', name: 'Mesh Topology Optimizer', type: 'optimization', status: 'active' },
      { id: 'mesh-backhaul', name: 'Mesh Backhaul Route Selection', type: 'optimization', status: 'active' },
      { id: 'device-fingerprint', name: 'Device Fingerprinting', type: 'classification', status: 'active' },
      { id: 'device-category', name: 'Device Category Classifier', type: 'classification', status: 'active' },
      { id: 'iot-baseline-camera', name: 'IoT Baseline — Camera', type: 'anomaly', status: 'active' },
      { id: 'iot-baseline-thermo', name: 'IoT Baseline — Thermostat', type: 'anomaly', status: 'active' },
      { id: 'iot-baseline-speaker', name: 'IoT Baseline — Smart Speaker', type: 'anomaly', status: 'active' },
      { id: 'iot-baseline-lock', name: 'IoT Baseline — Smart Lock', type: 'anomaly', status: 'active' },
      { id: 'iot-baseline-appliance', name: 'IoT Baseline — Appliance', type: 'anomaly', status: 'active' },
      { id: 'selfheal-reboot', name: 'Self-Healing — Reboot Prediction', type: 'prediction', status: 'active' },
      { id: 'selfheal-channel', name: 'Self-Healing — Channel Switch', type: 'optimization', status: 'active' },
      { id: 'selfheal-firmware', name: 'Self-Healing — Firmware Compat', type: 'prediction', status: 'active' },
      { id: 'parental-classify', name: 'Content Classification', type: 'classification', status: 'active' },
      { id: 'energy-gw', name: 'Energy Consumption Optimizer', type: 'optimization', status: 'prototype' },
      { id: 'buffer-bloat', name: 'Buffer Bloat Detection', type: 'anomaly', status: 'active' },
      { id: 'airtime-fairness', name: 'Airtime Fairness Scheduler', type: 'optimization', status: 'prototype' },
      { id: 'wifi7-mlo', name: 'Wi-Fi 7 MLO Link Manager', type: 'optimization', status: 'prototype' },
    ],
  },
  {
    id: 'ont-cpe',
    name: 'ONT / CPE',
    scope: 'Subscriber Premises',
    icon: '📡',
    color: 'border-cyan-500/40 bg-cyan-500/10',
    latency: '<1ms',
    compute: 'Embedded',
    models: [
      { id: 'ont-rx-trend', name: 'RX Power Degradation Trend', type: 'prediction', status: 'active' },
      { id: 'ont-tx-trend', name: 'TX Power Trend Analysis', type: 'prediction', status: 'active' },
      { id: 'ont-temp-anomaly', name: 'Temperature Anomaly Detection', type: 'anomaly', status: 'active' },
      { id: 'ont-voltage-anomaly', name: 'Voltage Anomaly Detection', type: 'anomaly', status: 'active' },
      { id: 'ont-fw-fail', name: 'Firmware Failure Prediction', type: 'prediction', status: 'active' },
      { id: 'ont-uptime-pattern', name: 'Uptime / Reboot Pattern', type: 'anomaly', status: 'active' },
      { id: 'ont-fer-forecast', name: 'Frame Error Rate Forecasting', type: 'prediction', status: 'active' },
      { id: 'ont-dist-fault', name: 'Distance-to-Fault Estimation', type: 'prediction', status: 'active' },
      { id: 'ont-lifespan', name: 'ONT Lifespan Prediction', type: 'prediction', status: 'active' },
      { id: 'ont-provision-err', name: 'Provisioning Error Detection', type: 'anomaly', status: 'active' },
      { id: 'ont-mac-anomaly', name: 'MAC Learning Anomaly (Security)', type: 'anomaly', status: 'active' },
      { id: 'ont-bw-forecast', name: 'Bandwidth Utilization Forecast', type: 'prediction', status: 'active' },
      { id: 'ont-gpon-rx', name: 'GPON — RX Variant', type: 'prediction', status: 'active' },
      { id: 'ont-gpon-tx', name: 'GPON — TX Variant', type: 'prediction', status: 'active' },
      { id: 'ont-gpon-fer', name: 'GPON — FER Variant', type: 'prediction', status: 'active' },
      { id: 'ont-gpon-fault', name: 'GPON — Fault Variant', type: 'prediction', status: 'active' },
      { id: 'ont-gpon-life', name: 'GPON — Lifespan Variant', type: 'prediction', status: 'active' },
      { id: 'ont-xgs-rx', name: 'XGS-PON — RX Variant', type: 'prediction', status: 'active' },
      { id: 'ont-xgs-tx', name: 'XGS-PON — TX Variant', type: 'prediction', status: 'active' },
      { id: 'ont-xgs-fer', name: 'XGS-PON — FER Variant', type: 'prediction', status: 'active' },
      { id: 'ont-xgs-fault', name: 'XGS-PON — Fault Variant', type: 'prediction', status: 'active' },
      { id: 'ont-xgs-life', name: 'XGS-PON — Lifespan Variant', type: 'prediction', status: 'active' },
      { id: 'ont-ngpon-rx', name: 'NG-PON2 — RX Variant', type: 'prediction', status: 'prototype' },
      { id: 'ont-ngpon-tx', name: 'NG-PON2 — TX Variant', type: 'prediction', status: 'prototype' },
      { id: 'ont-ngpon-fer', name: 'NG-PON2 — FER Variant', type: 'prediction', status: 'prototype' },
      { id: 'ont-ngpon-fault', name: 'NG-PON2 — Fault Variant', type: 'prediction', status: 'prototype' },
      { id: 'ont-ngpon-life', name: 'NG-PON2 — Lifespan Variant', type: 'prediction', status: 'prototype' },
    ],
  },
  {
    id: 'central-office',
    name: 'Central Office / OLT',
    scope: 'Edge Cloud · MEC',
    icon: '🏢',
    color: 'border-emerald-500/40 bg-emerald-500/10',
    latency: '1-5ms',
    compute: 'Edge GPU',
    models: [
      { id: 'co-dba', name: 'DBA Optimization per PON Port', type: 'optimization', status: 'active' },
      { id: 'co-fault-loc', name: 'Optical Fault Localization', type: 'prediction', status: 'active' },
      { id: 'co-splitter-deg', name: 'Splitter Degradation Inference', type: 'prediction', status: 'active' },
      { id: 'co-port-util', name: 'Port Utilization Forecasting', type: 'prediction', status: 'active' },
      { id: 'co-alarm-corr', name: 'Alarm Correlation (intra-CO)', type: 'anomaly', status: 'active' },
      { id: 'co-fiber-cut', name: 'Fiber Cut Detection + Localization', type: 'anomaly', status: 'active' },
      { id: 'co-card-fail-calix', name: 'OLT Card Failure — Calix', type: 'prediction', status: 'active' },
      { id: 'co-card-fail-nokia', name: 'OLT Card Failure — Nokia', type: 'prediction', status: 'active' },
      { id: 'co-card-fail-huawei', name: 'OLT Card Failure — Huawei', type: 'prediction', status: 'prototype' },
      { id: 'co-power-anomaly', name: 'Power System Anomaly', type: 'anomaly', status: 'active' },
      { id: 'co-cooling-anomaly', name: 'Cooling System Anomaly', type: 'anomaly', status: 'active' },
      { id: 'co-capacity-port', name: 'Capacity Planning per Port', type: 'prediction', status: 'active' },
      { id: 'co-density-cluster', name: 'Subscriber Density Clustering', type: 'classification', status: 'active' },
      { id: 'co-maint-sched', name: 'Proactive Maintenance Scheduler', type: 'optimization', status: 'active' },
      { id: 'co-sla-risk', name: 'SLA Risk Scoring per Port Group', type: 'prediction', status: 'active' },
      { id: 'co-cross-port', name: 'Cross-Port Interference Detection', type: 'anomaly', status: 'active' },
      { id: 'co-gpon-suite', name: 'GPON Technology Suite (12 models)', type: 'suite', status: 'active' },
      { id: 'co-xgs-suite', name: 'XGS-PON Technology Suite (12 models)', type: 'suite', status: 'active' },
      { id: 'co-ngpon-suite', name: 'NG-PON2 Technology Suite (12 models)', type: 'suite', status: 'prototype' },
      { id: 'co-combo-suite', name: 'Combo PON Technology Suite (12 models)', type: 'suite', status: 'prototype' },
    ],
  },
  {
    id: 'cell-tower',
    name: 'Cell Tower / RAN',
    scope: '5G · 4G · Small Cells',
    icon: '📶',
    color: 'border-rose-500/40 bg-rose-500/10',
    latency: '1-10ms',
    compute: 'RAN Edge',
    models: [
      { id: 'ran-handover-4g5g', name: 'Handover Prediction — 4G↔5G', type: 'prediction', status: 'active' },
      { id: 'ran-handover-2g4g', name: 'Handover Prediction — 2G↔4G', type: 'prediction', status: 'active' },
      { id: 'ran-handover-wifi', name: 'Handover Prediction — Wi-Fi↔Cell', type: 'prediction', status: 'prototype' },
      { id: 'ran-load-balance', name: 'Load Balancing Across Sectors', type: 'optimization', status: 'active' },
      { id: 'ran-beam-steer', name: '5G MIMO Beam Steering', type: 'optimization', status: 'active' },
      { id: 'ran-interference', name: 'Inter-Cell Interference Mgmt', type: 'optimization', status: 'active' },
      { id: 'ran-coverage-hole', name: 'Coverage Hole Detection', type: 'anomaly', status: 'active' },
      { id: 'ran-demand-forecast', name: 'Capacity vs Demand per Sector', type: 'prediction', status: 'active' },
      { id: 'ran-hw-fail-ericsson', name: 'HW Failure — Ericsson', type: 'prediction', status: 'active' },
      { id: 'ran-hw-fail-nokia', name: 'HW Failure — Nokia', type: 'prediction', status: 'active' },
      { id: 'ran-hw-fail-samsung', name: 'HW Failure — Samsung', type: 'prediction', status: 'prototype' },
      { id: 'ran-energy-sleep', name: 'Energy Saving — Sleep Mode', type: 'optimization', status: 'active' },
      { id: 'ran-backhaul-util', name: 'Backhaul Utilization Optimizer', type: 'optimization', status: 'active' },
      { id: 'ran-fmc-handover', name: 'FMC Handover Scoring', type: 'prediction', status: 'prototype' },
      { id: 'ran-mobility', name: 'User Mobility Prediction', type: 'prediction', status: 'active' },
      { id: 'ran-smallcell', name: 'Small Cell Activation Trigger', type: 'optimization', status: 'active' },
      { id: 'ran-spectrum', name: 'Spectrum Efficiency Optimizer', type: 'optimization', status: 'active' },
      { id: 'ran-700', name: 'Band Variant — 700 MHz', type: 'suite', status: 'active' },
      { id: 'ran-850', name: 'Band Variant — 850 MHz', type: 'suite', status: 'active' },
      { id: 'ran-1900', name: 'Band Variant — 1900 MHz', type: 'suite', status: 'active' },
      { id: 'ran-2100', name: 'Band Variant — 2100 MHz', type: 'suite', status: 'active' },
      { id: 'ran-3500', name: 'Band Variant — 3500 MHz (C-band)', type: 'suite', status: 'active' },
      { id: 'ran-mmwave', name: 'Band Variant — mmWave', type: 'suite', status: 'prototype' },
      { id: 'ran-cband-alt', name: 'Band Variant — C-band Alt', type: 'suite', status: 'prototype' },
    ],
  },
  {
    id: 'metro-regional',
    name: 'Metro / Regional',
    scope: 'Regional Data Center',
    icon: '🌆',
    color: 'border-amber-500/40 bg-amber-500/10',
    latency: '5-20ms',
    compute: 'Cloud GPU',
    models: [
      { id: 'metro-alarm-corr', name: 'Cross-CO Alarm Correlation', type: 'anomaly', status: 'active' },
      { id: 'metro-root-cause', name: 'Root Cause Analysis Engine', type: 'anomaly', status: 'active' },
      { id: 'metro-truck-pred', name: 'Truck Roll Prediction', type: 'prediction', status: 'active' },
      { id: 'metro-truck-opt', name: 'Truck Roll Route Optimization', type: 'optimization', status: 'active' },
      { id: 'metro-churn-cohort', name: 'Churn Propensity per Cohort', type: 'prediction', status: 'active' },
      { id: 'metro-demand-hood', name: 'Demand Forecast per Neighborhood', type: 'prediction', status: 'active' },
      { id: 'metro-weather', name: 'Weather Impact Prediction', type: 'prediction', status: 'active' },
      { id: 'metro-dig-risk', name: 'Construction/Dig Event Risk', type: 'prediction', status: 'active' },
      { id: 'metro-fiber-route', name: 'Fiber Route Optimization', type: 'optimization', status: 'active' },
      { id: 'metro-capex', name: 'CapEx Allocation Optimizer', type: 'optimization', status: 'active' },
      { id: 'metro-compete', name: 'Competitive Pressure per ZIP', type: 'prediction', status: 'active' },
      { id: 'metro-nps-net', name: 'NPS from Network Telemetry', type: 'prediction', status: 'active' },
      { id: 'metro-workforce', name: 'Workforce Scheduling', type: 'optimization', status: 'active' },
      { id: 'metro-parts-inv', name: 'Parts Inventory Prediction', type: 'prediction', status: 'active' },
      { id: 'metro-aging', name: 'Aging Infrastructure Priority', type: 'prediction', status: 'active' },
      { id: 'metro-outage-dur', name: 'Outage Duration Prediction', type: 'prediction', status: 'active' },
      { id: 'metro-denver', name: 'Metro Calibrated — Denver', type: 'calibration', status: 'active' },
      { id: 'metro-slc', name: 'Metro Calibrated — Salt Lake City', type: 'calibration', status: 'active' },
      { id: 'metro-mpls', name: 'Metro Calibrated — Minneapolis', type: 'calibration', status: 'active' },
      { id: 'metro-seattle', name: 'Metro Calibrated — Seattle', type: 'calibration', status: 'active' },
      { id: 'metro-omaha', name: 'Metro Calibrated — Omaha', type: 'calibration', status: 'active' },
      { id: 'metro-phoenix', name: 'Metro Calibrated — Phoenix', type: 'calibration', status: 'planned' },
      { id: 'metro-portland', name: 'Metro Calibrated — Portland', type: 'calibration', status: 'planned' },
      { id: 'metro-dallas', name: 'Metro Calibrated — Dallas', type: 'calibration', status: 'planned' },
      { id: 'metro-kc', name: 'Metro Calibrated — Kansas City', type: 'calibration', status: 'planned' },
      { id: 'metro-austin', name: 'Metro Calibrated — Austin', type: 'calibration', status: 'planned' },
      { id: 'metro-vegas', name: 'Metro Calibrated — Las Vegas', type: 'calibration', status: 'planned' },
      { id: 'metro-sanantonio', name: 'Metro Calibrated — San Antonio', type: 'calibration', status: 'planned' },
    ],
  },
  {
    id: 'core-transport',
    name: 'Core / Transport',
    scope: 'Backbone · Peering · CDN',
    icon: '🌐',
    color: 'border-violet-500/40 bg-violet-500/10',
    latency: '10-50ms',
    compute: 'Cloud',
    models: [
      { id: 'core-bgp-anomaly', name: 'BGP Anomaly Detection', type: 'anomaly', status: 'active' },
      { id: 'core-ddos', name: 'DDoS Detection + Mitigation', type: 'anomaly', status: 'active' },
      { id: 'core-te-mpls', name: 'Traffic Engineering — MPLS', type: 'optimization', status: 'active' },
      { id: 'core-te-sr', name: 'Traffic Engineering — Segment Routing', type: 'optimization', status: 'active' },
      { id: 'core-peering-cost', name: 'Peering Cost Optimization', type: 'optimization', status: 'active' },
      { id: 'core-cdn-place', name: 'CDN Placement Optimization', type: 'optimization', status: 'active' },
      { id: 'core-latency-route', name: 'Latency Prediction per Route', type: 'prediction', status: 'active' },
      { id: 'core-backbone-cap', name: 'Backbone Capacity Planning', type: 'prediction', status: 'active' },
      { id: 'core-dns-anomaly', name: 'DNS Anomaly Detection', type: 'anomaly', status: 'active' },
      { id: 'core-ipv4-var', name: 'Protocol Variant — IPv4', type: 'suite', status: 'active' },
      { id: 'core-ipv6-var', name: 'Protocol Variant — IPv6', type: 'suite', status: 'active' },
      { id: 'core-mpls-var', name: 'Protocol Variant — MPLS', type: 'suite', status: 'active' },
      { id: 'core-sr-var', name: 'Protocol Variant — SR', type: 'suite', status: 'active' },
      { id: 'core-encrypt-oh', name: 'Encryption Overhead Prediction', type: 'prediction', status: 'active' },
      { id: 'core-interconnect', name: 'Interconnect Utilization Forecast', type: 'prediction', status: 'active' },
    ],
  },
  {
    id: 'platform-bss',
    name: 'Platform / BSS-OSS',
    scope: 'Orchestrator · Billing · CRM',
    icon: '⚙️',
    color: 'border-indigo-500/40 bg-indigo-500/10',
    latency: '50-200ms',
    compute: 'Cloud',
    models: [
      { id: 'bss-rev-assure', name: 'Revenue Assurance Anomaly', type: 'anomaly', status: 'active' },
      { id: 'bss-billing-err', name: 'Billing Error Detection', type: 'anomaly', status: 'active' },
      { id: 'bss-fraud-sub', name: 'Fraud — Subscription', type: 'anomaly', status: 'active' },
      { id: 'bss-fraud-sim', name: 'Fraud — SIM Swap', type: 'anomaly', status: 'active' },
      { id: 'bss-clv', name: 'Customer Lifetime Value', type: 'prediction', status: 'active' },
      { id: 'bss-upsell', name: 'Upsell / Cross-sell Recommender', type: 'recommendation', status: 'active' },
      { id: 'bss-plan-migrate', name: 'Plan Migration Propensity', type: 'prediction', status: 'active' },
      { id: 'bss-call-route', name: 'Contact Center Call Routing', type: 'optimization', status: 'active' },
      { id: 'bss-agent-assist', name: 'Agent Assist / Knowledge', type: 'nlp', status: 'active' },
      { id: 'bss-ticket-class', name: 'Ticket Auto-Classification', type: 'classification', status: 'active' },
      { id: 'bss-ticket-resolve', name: 'Ticket Auto-Resolution', type: 'nlp', status: 'prototype' },
      { id: 'bss-sla-breach', name: 'SLA Breach Prediction', type: 'prediction', status: 'active' },
      { id: 'bss-compliance', name: 'Regulatory Compliance Scoring', type: 'classification', status: 'active' },
      { id: 'bss-vendor-perf', name: 'Vendor Performance Scoring', type: 'prediction', status: 'active' },
      { id: 'bss-inventory-rec', name: 'Network Inventory Reconciliation', type: 'anomaly', status: 'active' },
      { id: 'bss-change-impact', name: 'Change Impact Prediction', type: 'prediction', status: 'active' },
      { id: 'bss-adapt-expresse', name: 'Adapter — Expresse', type: 'integration', status: 'active' },
      { id: 'bss-adapt-cloudcheck', name: 'Adapter — CloudCheck', type: 'integration', status: 'active' },
      { id: 'bss-adapt-orch', name: 'Adapter — Orchestrator', type: 'integration', status: 'active' },
      { id: 'bss-adapt-greenwave', name: 'Adapter — GreenWave', type: 'integration', status: 'planned' },
      { id: 'bss-adapt-inventory', name: 'Adapter — Inventory', type: 'integration', status: 'planned' },
    ],
  },
  {
    id: 'ai-agents',
    name: 'AI Agent Layer',
    scope: 'Autonomous Operations',
    icon: '🤖',
    color: 'border-purple-500/40 bg-purple-500/10',
    latency: 'Async',
    compute: 'Cloud + Federated',
    models: [
      { id: 'agent-sentinel-1', name: 'Sentinel — Proactive Incident Detection', type: 'anomaly', status: 'active' },
      { id: 'agent-sentinel-2', name: 'Sentinel — Alarm Prioritization', type: 'classification', status: 'active' },
      { id: 'agent-sentinel-3', name: 'Sentinel — Cascade Prediction', type: 'prediction', status: 'active' },
      { id: 'agent-sentinel-4', name: 'Sentinel — Auto-Remediation Gate', type: 'optimization', status: 'active' },
      { id: 'agent-sentinel-5', name: 'Sentinel — Post-Incident Analysis', type: 'nlp', status: 'active' },
      { id: 'agent-opt-1', name: 'Optimizer — Resource Allocation', type: 'optimization', status: 'active' },
      { id: 'agent-opt-2', name: 'Optimizer — Bandwidth Distribution', type: 'optimization', status: 'active' },
      { id: 'agent-opt-3', name: 'Optimizer — QoS Policy Engine', type: 'optimization', status: 'active' },
      { id: 'agent-opt-4', name: 'Optimizer — Energy Manager', type: 'optimization', status: 'prototype' },
      { id: 'agent-opt-5', name: 'Optimizer — Cost Function Tuner', type: 'optimization', status: 'prototype' },
      { id: 'agent-plan-1', name: 'Planner — CapEx Scenario Sim', type: 'simulation', status: 'active' },
      { id: 'agent-plan-2', name: 'Planner — Topology What-If', type: 'simulation', status: 'active' },
      { id: 'agent-plan-3', name: 'Planner — Growth Trajectory', type: 'prediction', status: 'active' },
      { id: 'agent-plan-4', name: 'Planner — M&A Impact Model', type: 'simulation', status: 'planned' },
      { id: 'agent-plan-5', name: 'Planner — Competitive Response', type: 'simulation', status: 'planned' },
      { id: 'agent-cx-1', name: 'CX — Experience Quality Pred.', type: 'prediction', status: 'active' },
      { id: 'agent-cx-2', name: 'CX — Proactive Engagement', type: 'recommendation', status: 'active' },
      { id: 'agent-cx-3', name: 'CX — Satisfaction Forecaster', type: 'prediction', status: 'active' },
      { id: 'agent-cx-4', name: 'CX — Retention Offer Engine', type: 'recommendation', status: 'active' },
      { id: 'agent-cx-5', name: 'CX — Sentiment Analysis', type: 'nlp', status: 'active' },
      { id: 'agent-insight-1', name: 'Insight — Trend Extractor', type: 'nlp', status: 'active' },
      { id: 'agent-insight-2', name: 'Insight — Report Generator', type: 'nlp', status: 'active' },
      { id: 'agent-insight-3', name: 'Insight — Benchmark Scorer', type: 'prediction', status: 'active' },
      { id: 'agent-insight-4', name: 'Insight — Anomaly Narrator', type: 'nlp', status: 'active' },
      { id: 'agent-insight-5', name: 'Insight — Board Briefing AI', type: 'nlp', status: 'prototype' },
      { id: 'agent-coord-1', name: 'Cross-Agent Conflict Resolution', type: 'optimization', status: 'active' },
      { id: 'agent-coord-2', name: 'Agent Priority Arbiter', type: 'optimization', status: 'active' },
      { id: 'agent-coord-3', name: 'Agent Learning Coordinator', type: 'optimization', status: 'prototype' },
      { id: 'agent-an-assess', name: 'AN Level Assessment', type: 'classification', status: 'active' },
      { id: 'agent-an-domain1', name: 'AN Assessment — Access', type: 'classification', status: 'active' },
      { id: 'agent-an-domain2', name: 'AN Assessment — Transport', type: 'classification', status: 'active' },
      { id: 'agent-an-domain3', name: 'AN Assessment — Service', type: 'classification', status: 'active' },
      { id: 'agent-an-domain4', name: 'AN Assessment — Customer', type: 'classification', status: 'active' },
      { id: 'agent-twin-sync', name: 'DT Sync Quality Monitor', type: 'anomaly', status: 'active' },
      { id: 'agent-twin-drift', name: 'DT Drift Detector', type: 'anomaly', status: 'active' },
      { id: 'agent-twin-fidelity', name: 'DT Fidelity Scorer', type: 'prediction', status: 'active' },
      { id: 'agent-whatif-1', name: 'What-If — Price Change', type: 'simulation', status: 'active' },
      { id: 'agent-whatif-2', name: 'What-If — Outage Impact', type: 'simulation', status: 'active' },
      { id: 'agent-whatif-3', name: 'What-If — Competitor Entry', type: 'simulation', status: 'active' },
      { id: 'agent-whatif-4', name: 'What-If — Tech Migration', type: 'simulation', status: 'active' },
      { id: 'agent-whatif-5', name: 'What-If — Weather Event', type: 'simulation', status: 'active' },
      { id: 'agent-region-na', name: 'Region Calibration — NA', type: 'calibration', status: 'active' },
      { id: 'agent-region-eu', name: 'Region Calibration — EU', type: 'calibration', status: 'active' },
      { id: 'agent-region-apac', name: 'Region Calibration — APAC', type: 'calibration', status: 'planned' },
      { id: 'agent-region-latam', name: 'Region Calibration — LATAM', type: 'calibration', status: 'planned' },
      { id: 'agent-region-mea', name: 'Region Calibration — MEA', type: 'calibration', status: 'planned' },
    ],
  },
  {
    id: 'business-intel',
    name: 'Business Intelligence',
    scope: 'Strategy · M&A · GTM',
    icon: '📊',
    color: 'border-yellow-500/40 bg-yellow-500/10',
    latency: 'Batch',
    compute: 'Cloud',
    models: [
      { id: 'bi-tam-sam', name: 'TAM/SAM/SOM Estimator', type: 'prediction', status: 'active' },
      { id: 'bi-compete-bench', name: 'Competitor Benchmarking', type: 'prediction', status: 'active' },
      { id: 'bi-market-entry', name: 'Market Entry Scoring', type: 'prediction', status: 'active' },
      { id: 'bi-price-elasticity', name: 'Pricing Elasticity Model', type: 'prediction', status: 'active' },
      { id: 'bi-investor-report', name: 'Investor Reporting Automation', type: 'nlp', status: 'active' },
      { id: 'bi-esg', name: 'ESG Impact Scoring', type: 'classification', status: 'prototype' },
      { id: 'bi-patent', name: 'Patent Landscape Analyzer', type: 'nlp', status: 'planned' },
      { id: 'bi-ma-target', name: 'M&A Target Scoring', type: 'prediction', status: 'planned' },
      { id: 'bi-vert-telco', name: 'Vertical Variant — Telco', type: 'calibration', status: 'active' },
      { id: 'bi-vert-cable', name: 'Vertical Variant — Cable', type: 'calibration', status: 'active' },
      { id: 'bi-vert-fiber', name: 'Vertical Variant — Fiber-only', type: 'calibration', status: 'active' },
      { id: 'bi-vert-wireless', name: 'Vertical Variant — Wireless', type: 'calibration', status: 'active' },
    ],
  },
];

const TYPE_COLORS = {
  optimization: 'text-emerald-400',
  prediction: 'text-blue-400',
  anomaly: 'text-red-400',
  classification: 'text-purple-400',
  nlp: 'text-cyan-400',
  simulation: 'text-amber-400',
  recommendation: 'text-yellow-400',
  calibration: 'text-zinc-400',
  suite: 'text-violet-400',
  integration: 'text-indigo-400',
};

const TYPE_LABELS = {
  optimization: 'OPT',
  prediction: 'PRED',
  anomaly: 'ANOM',
  classification: 'CLASS',
  nlp: 'NLP',
  simulation: 'SIM',
  recommendation: 'REC',
  calibration: 'CAL',
  suite: 'SUITE',
  integration: 'INT',
};

const STATUS_STYLE = {
  active: 'text-emerald-400',
  prototype: 'text-amber-400',
  planned: 'text-zinc-500',
};

function LayerCard({ layer, expanded, onToggle, onModelClick }) {
  const activeCount = layer.models.filter((m) => m.status === 'active').length;
  const protoCount = layer.models.filter((m) => m.status === 'prototype').length;

  return (
    <div className={`rounded-sm border ${layer.color} transition`}>
      <button onClick={onToggle} className="w-full px-2.5 py-2 text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm">{layer.icon}</span>
            <span className="text-[11px] font-semibold text-zinc-100">{layer.name}</span>
          </div>
          <span className="font-mono text-[10px] text-axon-teal">{layer.models.length}</span>
        </div>
        <div className="mt-0.5 flex items-center gap-3 text-[9px]">
          <span className="text-zinc-500">{layer.scope}</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-500">{layer.latency}</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-500">{layer.compute}</span>
        </div>
        <div className="mt-1 flex h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <div className="bg-emerald-500/60" style={{ width: `${(activeCount / layer.models.length) * 100}%` }} />
          <div className="bg-amber-500/60" style={{ width: `${(protoCount / layer.models.length) * 100}%` }} />
        </div>
      </button>

      {expanded && (
        <div className="border-t border-white/5 px-2.5 py-2 max-h-48 overflow-y-auto space-y-0.5">
          {layer.models.map((m) => (
            <button
              key={m.id}
              onClick={(e) => { e.stopPropagation(); onModelClick?.(m); }}
              className="flex w-full items-center justify-between gap-1 py-0.5 rounded-sm px-1 hover:bg-white/5 transition text-left"
            >
              <span className="truncate text-[9px] text-zinc-300">{m.name}</span>
              <div className="flex shrink-0 items-center gap-1.5">
                <span className={`text-[7px] font-bold uppercase tracking-wider ${TYPE_COLORS[m.type] || 'text-zinc-500'}`}>
                  {TYPE_LABELS[m.type] || m.type}
                </span>
                <span className={`h-1.5 w-1.5 rounded-full ${m.status === 'active' ? 'bg-emerald-400' : m.status === 'prototype' ? 'bg-amber-400' : 'bg-zinc-600'}`} />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ModelMapPanel({ visible, onClose, onModelClick }) {
  const [expandedId, setExpandedId] = useState(null);
  const [filterType, setFilterType] = useState(null);

  const stats = useMemo(() => {
    let total = 0, active = 0, proto = 0, planned = 0;
    const typeCounts = {};
    for (const layer of MODEL_LAYERS) {
      for (const m of layer.models) {
        total++;
        if (m.status === 'active') active++;
        else if (m.status === 'prototype') proto++;
        else planned++;
        typeCounts[m.type] = (typeCounts[m.type] || 0) + 1;
      }
    }
    return { total, active, proto, planned, typeCounts };
  }, []);

  if (!visible) return null;

  return (
    <div className="pointer-events-auto absolute right-4 top-[10rem] z-30 w-[24rem]">
      <div className="glass flex max-h-[calc(100vh-14rem)] flex-col overflow-hidden rounded-md">
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-axon-teal">
            DS Model Map · {stats.total} Models
          </div>
          <button
            onClick={onClose}
            className="rounded-sm border border-white/15 px-1.5 py-0.5 text-[10px] text-zinc-300 hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        <div className="border-b border-white/5 px-3 py-2">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <div className="font-mono text-lg font-semibold text-axon-teal">{stats.total}</div>
              <div className="text-[8px] text-zinc-500">Total</div>
            </div>
            <div>
              <div className="font-mono text-lg font-semibold text-emerald-400">{stats.active}</div>
              <div className="text-[8px] text-zinc-500">Active</div>
            </div>
            <div>
              <div className="font-mono text-lg font-semibold text-amber-400">{stats.proto}</div>
              <div className="text-[8px] text-zinc-500">Prototype</div>
            </div>
            <div>
              <div className="font-mono text-lg font-semibold text-zinc-500">{stats.planned}</div>
              <div className="text-[8px] text-zinc-500">Planned</div>
            </div>
          </div>
          <div className="mt-2 flex h-2 w-full overflow-hidden rounded-full bg-white/5">
            <div className="bg-emerald-500/70" style={{ width: `${(stats.active / stats.total) * 100}%` }} />
            <div className="bg-amber-500/70" style={{ width: `${(stats.proto / stats.total) * 100}%` }} />
            <div className="bg-zinc-600/70" style={{ width: `${(stats.planned / stats.total) * 100}%` }} />
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {Object.entries(stats.typeCounts).sort((a, b) => b[1] - a[1]).map(([type, count]) => (
              <button
                key={type}
                onClick={() => setFilterType(filterType === type ? null : type)}
                className={`rounded-sm border px-1.5 py-0.5 text-[8px] font-semibold uppercase transition ${
                  filterType === type
                    ? 'border-axon-teal/50 bg-axon-teal/20 text-axon-teal'
                    : 'border-white/10 bg-white/5 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {TYPE_LABELS[type] || type} {count}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-y-auto px-3 py-2 space-y-1.5">
          {MODEL_LAYERS.map((layer) => (
            <LayerCard
              key={layer.id}
              layer={filterType ? { ...layer, models: layer.models.filter((m) => m.type === filterType) } : layer}
              expanded={expandedId === layer.id}
              onToggle={() => setExpandedId(expandedId === layer.id ? null : layer.id)}
              onModelClick={onModelClick}
            />
          ))}
        </div>

        <div className="border-t border-white/5 px-3 py-2">
          <div className="rounded-sm border border-axon-teal/20 bg-axon-teal/5 px-2 py-1.5 text-center">
            <div className="text-[10px] font-semibold text-axon-teal">Models cascade upward: latency → abstraction</div>
            <div className="text-[9px] text-zinc-400 mt-0.5">Home Edge {'<'}1ms · CO 1-5ms · Metro 5-20ms · Platform 50-200ms · Agents async</div>
          </div>
        </div>
      </div>
    </div>
  );
}
