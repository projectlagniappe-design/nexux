'use client';

import { createContext, useContext, useMemo } from 'react';

const AudioEngineContext = createContext({ ready: true });

export function AudioEngineProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo(() => ({ ready: true }), []);
  return <AudioEngineContext.Provider value={value}>{children}</AudioEngineContext.Provider>;
}

export function useAudioEngine() {
  return useContext(AudioEngineContext);
}
