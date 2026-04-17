import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

const MEXICO_TIMEZONES = new Set([
  'America/Mexico_City',
  'America/Cancun',
  'America/Merida',
  'America/Monterrey',
  'America/Matamoros',
  'America/Mazatlan',
  'America/Chihuahua',
  'America/Ojinaga',
  'America/Hermosillo',
  'America/Tijuana',
  'America/Ensenada',
  'America/Santa_Isabel',
  'America/Bahia_Banderas',
]);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  constructor(private transloco: TranslocoService) {}

  ngOnInit(): void {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const lang = MEXICO_TIMEZONES.has(tz) ? 'es' : 'en';
    this.transloco.setActiveLang(lang);
  }
}
