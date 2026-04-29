'use client';

import { Suspense, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { GlobeEngine } from './components/GlobeEngine';
import { TranslationOrb } from './components/TranslationOrb';
import { CreationTool } from './components/CreationTool';
import { useUserSystem } from './lib/useUserSystem';
import { AudioEngineProvider } from './lib/AudioEngine';

export type Stage = 'landing' | 'creation';

export default function GenesisPage() {
  const [stage, setStage] = useState<Stage>('landing');
  const [language, setLanguage] = useState('en');
  const { isReturning, cells, commitCell, highlightedCellIds } = useUserSystem();

  const greeting = useMemo(() => {
    if (isReturning) return 'Welcome back! We have missed you!';
    return 'A lagniappe… a special seed for a special kind of farming.';
  }, [isReturning]);

  return (
    <AudioEngineProvider>
      <div className="relative h-screen w-screen overflow-hidden bg-[#03030a] text-white">
        <Canvas camera={{ position: [0, 0, 9], fov: 50 }} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
          <color attach="background" args={['#04030a']} />
          <fog attach="fog" args={['#04030a', 8, 35]} />
          <ambientLight intensity={0.25} />
          <pointLight position={[8, 10, 5]} intensity={2.4} color="#f6d279" />
          <pointLight position={[-8, -4, -8]} intensity={1.1} color="#5a66f2" />
          <Stars radius={180} depth={80} count={5000} factor={3} fade speed={0.25} />

          <Suspense fallback={<Html center>Calibrating the field…</Html>}>
            <GlobeEngine cells={cells} highlightedCellIds={highlightedCellIds} />
            {stage === 'landing' ? (
              <TranslationOrb
                onLanguageSelected={(lng) => {
                  setLanguage(lng);
                  setStage('creation');
                }}
              />
            ) : (
              <CreationTool onCommit={commitCell} language={language} />
            )}
          </Suspense>

          <OrbitControls enablePan={false} minDistance={5} maxDistance={18} />
        </Canvas>

        <div className="pointer-events-none absolute left-1/2 top-6 z-50 -translate-x-1/2 rounded-full border border-white/20 bg-black/40 px-5 py-2 text-sm backdrop-blur">
          {greeting}
        </div>
      </div>
    </AudioEngineProvider>
  );
}
