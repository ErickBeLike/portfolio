import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  expandedId: string | null = null;

  toggle(id: string): void {
    this.expandedId = this.expandedId === id ? null : id;
  }
}