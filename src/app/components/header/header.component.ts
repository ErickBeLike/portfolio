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
  // Lógica del Notch (sin cambios)
  isScrolled = false;
  
  // --- NUEVA LÓGICA PARA EL SCROLLSPY (Método Clásico) ---
  activeSection: string = '';
  private sectionPositions: { id: string, top: number }[] = [];

  constructor(
    public translocoService: TranslocoService,
    private cd: ChangeDetectorRef
  ) {}

  // Se ejecuta después de que la vista se haya inicializado
  ngAfterViewInit(): void {
    // Retrasamos un poco el cálculo para asegurarnos de que todo se haya renderizado
    setTimeout(() => {
      this.calculateSectionPositions();
    }, 100);
  }

  // Función para calcular y guardar la posición de cada sección
  calculateSectionPositions(): void {
    this.sectionPositions = [];
    document.querySelectorAll('section[id]').forEach(section => {
      if (section.id && section.id !== 'hero') {
        this.sectionPositions.push({ 
          id: section.id, 
          top: section.getBoundingClientRect().top + window.scrollY - 100 // -100px de offset
        });
      }
    });
  }

  // El HostListener ahora tiene una lógica diferente
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY;

    // Lógica del Notch
    if (scrollPosition > 10) { this.isScrolled = true; } 
    else { this.isScrolled = false; }

    // --- NUEVO: Lógica del Scrollspy ---
    let newActiveSection = '';
    // Recorremos las posiciones guardadas para ver en cuál estamos
    for (const section of this.sectionPositions) {
      if (scrollPosition >= section.top) {
        newActiveSection = section.id;
      }
    }

    // Actualizamos la sección activa SOLO si ha cambiado, para optimizar
    if (newActiveSection !== this.activeSection) {
      this.activeSection = newActiveSection;
      this.cd.detectChanges(); // Forzamos la actualización de la vista
      // DESCOMENTA LA SIGUIENTE LÍNEA PARA DEPURAR EN LA CONSOLA (F12)
      // console.log('Sección Activa:', this.activeSection);
    }
  }

  changeLanguage(lang: string): void {
    this.translocoService.setActiveLang(lang);
  }
}