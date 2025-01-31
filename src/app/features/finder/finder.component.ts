import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchService } from './service/search.service';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ProjectsComponent } from '../projects/projects.component';

@Component({
  selector: 'app-finder',
  imports: [CommonModule, FormsModule, RouterModule, ProjectsComponent],
  standalone: true,
  templateUrl: './finder.component.html',
  styleUrl: './finder.component.scss',
})
export class FinderComponent {
  needHelp = false;
  searchQuery: string = '';
  searchResult: any;
  activeButton: string | null = null;

  constructor(
    private searchService: SearchService,
    protected route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {}

  isSmallScreen: boolean = false;

  ngOnInit(): void {
    this.activeButton = 'button1';
    this.breakpointObserver
      .observe(['(min-width: 0px) and (max-width: 992px)'])
      .subscribe((state) => {
        this.isSmallScreen = state.matches;
      });
  }

  onButtonSearch(s: string, buttonId: string) {
    this.activeButton = buttonId;
    const component = this.searchService.search(s);
    this.searchResult = component;
  }
}
