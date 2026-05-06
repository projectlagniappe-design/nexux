'use client';

import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { NexusCell } from '../lib/types';

type Props = {
  cells: NexusCell[];
  highlightedCellIds: string[];
};

const MEMBRANE_URL = 'https://thepkfarms.com/wp-content/uploads/2026/04/membrane-1.glb';

export function GlobeEngine({ cells, highlightedCellIds }: Props) {
  const group = useMemo(() => new THREE.Group(), []);
  const { scene } = useGLTF(MEMBRANE_URL);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    group.rotation.y = t * 0.05;
    group.scale.setScalar(1 + Math.sin(t * 0.4) * 0.01);
  });

  const highlightSet = useMemo(() => new Set(highlightedCellIds), [highlightedCellIds]);

  return (
    <primitive object={group}>
      <primitive object={scene.clone()} scale={0.2} />
      {cells.map((cell) => (
        <mesh key={cell.id} position={cell.position}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial emissive={cell.color} emissiveIntensity={highlightSet.has(cell.id) ? 1.8 : 0.8} color={cell.color} />
        </mesh>
      ))}
    </primitive>
  );
}
