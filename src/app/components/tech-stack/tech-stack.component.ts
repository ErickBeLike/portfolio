import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco'; // <-- 1. IMPORTA
import { NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [TranslocoModule], // <-- 2. AÑADE
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.scss'
})
export class TechStackComponent {

}