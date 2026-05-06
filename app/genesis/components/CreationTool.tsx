'use client';

import { Html, useGLTF } from '@react-three/drei';
import { useState } from 'react';
import { DonationTier } from '../lib/types';

const NUCLEUS_URL = 'https://thepkfarms.com/wp-content/uploads/2026/04/Apollo_Genesis.glb';
const MEMBRANE_URL = 'https://thepkfarms.com/wp-content/uploads/2026/04/membrane.glb';
const WORLD_URL = 'https://thepkfarms.com/wp-content/uploads/2026/04/MundusNovous_globe.glb';

export function CreationTool({ onCommit, language }: { onCommit: (input: { color: string; tone: string; instrument: string; message: string; tier: DonationTier }) => void; language: string }) {
  const nucleus = useGLTF(NUCLEUS_URL);
  const membrane = useGLTF(MEMBRANE_URL);
  const world = useGLTF(WORLD_URL);

  const [color, setColor] = useState('#8f6bff');
  const [tone, setTone] = useState('C4');
  const [instrument, setInstrument] = useState('pad');
  const [tier, setTier] = useState<DonationTier>('free');
  const [message, setMessage] = useState('');

  return (
    <group>
      <primitive object={world.scene} scale={2.4} position={[0, -2.7, -5]} />
      <primitive object={membrane.scene} scale={1.7} />
      <primitive object={nucleus.scene} scale={1.1} />

      <Html center>
        <div className="w-[340px] rounded-2xl border border-white/20 bg-black/75 p-4 text-xs backdrop-blur">
          <div className="mb-3 text-sm font-semibold">Commit Nexus · {language.toUpperCase()}</div>
          <div className="mb-2">Color <input type="color" value={color} onChange={(e) => setColor(e.target.value)} /></div>
          <div className="mb-2">Tone <input value={tone} onChange={(e) => setTone(e.target.value)} className="w-full rounded bg-white/10 px-2 py-1" /></div>
          <div className="mb-2">Instrument <input value={instrument} onChange={(e) => setInstrument(e.target.value)} className="w-full rounded bg-white/10 px-2 py-1" /></div>
          <div className="mb-2">Tier
            <select value={tier} onChange={(e) => setTier(e.target.value as DonationTier)} className="ml-2 rounded bg-white/10">
              <option value="free">free</option><option value="silver">silver</option><option value="gold">gold</option>
            </select>
          </div>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" className="mb-3 w-full rounded bg-white/10 p-2" />
          <button onClick={() => onCommit({ color, tone, instrument, message, tier })} className="w-full rounded-full bg-[#d4a64f] px-4 py-2 text-black">Commit Nexus</button>
        </div>
      </Html>
    </group>
  );
}
