import { useEffect, useState } from 'react';
import { heightToZoomLevel } from '../data/constants.js';

/**
 * Track the camera height of a Cesium viewer and emit the current zoom level
 * label ("planet" → "building"). Returns both height and label.
 */
export function useZoomLevel(viewer) {
  const [height, setHeight] = useState(Infinity);
  const [level, setLevel] = useState('planet');

  useEffect(() => {
    if (!viewer) return;
    const update = () => {
      const h = viewer.camera.positionCartographic.height;
      setHeight(h);
      setLevel(heightToZoomLevel(h));
    };
    update();
    const remove = viewer.camera.changed.addEventListener(update);
    viewer.camera.percentageChanged = 0.05;
    return () => remove();
  }, [viewer]);

  return { height, level };
}
