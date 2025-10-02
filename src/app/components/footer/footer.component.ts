import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco'; // <-- IMPORTA

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslocoModule], // <-- AÑADE
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}