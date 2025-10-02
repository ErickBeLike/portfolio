import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco'; // <-- IMPORTA

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [TranslocoModule], // <-- AÑADE
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {

}