import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco'; // <-- 1. AÑADE ESTA LÍNEA

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TranslocoModule], // <-- 2. Y AÑÁDELO AQUÍ
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

}