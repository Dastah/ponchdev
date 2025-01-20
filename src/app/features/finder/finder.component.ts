import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchService } from './service/search.service';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { ActivatedRoute, RouterModule } from '@angular/router';
import { routeTransition } from '../../shared/transitions';
import { ProjectsComponent } from '../projects/projects.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AboutmeComponent } from "../aboutme/aboutme.component";

@Component({
  selector: 'app-finder',
  imports: [CommonModule, FormsModule, RouterModule, AboutmeComponent],
  standalone: true,
  templateUrl: './finder.component.html',
  styleUrl: './finder.component.scss',
  animations: [routeTransition],
})
export class FinderComponent {
  needHelp = false;
  searchQuery: string = '';
  searchResult: any;

  constructor(
    private searchService: SearchService,
    protected route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {}

  isSmallScreen: boolean = false;

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(min-width: 0px) and (max-width: 992px)'])
      .subscribe((state) => {
        this.isSmallScreen = state.matches;
      });
  }

  onSearch() {
    const component = this.searchService.search(this.searchQuery);
    this.searchResult = component;
  }

  onButtonSearch(s: string) {
    const component = this.searchService.search(s);
    this.searchResult = component;

    if (this.isSmallScreen) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }, 50);
    }
  }

  onKeydown(event: any) {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }
}
