# AXON Networks — Reality Canvas Demo

A Cesium Ion 3D globe demo showing AXON's Lumen / Quantum Fiber Wi-Fi 7 deployment
as a digital twin anchored in reality. The planet **is** the dashboard. Zoom out:
see all five metros. Zoom in: see central offices → splitters → ONTs → home
gateways → Wi-Fi pods → connected clients, with live(-ish) health status,
optical/RF telemetry, and the interconnections between them.

This is **Sprint 0** of the SMILE methodology — the spatial anchor. No backend,
no database, no API. Just reality + mock data + a browser.

## Tech stack

- React 18 + Vite
- Resium (React wrapper for CesiumJS)
- CesiumJS 1.119 (Apache 2.0)
- Cesium Ion (free Community tier: terrain, imagery, OSM Buildings asset 96188)
- Tailwind CSS for the overlay UI
- 100% client-side; all mock data is generated deterministically in the browser

## What's in the demo

- **Planet view** — five metro pins (Denver, SLC, Minneapolis, Seattle, Omaha),
  sized by subscriber count, colored by health.
- **Metro view** — 44 central offices placed at real neighborhood addresses,
  with vendor, OLT, PON port, and subscriber counts.
- **City view** — fiber trunk lines from each metro hub to its COs, color-coded
  by the worst downstream status (heat-map on fiber).
- **Neighborhood view** — GPON splitters and individual ONTs procedurally
  placed within each CO's serving area, with RX/TX power, firmware, status,
  plan, and serial.
- **Building view** — for a selected ONT, the W1700K Wi-Fi 7 gateway, up to
  three 360 WiFi Pods, translucent 2.4 / 5 / 6 GHz coverage ellipses, and the
  full connected-device list.
- **Source-silo badges** — every data field is tagged with the AXON platform
  it comes from today (Orchestrator, CloudCheck, Expresse) or marked `?` for
  the platforms that aren't connected yet (Greenwave, Inventory). Toggle the
  badges on/off from the sidebar to see the "today vs. tomorrow" story.
- **Subscriber 360°** — the converged view: fixed broadband + Wi-Fi +
  analytics + (missing) mobile + (missing) inventory + a graph-twin ASCII
  view that shows what the unified knowledge graph would look like.
- **Live simulation** — every five seconds 1–3 ONTs shift status and RX
  power drifts. Events stream into the bottom ticker.
- **Story Mode** — an 8-step guided fly-through, perfect for a demo to Sid,
  Tomas, or a customer. Launch it from the sidebar.

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Get a Cesium Ion access token

1. Sign up at <https://ion.cesium.com/signin>.
2. Open **Access Tokens → Create Token**.
3. Copy the token.

### 3. Configure

```bash
cp .env.example .env
# edit .env and paste your token after VITE_CESIUM_ION_TOKEN=
```

The globe will still render without a token, but terrain, imagery, and the
OSM Buildings layer will degrade.

### 4. Run

```bash
npm run dev
```

Then open <http://localhost:5173>.

### 5. Build

```bash
npm run build
npm run preview
```

## Project layout

```
src/
├── main.jsx                  Cesium Ion token wiring + ReactDOM root
├── App.jsx                   Router: Globe + overlays + selection state
├── data/
│   ├── metros.js             5 metro definitions
│   ├── centralOffices.js     44 CO definitions across 5 metros
│   ├── neighborhoods.js      Bounding boxes for procedural placement
│   ├── generators.js         Deterministic GPON tree + home network generators
│   └── constants.js          Status colors, platform metadata, camera presets
├── hooks/
│   ├── useZoomLevel.js       Camera height → zoom level label
│   ├── useGeneratedData.js   Lazy per-metro GPON tree + per-ONT home net
│   └── useSimulation.js      Real-time status drift + event log
├── components/
│   ├── Globe.jsx             Resium viewer + all map layers + LOD switching
│   ├── Sidebar.jsx           Context-aware left panel (CFO view)
│   ├── StatsBar.jsx          Brand banner + aggregate stats
│   ├── Breadcrumb.jsx        Zoom breadcrumb + nav controls
│   ├── DeviceDetail.jsx      Right-side metro/CO/splitter/ONT detail panel
│   ├── Subscriber360.jsx     Full converged subscriber view
│   ├── SourceBadge.jsx       Platform attribution chip
│   ├── EventTicker.jsx       Bottom live-events bar
│   └── StoryMode.jsx         8-step guided tour
└── styles/
    └── globals.css           Tailwind + dark theme + Cesium chrome overrides
```

## Performance notes

- ONTs are generated lazily, per-metro, only when you drill in.
- Each CO is capped to 6 PON ports for the demo (≈ 192–384 ONTs per metro).
- Cesium's `requestRenderMode` is on — the globe only re-renders on change,
  not at 60 fps continuously.
- Generators are deterministic (seeded from the CO id), so revisiting a metro
  yields identical splitter/ONT placements.

## The pitch

> "This is what AXON's network looks like from space. Zoom in — that's LoDo,
> that's the GPON tree serving 12,000 subscribers. Click one — that's a Q1000K
> SmartNID with a W1700K Wi-Fi 7 router and 14 connected devices. Every field
> is labeled with which platform it comes from today — Orchestrator,
> CloudCheck, Expresse. See the grey `?` fields? That's the data you don't
> have because Greenwave and the new inventory system aren't connected yet.
> The graph twin makes those question marks disappear. The MCP layer makes
> this queryable by any agent. **That** is the digital twin. It was never a
> database — it was always reality."
