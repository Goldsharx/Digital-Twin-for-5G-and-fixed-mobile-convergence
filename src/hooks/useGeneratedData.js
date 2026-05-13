import { useMemo, useRef } from 'react';
import { generateGPONTree, generateHomeNetwork } from '../data/generators.js';
import { CENTRAL_OFFICES } from '../data/centralOffices.js';

/**
 * Lazily generate the GPON tree for a focused metro. We only build trees for
 * COs in the active metro, so the planet-wide entity count stays bounded.
 */
export function useMetroGPON(metroId) {
  const cache = useRef(new Map());

  return useMemo(() => {
    if (!metroId) return { splitters: [], onts: [], byCO: {} };

    if (cache.current.has(metroId)) {
      return cache.current.get(metroId);
    }

    const cos = CENTRAL_OFFICES.filter((c) => c.metroId === metroId);
    const splitters = [];
    const onts = [];
    const byCO = {};

    for (const co of cos) {
      const tree = generateGPONTree(co, { maxPorts: 6 });
      byCO[co.id] = tree;
      splitters.push(...tree.splitters);
      onts.push(...tree.onts);
    }

    const result = { splitters, onts, byCO };
    cache.current.set(metroId, result);
    return result;
  }, [metroId]);
}

/**
 * Lazily generate a home network for a given ONT.
 */
export function useHomeNetwork(ont) {
  const cache = useRef(new Map());
  return useMemo(() => {
    if (!ont) return null;
    if (cache.current.has(ont.id)) return cache.current.get(ont.id);
    const net = generateHomeNetwork(ont);
    cache.current.set(ont.id, net);
    return net;
  }, [ont]);
}
