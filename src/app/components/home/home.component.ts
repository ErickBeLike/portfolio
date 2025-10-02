import { Component } from '@angular/core';
import { AboutComponent } from "../about/about.component";
import { TechStackComponent } from "../tech-stack/tech-stack.component";
import { ProjectsComponent } from "../projects/projects.component";
import { ExperienceComponent } from "../experience/experience.component";
import { CoursesComponent } from "../courses/courses.component";
import { HeroComponent } from "../hero/hero.component";

@Component({
  selector: 'app-home',
  imports: [AboutComponent, TechStackComponent, ProjectsComponent, ExperienceComponent, CoursesComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
