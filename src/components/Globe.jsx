import React, { useEffect, useMemo, useRef } from 'react';
import {
  Viewer,
  Entity,
  PointGraphics,
  LabelGraphics,
  PolylineGraphics,
  EllipseGraphics
} from 'resium';
import {
  Cartesian3,
  Color,
  HeightReference,
  LabelStyle,
  VerticalOrigin,
  HorizontalOrigin,
  Cesium3DTileset,
  Ion,
  PolylineGlowMaterialProperty,
  NearFarScalar,
  Cartesian2,
  DistanceDisplayCondition
} from 'cesium';
import { METROS } from '../data/metros.js';
import { CENTRAL_OFFICES } from '../data/centralOffices.js';
import { STATUS_COLORS, heightToZoomLevel } from '../data/constants.js';
import { useHomeNetwork } from '../hooks/useGeneratedData.js';
import CellTowerLayer from './CellTowerLayer.jsx';

function statusColor(status) {
  return Color.fromCssColorString(STATUS_COLORS[status]?.hex || '#9ca3af');
}

function MetroLayer({ visible, onClick, onDoubleClick }) {
  if (!visible) return null;
  return METROS.map((m) => {
    const sizePx = 14 + Math.min(18, Math.round(m.subscriberCount / 18_000));
    return (
      <Entity
        key={m.id}
        position={Cartesian3.fromDegrees(m.lng, m.lat, 0)}
        onClick={() => onClick?.(m)}
        onDoubleClick={() => onDoubleClick?.(m)}
        name={m.name}
      >
        <PointGraphics
          pixelSize={sizePx}
          color={statusColor(m.status)}
          outlineColor={Color.WHITE}
          outlineWidth={2}
          heightReference={HeightReference.CLAMP_TO_GROUND}
          scaleByDistance={new NearFarScalar(1.5e5, 1.4, 1.0e7, 0.8)}
          translucencyByDistance={new NearFarScalar(1.5e5, 1.0, 2.5e7, 0.55)}
        />
        <LabelGraphics
          text={m.name.replace(/ Metro$/, '').replace('-St. Paul', '/St. Paul').replace('-Bellevue', '/Bellevue')}
          font="600 13px Inter, sans-serif"
          fillColor={Color.WHITE}
          outlineColor={Color.BLACK}
          outlineWidth={3}
          style={LabelStyle.FILL_AND_OUTLINE}
          verticalOrigin={VerticalOrigin.BOTTOM}
          horizontalOrigin={HorizontalOrigin.CENTER}
          pixelOffset={new Cartesian2(0, -22)}
          showBackground={true}
          backgroundColor={Color.fromCssColorString('rgba(13,31,60,0.78)')}
          backgroundPadding={new Cartesian2(7, 4)}
          translucencyByDistance={new NearFarScalar(1.5e5, 1.0, 2.5e7, 0.5)}
        />
      </Entity>
    );
  });
}

function COLayer({ visible, metroId, onClick, onDoubleClick, selectedId }) {
  if (!visible) return null;
  const cos = metroId ? CENTRAL_OFFICES.filter((c) => c.metroId === metroId) : CENTRAL_OFFICES;
  return cos.map((co) => {
    const isSelected = co.id === selectedId;
    return (
      <Entity
        key={co.id}
        position={Cartesian3.fromDegrees(co.lng, co.lat, 0)}
        onClick={() => onClick?.(co)}
        onDoubleClick={() => onDoubleClick?.(co)}
        name={co.name}
      >
        <PointGraphics
          pixelSize={isSelected ? 16 : 11}
          color={statusColor(co.status)}
          outlineColor={Color.WHITE}
          outlineWidth={isSelected ? 3 : 1.5}
          heightReference={HeightReference.CLAMP_TO_GROUND}
        />
        <LabelGraphics
          text={co.name.replace(/ CO$/, '')}
          font="500 11px Inter, sans-serif"
          fillColor={Color.WHITE}
          outlineColor={Color.BLACK}
          outlineWidth={2.5}
          style={LabelStyle.FILL_AND_OUTLINE}
          verticalOrigin={VerticalOrigin.BOTTOM}
          horizontalOrigin={HorizontalOrigin.CENTER}
          pixelOffset={new Cartesian2(0, -16)}
          distanceDisplayCondition={new DistanceDisplayCondition(0, 250_000)}
          showBackground={true}
          backgroundColor={Color.fromCssColorString('rgba(13,31,60,0.6)')}
          backgroundPadding={new Cartesian2(5, 3)}
        />
      </Entity>
    );
  });
}

function COTrunkLayer({ visible, metroId, ontsByCO }) {
  if (!visible || !metroId) return null;
  const cos = CENTRAL_OFFICES.filter((c) => c.metroId === metroId);
  return cos.map((co) => {
    const branchStatus = ontsByCO[co.id]?.worstStatus || co.status;
    return (
      <Entity key={`trunk-${co.id}`}>
        <PolylineGraphics
          positions={Cartesian3.fromDegreesArrayHeights([
            METROS.find((m) => m.id === metroId).lng,
            METROS.find((m) => m.id === metroId).lat,
            5,
            co.lng,
            co.lat,
            5
          ])}
          width={3}
          material={new PolylineGlowMaterialProperty({
            glowPower: 0.18,
            color: statusColor(branchStatus).withAlpha(0.85)
          })}
          clampToGround={true}
        />
      </Entity>
    );
  });
}

function SplitterLayer({ visible, splitters, onClick }) {
  if (!visible) return null;
  return splitters.map((s) => (
    <Entity
      key={s.id}
      position={Cartesian3.fromDegrees(s.lng, s.lat, 0)}
      onClick={() => onClick?.(s)}
      name={`Splitter ${s.splitRatio}`}
    >
      <PointGraphics
        pixelSize={9}
        color={statusColor(s.status)}
        outlineColor={Color.fromCssColorString('#00D4AA')}
        outlineWidth={1.5}
        heightReference={HeightReference.CLAMP_TO_GROUND}
      />
    </Entity>
  ));
}

function FiberLayer({ visible, splitters, onts }) {
  // Index ONTs by splitter for fast lookup. Memo must run unconditionally.
  const ontsBySplitter = useMemo(() => {
    const map = {};
    for (const o of onts) {
      (map[o.splitterId] ||= []).push(o);
    }
    return map;
  }, [onts]);

  if (!visible) return null;

  return (
    <>
      {splitters.map((s) => {
        const co = CENTRAL_OFFICES.find((c) => c.id === s.coId);
        if (!co) return null;
        const branchOnts = ontsBySplitter[s.id] || [];
        const worst = branchOnts.reduce((w, o) => {
          const order = ['healthy', 'degraded', 'alarm', 'offline'];
          return order.indexOf(o.status) > order.indexOf(w) ? o.status : w;
        }, s.status);
        return (
          <Entity key={`fiber-trunk-${s.id}`}>
            <PolylineGraphics
              positions={Cartesian3.fromDegreesArray([co.lng, co.lat, s.lng, s.lat])}
              width={2}
              material={new PolylineGlowMaterialProperty({
                glowPower: 0.15,
                color: statusColor(worst).withAlpha(0.8)
              })}
              clampToGround={true}
            />
          </Entity>
        );
      })}
      {onts.map((o) => {
        const s = splitters.find((sp) => sp.id === o.splitterId);
        if (!s) return null;
        return (
          <Entity key={`fiber-drop-${o.id}`}>
            <PolylineGraphics
              positions={Cartesian3.fromDegreesArray([s.lng, s.lat, o.lng, o.lat])}
              width={1}
              material={statusColor(o.status).withAlpha(0.45)}
              clampToGround={true}
            />
          </Entity>
        );
      })}
    </>
  );
}

function ONTLayer({ visible, onts, onClick, onDoubleClick, selectedId }) {
  if (!visible) return null;
  return onts.map((o) => {
    const isSelected = o.id === selectedId;
    return (
      <Entity
        key={o.id}
        position={Cartesian3.fromDegrees(o.lng, o.lat, 0)}
        onClick={() => onClick?.(o)}
        onDoubleClick={() => onDoubleClick?.(o)}
        name={o.serial}
      >
        <PointGraphics
          pixelSize={isSelected ? 10 : 6}
          color={statusColor(o.status)}
          outlineColor={isSelected ? Color.fromCssColorString('#00D4AA') : Color.BLACK}
          outlineWidth={isSelected ? 2 : 0.5}
          heightReference={HeightReference.CLAMP_TO_GROUND}
        />
      </Entity>
    );
  });
}

function WifiCoverage({ position, radiusM, color, alpha }) {
  return (
    <Entity position={position}>
      <EllipseGraphics
        semiMajorAxis={radiusM}
        semiMinorAxis={radiusM}
        material={Color.fromCssColorString(color).withAlpha(alpha)}
        heightReference={HeightReference.CLAMP_TO_GROUND}
      />
    </Entity>
  );
}

function HomeNetworkLayer({ visible, ont }) {
  const home = useHomeNetwork(ont);
  if (!visible || !ont || !home) return null;
  const { gateway, meshPods } = home;

  return (
    <>
      {/* Coverage ellipses around the gateway, one per band */}
      <WifiCoverage
        position={Cartesian3.fromDegrees(gateway.lng, gateway.lat, 0)}
        radiusM={25}
        color="#3b82f6"
        alpha={0.10}
      />
      <WifiCoverage
        position={Cartesian3.fromDegrees(gateway.lng, gateway.lat, 0)}
        radiusM={15}
        color="#8b5cf6"
        alpha={0.16}
      />
      <WifiCoverage
        position={Cartesian3.fromDegrees(gateway.lng, gateway.lat, 0)}
        radiusM={10}
        color="#00D4AA"
        alpha={0.26}
      />

      <Entity
        position={Cartesian3.fromDegrees(gateway.lng, gateway.lat, 0)}
        name={`Gateway ${gateway.model}`}
      >
        <PointGraphics
          pixelSize={14}
          color={Color.fromCssColorString('#00D4AA')}
          outlineColor={Color.WHITE}
          outlineWidth={2}
          heightReference={HeightReference.CLAMP_TO_GROUND}
        />
        <LabelGraphics
          text={`W1700K · Wi-Fi 7`}
          font="600 10px JetBrains Mono, monospace"
          fillColor={Color.WHITE}
          outlineColor={Color.BLACK}
          outlineWidth={2}
          style={LabelStyle.FILL_AND_OUTLINE}
          verticalOrigin={VerticalOrigin.BOTTOM}
          pixelOffset={new Cartesian2(0, -16)}
          showBackground={true}
          backgroundColor={Color.fromCssColorString('rgba(0,212,170,0.18)')}
          backgroundPadding={new Cartesian2(5, 3)}
        />
      </Entity>

      {meshPods.map((p) => (
        <React.Fragment key={p.id}>
          <WifiCoverage
            position={Cartesian3.fromDegrees(p.lng, p.lat, 0)}
            radiusM={12}
            color="#00D4AA"
            alpha={0.18}
          />
          <Entity position={Cartesian3.fromDegrees(p.lng, p.lat, 0)} name="WiFi Pod">
            <PointGraphics
              pixelSize={9}
              color={statusColor(p.status)}
              outlineColor={Color.fromCssColorString('#00D4AA')}
              outlineWidth={1.5}
              heightReference={HeightReference.CLAMP_TO_GROUND}
            />
          </Entity>
          <Entity>
            <PolylineGraphics
              positions={Cartesian3.fromDegreesArray([gateway.lng, gateway.lat, p.lng, p.lat])}
              width={1}
              material={Color.fromCssColorString('#00D4AA').withAlpha(0.55)}
              clampToGround={true}
            />
          </Entity>
        </React.Fragment>
      ))}
    </>
  );
}

export default function Globe({
  viewerRef,
  zoomLevel,
  zoomHeight,
  focusedMetroId,
  focusedCOId,
  splitters,
  onts,
  cellTowers,
  phase,
  selection,
  onZoomChange,
  onMetroClick,
  onMetroDoubleClick,
  onCOClick,
  onCODoubleClick,
  onSplitterClick,
  onONTClick,
  onONTDoubleClick,
  onTowerClick
}) {
  const innerViewerRef = useRef(null);
  const cameraHandlerRef = useRef(null);

  // Wire up viewer once mounted.
  useEffect(() => {
    const v = innerViewerRef.current?.cesiumElement;
    if (!v) return;

    viewerRef.current = v;

    // Lock down UI chrome we don't want.
    v.scene.skyAtmosphere.show = true;
    v.scene.fog.enabled = true;
    v.scene.fog.density = 0.0002;
    v.scene.globe.enableLighting = false;
    v.scene.globe.baseColor = Color.fromCssColorString('#050b18');
    v.scene.backgroundColor = Color.fromCssColorString('#050b18');
    v.scene.requestRenderMode = true;
    v.scene.maximumRenderTimeChange = 1.5;

    // Set initial camera (whole US).
    v.camera.flyTo({
      destination: Cartesian3.fromDegrees(-98, 39, 8_000_000),
      duration: 0
    });

    // Optionally load OSM buildings at high zoom — only attempt if Ion token is present.
    if (Ion.defaultAccessToken && Ion.defaultAccessToken.length > 20) {
      Cesium3DTileset.fromIonAssetId(96188)
        .then((tileset) => {
          tileset.style = undefined;
          tileset.maximumScreenSpaceError = 24;
          v.scene.primitives.add(tileset);
        })
        .catch(() => {
          // Asset failure is non-fatal — the demo still works without buildings.
        });
    }

    // Camera change listener for zoom level.
    const handleCameraChanged = () => {
      const h = v.camera.positionCartographic.height;
      onZoomChange(heightToZoomLevel(h), h);
    };
    v.camera.percentageChanged = 0.05;
    cameraHandlerRef.current = v.camera.changed.addEventListener(handleCameraChanged);

    // Initial zoom emission.
    handleCameraChanged();

    return () => {
      cameraHandlerRef.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // What to show at each zoom level
  const showMetros = zoomLevel === 'planet' || zoomLevel === 'metro';
  const showCOs = zoomLevel === 'metro' || zoomLevel === 'city' || (focusedMetroId && zoomLevel === 'neighborhood');
  const showCOTrunks = focusedMetroId && (zoomLevel === 'metro' || zoomLevel === 'city');
  const showSplitters = focusedMetroId && (zoomLevel === 'city' || zoomLevel === 'neighborhood' || zoomLevel === 'building');
  const showONTs = focusedMetroId && (zoomLevel === 'neighborhood' || zoomLevel === 'building');
  const showFiber = focusedMetroId && (zoomLevel === 'city' || zoomLevel === 'neighborhood' || zoomLevel === 'building');
  const showHomeNetwork = zoomLevel === 'building' && selection?.type === 'ont';
  const showCellTowers = focusedMetroId && (zoomLevel === 'city' || zoomLevel === 'neighborhood');

  const selectedONTId = selection?.type === 'ont' ? selection.id : null;
  const selectedCOId = selection?.type === 'co' ? selection.id : null;
  const selectedTowerId = selection?.type === 'tower' ? selection.id : null;

  const ontsByCO = useMemo(() => {
    const map = {};
    const order = ['healthy', 'degraded', 'alarm', 'offline'];
    for (const o of onts) {
      const entry = map[o.coId] || (map[o.coId] = { count: 0, worstStatus: 'healthy' });
      entry.count += 1;
      if (order.indexOf(o.status) > order.indexOf(entry.worstStatus)) entry.worstStatus = o.status;
    }
    return map;
  }, [onts]);

  return (
    <Viewer
      ref={innerViewerRef}
      full
      animation={false}
      timeline={false}
      baseLayerPicker={false}
      fullscreenButton={false}
      geocoder={false}
      homeButton={false}
      sceneModePicker={false}
      navigationHelpButton={false}
      selectionIndicator={false}
      infoBox={false}
      shouldAnimate={true}
    >
      <MetroLayer
        visible={showMetros}
        onClick={onMetroClick}
        onDoubleClick={onMetroDoubleClick}
      />
      <COTrunkLayer
        visible={showCOTrunks}
        metroId={focusedMetroId}
        ontsByCO={ontsByCO}
      />
      <COLayer
        visible={showCOs}
        metroId={focusedMetroId}
        onClick={onCOClick}
        onDoubleClick={onCODoubleClick}
        selectedId={selectedCOId}
      />
      <FiberLayer
        visible={showFiber}
        splitters={splitters}
        onts={onts}
      />
      <SplitterLayer
        visible={showSplitters}
        splitters={splitters}
        onClick={onSplitterClick}
      />
      <ONTLayer
        visible={showONTs}
        onts={onts}
        onClick={onONTClick}
        onDoubleClick={onONTDoubleClick}
        selectedId={selectedONTId}
      />
      <CellTowerLayer
        towers={cellTowers}
        visible={showCellTowers}
        showCoverage={phase !== 'people'}
        onClick={onTowerClick}
        selectedId={selectedTowerId}
      />
      {showHomeNetwork && selection?.data && (
        <HomeNetworkLayer visible ont={selection.data} />
      )}
    </Viewer>
  );
}
