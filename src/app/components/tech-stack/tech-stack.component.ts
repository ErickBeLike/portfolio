import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco'; // <-- 1. IMPORTA

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [TranslocoModule], // <-- 2. AÑADE
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.scss'
})
export class TechStackComponent {

}