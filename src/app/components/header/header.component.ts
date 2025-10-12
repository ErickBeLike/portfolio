import { Component, HostListener, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {
  isScrolled = false;
  activeSection: string = '';
  private sectionPositions: { id: string, top: number }[] = [];
  // Usamos una función de flecha para mantener el 'this' correcto
  private calculatePositionsFn = () => this.calculateSectionPositions();

  constructor(
    public translocoService: TranslocoService,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    // En lugar de un setTimeout, esperamos al evento 'load' de la ventana.
    // Este evento se dispara SOLO cuando toda la página, incluyendo imágenes, está cargada.
    window.addEventListener('load', this.calculatePositionsFn);
  }

  // NUEVO: Si el usuario redimensiona la ventana, volvemos a calcular las posiciones
  @HostListener('window:resize', [])
  onWindowResize(): void {
    this.calculateSectionPositions();
  }

  calculateSectionPositions(): void {
    this.sectionPositions = [];
    document.querySelectorAll('section[id]').forEach(section => {
      if (section.id && section.id !== 'hero') {
        const rect = section.getBoundingClientRect();
        this.sectionPositions.push({ 
          id: section.id, 
          top: rect.top + window.scrollY - 80 // Offset de 80px (altura del header)
        });
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY;

    // Lógica del Notch
    if (scrollPosition > 10) { this.isScrolled = true; } 
    else { this.isScrolled = false; }

    // Lógica del Scrollspy
    let newActiveSection = '';
    for (const section of this.sectionPositions) {
      if (scrollPosition >= section.top) {
        newActiveSection = section.id;
      }
    }
    
    // Si estamos hasta arriba, no marcamos ninguna sección
    if (scrollPosition < this.sectionPositions[0]?.top) {
      newActiveSection = '';
    }

    if (newActiveSection !== this.activeSection) {
      this.activeSection = newActiveSection;
      this.cd.detectChanges();
    }
  }

  changeLanguage(lang: string): void {
    this.translocoService.setActiveLang(lang);
  }

  // Limpiamos el event listener cuando el componente se destruye
  ngOnDestroy(): void {
    window.removeEventListener('load', this.calculatePositionsFn);
  }
}