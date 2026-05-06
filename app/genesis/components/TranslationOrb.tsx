'use client';

import { Html, useTexture } from '@react-three/drei';
import { useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ORB_TEXTURE = 'https://thepkfarms.com/wp-content/uploads/2026/04/IMG_5328.png';
const LANGUAGES = ['en', 'es', 'fr', 'pt', 'ar'];

export function TranslationOrb({ onLanguageSelected }: { onLanguageSelected: (language: string) => void }) {
  const [armed, setArmed] = useState(false);
  const texture = useTexture(ORB_TEXTURE);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ map: texture, emissive: '#d4a547', emissiveIntensity: 0.9 }), [texture]);

  useFrame(({ clock }, delta) => {
    mat.emissiveIntensity = 0.75 + Math.sin(clock.elapsedTime * 1.3) * 0.2;
  });

  return (
    <group>
      <mesh onClick={() => setArmed(true)}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <primitive object={mat} attach="material" />
      </mesh>
      {armed && (
        <Html center>
          <div className="grid grid-cols-3 gap-2 rounded-2xl border border-[#d5b56b]/40 bg-black/60 p-4 backdrop-blur">
            {LANGUAGES.map((language) => (
              <button key={language} onClick={() => onLanguageSelected(language)} className="rounded-full border border-white/25 px-3 py-1 text-xs uppercase hover:border-[#ffd67c]">
                {language}
              </button>
            ))}
          </div>
        </Html>
      )}
    </group>
  );
}
