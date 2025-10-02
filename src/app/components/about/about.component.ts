import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco'; // <-- IMPORTA

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslocoModule], // <-- AÑADE
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}