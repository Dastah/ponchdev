import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BannerComponent } from './features/banner/banner.component';
import { FinderComponent } from './features/finder/finder.component';
import { IntroComponent } from './features/intro/intro.component';
import { PreloadService } from './service/preload.service';
import { imagePaths, videoPaths, stylePaths } from './shared/resourcesPaths';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    BannerComponent,
    FinderComponent,
    IntroComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  showIntro: boolean = true;
  title: any;
  isLoaded = false;
  private imagePaths = imagePaths;
  private videoPaths = videoPaths;
  private stylePaths = stylePaths;

  constructor(private preload: PreloadService) {}

  ngOnInit() {
    this.preload
      .preloadAllResources(this.imagePaths, this.videoPaths, this.stylePaths)
      .then(() => {
        this.isLoaded = true;
        this.introTimer();
      });
  }

  introTimer() {
    setTimeout(() => {
      this.showIntro = false;
    }, 2000);
  }
}
