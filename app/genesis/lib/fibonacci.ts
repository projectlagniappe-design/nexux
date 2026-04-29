import { NexusCell } from './types';

export function fibonacciPoint(index: number, total: number, radius = 4): [number, number, number] {
  const offset = 2 / total;
  const increment = Math.PI * (3 - Math.sqrt(5));
  const y = index * offset - 1 + offset / 2;
  const r = Math.sqrt(1 - y * y);
  const phi = index * increment;
  return [Math.cos(phi) * r * radius, y * radius, Math.sin(phi) * r * radius];
}

export function withDerivedPosition(cells: Omit<NexusCell, 'position'>[], radius = 4): NexusCell[] {
  return cells.map((cell, i) => ({ ...cell, position: fibonacciPoint(i, Math.max(cells.length, 1), radius) }));
}
