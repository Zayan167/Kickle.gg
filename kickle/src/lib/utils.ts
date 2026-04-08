import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { TileResult } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTileClasses(result: TileResult): string {
  switch (result) {
    case 'correct':
      return 'bg-tile-green border-tile-green text-white';
    case 'close':
      return 'bg-tile-yellow border-tile-yellow text-black';
    case 'wrong':
      return 'bg-tile-gray border-tile-gray text-gray-300';
  }
}

export function getTileBg(result: TileResult): string {
  switch (result) {
    case 'correct': return 'bg-tile-green-bg border-tile-green/40';
    case 'close':   return 'bg-tile-yellow-bg border-tile-yellow/40';
    case 'wrong':   return 'bg-tile-gray-bg border-white/5';
  }
}

export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function getDayNumber(date: string = formatDate(new Date())): number {
  const epoch = new Date('2024-01-01').getTime();
  const d = new Date(date).getTime();
  return Math.floor((d - epoch) / (1000 * 60 * 60 * 24)) + 1;
}

export function getPositionLabel(pos: string): string {
  const map: Record<string, string> = {
    GK: 'Goalkeeper', CB: 'Centre-Back', LB: 'Left-Back',
    RB: 'Right-Back', CDM: 'Defensive Mid', CM: 'Centre Mid',
    CAM: 'Attacking Mid', LW: 'Left Wing', RW: 'Right Wing',
    ST: 'Striker', CF: 'Centre-Forward',
  };
  return map[pos] || pos;
}

export function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max - 1) + '…' : str;
}
