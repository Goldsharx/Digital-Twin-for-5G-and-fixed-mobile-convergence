import React from 'react';
import { Entity, PointGraphics, LabelGraphics, EllipseGraphics } from 'resium';
import { Cartesian3, Color, HeightReference, LabelStyle, VerticalOrigin, Cartesian2, DistanceDisplayCondition, NearFarScalar } from 'cesium';
import { STATUS_COLORS } from '../data/constants.js';

function statusColor(status) {
  return Color.fromCssColorString(STATUS_COLORS[status]?.hex || '#9ca3af');
}

const BAND_COLORS = {
  'n71 (600 MHz)': '#22c55e',
  'n41 (2.5 GHz)': '#3b82f6',
  'n77 (3.7 GHz)': '#8b5cf6',
  'n258 (mmWave)': '#f43f5e',
  'B2 (1900 MHz)': '#eab308',
  'B66 (AWS)': '#f97316'
};

function TowerCoverageRings({ tower, showCoverage }) {
  if (!showCoverage) return null;
  return tower.radios.map((radio, i) => {
    const color = BAND_COLORS[radio.band] || '#6b7280';
    return (
      <Entity key={`cov-${tower.id}-${i}`} position={Cartesian3.fromDegrees(tower.lng, tower.lat, 0)}>
        <EllipseGraphics
          semiMajorAxis={radio.range_km * 1000}
          semiMinorAxis={radio.range_km * 1000 * 0.85}
          material={Color.fromCssColorString(color).withAlpha(0.04)}
          outline={true}
          outlineColor={Color.fromCssColorString(color).withAlpha(0.15)}
          outlineWidth={1}
          heightReference={HeightReference.CLAMP_TO_GROUND}
        />
      </Entity>
    );
  });
}

export default function CellTowerLayer({ towers, visible, showCoverage, onClick, selectedId }) {
  if (!visible || !towers || towers.length === 0) return null;

  return (
    <>
      {towers.map((t) => {
        const isSelected = t.id === selectedId;
        const sizeMap = { 'Macro': 13, 'Small Cell': 8, 'Rooftop': 10 };
        const size = sizeMap[t.type] || 10;

        return (
          <React.Fragment key={t.id}>
            <TowerCoverageRings tower={t} showCoverage={showCoverage && (isSelected || t.type === 'Macro')} />
            <Entity
              position={Cartesian3.fromDegrees(t.lng, t.lat, 0)}
              onClick={() => onClick?.(t)}
              name={t.name}
            >
              <PointGraphics
                pixelSize={isSelected ? size + 4 : size}
                color={statusColor(t.status)}
                outlineColor={isSelected ? Color.fromCssColorString('#f43f5e') : Color.WHITE}
                outlineWidth={isSelected ? 3 : 1}
                heightReference={HeightReference.CLAMP_TO_GROUND}
              />
              <LabelGraphics
                text={t.type === 'Macro' ? `📡 ${t.name}` : t.name}
                font="500 10px Inter, sans-serif"
                fillColor={Color.WHITE}
                outlineColor={Color.BLACK}
                outlineWidth={2}
                style={LabelStyle.FILL_AND_OUTLINE}
                verticalOrigin={VerticalOrigin.BOTTOM}
                pixelOffset={new Cartesian2(0, -14)}
                distanceDisplayCondition={new DistanceDisplayCondition(0, 30_000)}
                showBackground={true}
                backgroundColor={Color.fromCssColorString('rgba(80,20,60,0.7)')}
                backgroundPadding={new Cartesian2(5, 3)}
                translucencyByDistance={new NearFarScalar(5_000, 1.0, 50_000, 0.3)}
              />
            </Entity>
          </React.Fragment>
        );
      })}
    </>
  );
}
