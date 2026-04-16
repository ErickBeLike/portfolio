import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Biome = 'deep-cave' | 'nether' | 'end';

export interface BiomeConfig {
  id: Biome;
  name: string;
  emoji: string;
  labelKey: string;
}

export const BIOMES: BiomeConfig[] = [
  { id: 'deep-cave', name: 'Deep Cave', emoji: '⛏', labelKey: 'I' },
  { id: 'nether',    name: 'The Nether', emoji: '🔥', labelKey: 'II' },
  { id: 'end',       name: 'The End',    emoji: '✦',  labelKey: 'III' },
];

@Injectable({ providedIn: 'root' })
export class BiomeService {
  private biomeSubject = new BehaviorSubject<Biome>('deep-cave');
  biome$ = this.biomeSubject.asObservable();

  constructor() {
    this.applyBiome('deep-cave');
  }

  setBiome(biome: Biome): void {
    this.biomeSubject.next(biome);
    this.applyBiome(biome);
  }

  getCurrentBiome(): Biome {
    return this.biomeSubject.getValue();
  }

  private applyBiome(biome: Biome): void {
    document.body.classList.remove('biome-deep-cave', 'biome-nether', 'biome-end');
    document.body.classList.add(`biome-${biome}`);
  }
}
