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
  @ViewChild('cardsContainer', { static: false }) cardsContainer!: ElementRef;

  projects = projects;
  currentIndex: number = 0;
  currentProject = this.projects[this.currentIndex];
  show = false;
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

  nextProject() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.projects.length - 1;
    }
    this.updateCurrentProject();
    if (this.isSmallScreen) {
      window.scrollTo({
        top: 580,
        behavior: 'smooth',
      });
    }
  }

  updateCurrentProject() {
    this.currentProject = this.projects[this.currentIndex];
  }
}
