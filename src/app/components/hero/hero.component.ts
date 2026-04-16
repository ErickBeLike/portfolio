import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { BiomeService, Biome, BIOMES, BiomeConfig } from '../../services/biome.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  biomes: BiomeConfig[] = BIOMES;

  constructor(public biomeService: BiomeService) {}

  changeBiome(biome: Biome): void {
    this.biomeService.setBiome(biome);
  }

  get currentBiome(): Biome {
    return this.biomeService.getCurrentBiome();
  }
}
