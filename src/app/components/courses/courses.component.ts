import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco'; // <-- IMPORTA
import { CommonModule } from '@angular/common'; // <-- Importa CommonModule también

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [TranslocoModule, CommonModule], // <-- AÑADE AMBOS
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

}