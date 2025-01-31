import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { projects } from '../../shared/projects';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  show = false;
  projects = projects;
  currentIndex = 0;
  nextIndex = 1;
  currentProject = this.projects[this.currentIndex];
  nextProject = this.projects[this.nextIndex];
  isSmallScreen: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.show = true;
    }, 10);
    this.breakpointObserver
      .observe(['(min-width: 0px) and (max-width: 992px)'])
      .subscribe((state) => {
        this.isSmallScreen = state.matches;
      });
  }

  nextProjects() {
    this.currentIndex =
      this.currentIndex > 0 ? this.currentIndex - 1 : this.projects.length - 1;

    this.nextIndex = (this.currentIndex + 1) % this.projects.length;

    this.updateProjects();
  }

  updateProjects() {
    this.currentProject = this.projects[this.currentIndex];
    this.nextProject = this.projects[this.nextIndex];

    if (this.isSmallScreen) {
      window.scrollTo({ top: 440, behavior: 'smooth' });
    }
  }
}
