import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco'; // <-- IMPORTA

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [TranslocoModule], // <-- AÑADE
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

}