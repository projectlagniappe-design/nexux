'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { withDerivedPosition } from './fibonacci';
import { DonationTier, NexusCell } from './types';

const STORAGE_KEY = 'apollo_genesis_cells_v1';
const USER_KEY = 'apollo_genesis_uid_v1';

export function useUserSystem() {
  const [userId, setUserId] = useState('guest');
  const [cells, setCells] = useState<NexusCell[]>([]);

  useEffect(() => {
    const existingUserId = localStorage.getItem(USER_KEY) ?? crypto.randomUUID();
    localStorage.setItem(USER_KEY, existingUserId);
    setUserId(existingUserId);

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as Omit<NexusCell, 'position'>[];
    setCells(withDerivedPosition(parsed));
  }, []);

  const commitCell = useCallback(
    ({ color, tone, instrument, message, tier }: { color: string; tone: string; instrument: string; message: string; tier: DonationTier }) => {
      setCells((prev) => {
        const stripped = prev.map(({ position: _position, ...rest }) => rest);
        const nextStripped = [
          ...stripped,
          { id: crypto.randomUUID(), color, tone, instrument, message, creator: userId, tier, created_at: new Date().toISOString() },
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextStripped));
        return withDerivedPosition(nextStripped);
      });
    },
    [userId],
  );

  const highlightedCellIds = useMemo(() => cells.filter((cell) => cell.creator === userId).map((cell) => cell.id), [cells, userId]);

  return {
    isReturning: cells.length > 0,
    userId,
    cells,
    commitCell,
    highlightedCellIds,
  };
}
