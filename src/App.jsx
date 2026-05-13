import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Cartesian3 } from 'cesium';
import Globe from './components/Globe.jsx';
import Sidebar from './components/Sidebar.jsx';
import StatsBar from './components/StatsBar.jsx';
import Breadcrumb from './components/Breadcrumb.jsx';
import DeviceDetail from './components/DeviceDetail.jsx';
import Subscriber360 from './components/Subscriber360.jsx';
import EventTicker from './components/EventTicker.jsx';
import StoryMode from './components/StoryMode.jsx';
import TimeSlider from './components/TimeSlider.jsx';
import KPIPanel from './components/KPIPanel.jsx';
import { METROS } from './data/metros.js';
import { CENTRAL_OFFICES } from './data/centralOffices.js';
import { CAMERA_VIEWS } from './data/constants.js';
import { useMetroGPON } from './hooks/useGeneratedData.js';
import { useSimulation } from './hooks/useSimulation.js';
import { generateCellTowers } from './data/cellTowers.js';

export default function App() {
  const viewerRef = useRef(null);

  const [zoomLevel, setZoomLevel] = useState('planet');
  const [zoomHeight, setZoomHeight] = useState(8_000_000);
  const [focusedMetroId, setFocusedMetroId] = useState(null);
  const [focusedCOId, setFocusedCOId] = useState(null);
  const [selection, setSelection] = useState(null); // { type, id, data }
  const [showSubscriber360, setShowSubscriber360] = useState(false);
  const [showSources, setShowSources] = useState(true);
  const [storyStep, setStoryStep] = useState(null); // null when story mode is off
  const [phase, setPhase] = useState('systems');
  const [timelineYear, setTimelineYear] = useState(2026);
  const [timelinePlaying, setTimelinePlaying] = useState(false);
  const [showKPIs, setShowKPIs] = useState(false);

  // Generate the GPON tree for the currently-focused metro only.
  const { splitters, onts } = useMetroGPON(focusedMetroId);

  // Generate cell towers for the focused metro.
  const cellTowersRef = useRef({});
  const cellTowers = useMemo(() => {
    if (!focusedMetroId) return [];
    if (!cellTowersRef.current[focusedMetroId]) {
      cellTowersRef.current[focusedMetroId] = generateCellTowers(focusedMetroId);
    }
    return cellTowersRef.current[focusedMetroId];
  }, [focusedMetroId]);

  // Simulation runs only when we have something to simulate.
  const { events } = useSimulation(onts, onts.length > 0, 5000);

  const focusedMetro = useMemo(
    () => METROS.find((m) => m.id === focusedMetroId) || null,
    [focusedMetroId]
  );
  const focusedCO = useMemo(
    () => CENTRAL_OFFICES.find((c) => c.id === focusedCOId) || null,
    [focusedCOId]
  );

  const flyTo = useCallback((lat, lng, height, durationSec = 2.0) => {
    const v = viewerRef.current;
    if (!v) return;
    v.camera.flyTo({
      destination: Cartesian3.fromDegrees(lng, lat, height),
      duration: durationSec
    });
  }, []);

  const handleSelect = useCallback((sel) => {
    setSelection(sel);
    if (sel?.type !== 'ont') setShowSubscriber360(false);
  }, []);

  const handleMetroClick = useCallback(
    (metro) => {
      handleSelect({ type: 'metro', id: metro.id, data: metro });
    },
    [handleSelect]
  );

  const handleMetroDoubleClick = useCallback(
    (metro) => {
      setFocusedMetroId(metro.id);
      setFocusedCOId(null);
      const v = CAMERA_VIEWS[metro.id === 'salt-lake-city' ? 'slc' : metro.id] || {
        lat: metro.lat,
        lng: metro.lng,
        height: 80_000
      };
      flyTo(v.lat, v.lng, v.height);
      handleSelect({ type: 'metro', id: metro.id, data: metro });
    },
    [flyTo, handleSelect]
  );

  const handleCOClick = useCallback(
    (co) => {
      handleSelect({ type: 'co', id: co.id, data: co });
    },
    [handleSelect]
  );

  const handleCODoubleClick = useCallback(
    (co) => {
      setFocusedMetroId(co.metroId);
      setFocusedCOId(co.id);
      flyTo(co.lat, co.lng, 4_000);
      handleSelect({ type: 'co', id: co.id, data: co });
    },
    [flyTo, handleSelect]
  );

  const handleSplitterClick = useCallback(
    (splitter) => {
      handleSelect({ type: 'splitter', id: splitter.id, data: splitter });
    },
    [handleSelect]
  );

  const handleONTClick = useCallback(
    (ont) => {
      handleSelect({ type: 'ont', id: ont.id, data: ont });
    },
    [handleSelect]
  );

  const handleONTDoubleClick = useCallback(
    (ont) => {
      flyTo(ont.lat, ont.lng, 350);
      handleSelect({ type: 'ont', id: ont.id, data: ont });
    },
    [flyTo, handleSelect]
  );

  const handleTowerClick = useCallback(
    (tower) => {
      handleSelect({ type: 'tower', id: tower.id, data: tower });
    },
    [handleSelect]
  );

  const resetView = useCallback(() => {
    setFocusedMetroId(null);
    setFocusedCOId(null);
    setSelection(null);
    setShowSubscriber360(false);
    flyTo(CAMERA_VIEWS.planet.lat, CAMERA_VIEWS.planet.lng, CAMERA_VIEWS.planet.height, 2.5);
  }, [flyTo]);

  const onZoomChange = useCallback((level, height) => {
    setZoomLevel(level);
    setZoomHeight(height);
  }, []);

  useEffect(() => {
    if (!timelinePlaying) return;
    const interval = setInterval(() => {
      setTimelineYear((y) => {
        if (y >= 2030) { setTimelinePlaying(false); return 2030; }
        return Math.round((y + 0.5) * 10) / 10;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [timelinePlaying]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-axon-deep text-white">
      <Globe
        viewerRef={viewerRef}
        zoomLevel={zoomLevel}
        zoomHeight={zoomHeight}
        focusedMetroId={focusedMetroId}
        focusedCOId={focusedCOId}
        splitters={splitters}
        onts={onts}
        cellTowers={cellTowers}
        phase={phase}
        selection={selection}
        onZoomChange={onZoomChange}
        onMetroClick={handleMetroClick}
        onMetroDoubleClick={handleMetroDoubleClick}
        onCOClick={handleCOClick}
        onCODoubleClick={handleCODoubleClick}
        onSplitterClick={handleSplitterClick}
        onONTClick={handleONTClick}
        onONTDoubleClick={handleONTDoubleClick}
        onTowerClick={handleTowerClick}
      />

      <StatsBar phase={phase} setPhase={setPhase} />

      <Sidebar
        zoomLevel={zoomLevel}
        focusedMetro={focusedMetro}
        focusedCO={focusedCO}
        onts={onts}
        showSources={showSources}
        onToggleSources={() => setShowSources((s) => !s)}
        onReset={resetView}
        onStartStory={() => setStoryStep(0)}
        onToggleKPIs={() => setShowKPIs((s) => !s)}
      />

      <Breadcrumb
        zoomLevel={zoomLevel}
        focusedMetro={focusedMetro}
        focusedCO={focusedCO}
        selection={selection}
        onReset={resetView}
        onBackToMetro={() => {
          if (focusedMetro) {
            const v = CAMERA_VIEWS[focusedMetro.id === 'salt-lake-city' ? 'slc' : focusedMetro.id];
            if (v) flyTo(v.lat, v.lng, v.height);
            setFocusedCOId(null);
            setSelection({ type: 'metro', id: focusedMetro.id, data: focusedMetro });
            setShowSubscriber360(false);
          }
        }}
      />

      {selection && !showSubscriber360 && (
        <DeviceDetail
          selection={selection}
          showSources={showSources}
          phase={phase}
          onClose={() => setSelection(null)}
          onOpenSubscriber360={() => setShowSubscriber360(true)}
        />
      )}

      {selection?.type === 'ont' && showSubscriber360 && (
        <Subscriber360
          ont={selection.data}
          showSources={showSources}
          phase={phase}
          onClose={() => setShowSubscriber360(false)}
        />
      )}

      <EventTicker events={events} />

      {storyStep === null && (
        <TimeSlider
          year={timelineYear}
          setYear={setTimelineYear}
          playing={timelinePlaying}
          setPlaying={setTimelinePlaying}
        />
      )}

      <KPIPanel
        year={timelineYear}
        visible={showKPIs}
        onClose={() => setShowKPIs(false)}
      />

      {storyStep !== null && (
        <StoryMode
          step={storyStep}
          onStep={setStoryStep}
          onExit={() => setStoryStep(null)}
          flyTo={flyTo}
          setFocusedMetroId={setFocusedMetroId}
          setFocusedCOId={setFocusedCOId}
          setSelection={setSelection}
          setShowSubscriber360={setShowSubscriber360}
        />
      )}
    </div>
  );
}
