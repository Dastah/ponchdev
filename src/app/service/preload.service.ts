import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PreloadService {
  private loaded = new Subject<void>();
  private isPreloaded = false;

  preloadAllResources(
    imagePaths: string[],
    videoPaths: string[],
    stylePaths: string[]
  ): Promise<void> {
    if (this.isPreloaded) {
      return Promise.resolve(); // ✅ Si ya se cargó, no volver a hacerlo
    }

    return Promise.all([
      this.preloadImages(imagePaths),
      this.preloadVideos(videoPaths),
      this.preloadStyles(stylePaths),
    ]).then(() => {
      this.isPreloaded = true; // ✅ Marca como cargado
      this.loaded.next();
    });
  }

  get whenLoaded() {
    return this.loaded.asObservable();
  }

  preloadVideos(videoPaths: string[]): Promise<void> {
    const promises = videoPaths.map((path) => {
      return new Promise<void>((resolve) => {
        const video = document.createElement('video');
        video.src = path;
        video.preload = 'auto'; // Fuerza la pre-carga
        video.oncanplaythrough = () => resolve(); // Video listo para reproducirse
        video.onerror = () => resolve(); // Ignora errores para no bloquear la carga
      });
    });
    return Promise.all(promises).then(() => {});
  }

  preloadImages(imagePaths: string[]): Promise<void> {
    const promises = imagePaths.map((path) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = path;
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    });
    return Promise.all(promises).then(() => {});
  }

  preloadStyles(stylePaths: string[]): Promise<void> {
    const promises = stylePaths.map((path) => {
      return new Promise<void>((resolve) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = path;
        link.onload = () => resolve();
        link.onerror = () => resolve(); // Ignora errores para no bloquear la carga
        document.head.appendChild(link);
      });
    });
    return Promise.all(promises).then(() => {});
  }
}
