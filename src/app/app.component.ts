import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class AppComponent implements OnInit, OnDestroy {
  title = 'portfolio';

  private _animFrame = 0;
  private _floatTime = 0;
  private _lastTime = 0;
  private _scrollOffset = 0;
  private _lastScrollY = 0;
  private _scrollBound!: () => void;

  constructor(private transloco: TranslocoService) {}

  ngOnInit(): void {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const lang = MEXICO_TIMEZONES.has(tz) ? 'es' : 'en';
    this.transloco.setActiveLang(lang);

    this._lastScrollY = window.scrollY;
    this._scrollBound = this._onScroll.bind(this);
    window.addEventListener('scroll', this._scrollBound, { passive: true });
    this._animFrame = requestAnimationFrame(this._animate.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this._scrollBound);
    cancelAnimationFrame(this._animFrame);
  }

  private _onScroll(): void {
    const y = window.scrollY;
    const delta = y - this._lastScrollY;
    this._lastScrollY = y;
    // Push offset proportional to scroll delta (0.3 = noticeable parallax)
    this._scrollOffset += delta * 0.3;
  }

  private _animate(time: number): void {
    const dt = Math.min((time - this._lastTime) / 1000, 0.05);
    this._lastTime = time;
    this._floatTime += dt;

    // Frame-rate independent exponential decay toward 0 (~1s to settle)
    this._scrollOffset *= Math.pow(0.93, 60 * dt);

    const so = this._scrollOffset;
    const t = this._floatTime;

    // Sine-wave float + scroll offset at different rates per layer (depth parallax)
    const aY = Math.sin(t * 0.5) * 14 + so;
    const bY = Math.sin(t * 0.4 + 1.5) * 10 + so * 0.7;
    const cY = Math.sin(t * 0.35 + 0.8) * 18 + so * 0.85;
    const dY = Math.sin(t * 0.45 + 2.0) * 12 + so * 0.5;

    const root = document.documentElement;
    root.style.setProperty('--px-a-y', `${aY.toFixed(2)}px`);
    root.style.setProperty('--px-b-y', `${bY.toFixed(2)}px`);
    root.style.setProperty('--px-c-y', `${cY.toFixed(2)}px`);
    root.style.setProperty('--px-d-y', `${dY.toFixed(2)}px`);

    this._animFrame = requestAnimationFrame(this._animate.bind(this));
  }
}
