import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

@Component({
  selector: 'app-banner',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent implements AfterViewInit {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private mixer!: THREE.AnimationMixer;
  private model!: THREE.Group;

  constructor() {}

  ngAfterViewInit(): void {
    this.initThree();
  }

  goRoute(key: string) {
    switch (key) {
      case 'git':
        window.open('https://github.com/Dastah', '_blank');
        break;
      case 'pen':
        window.open('https://codepen.io/ponchh', '_blank');
        break;
      case 'lin':
        window.open('https://www.linkedin.com/in/alfonsomlwork/', '_blank');
        break;
      default:
        break;
    }
  }

  private initThree(): void {
    const container = document.getElementById('coffee-canvas');
    if (!container) {
      console.error('Contenedor #coffee-canvas no encontrado');
      return;
    }
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    this.camera.position.set(0, 2, 6);
    this.camera.lookAt(0, 1.5, 0);
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    const desiredWidth = 220;
    const desiredHeight = 200;
    this.renderer.setSize(desiredWidth, desiredHeight);
    container.appendChild(this.renderer.domElement);

    this.renderer.setClearColor(0x000000, 0);

    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5);
    this.scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(
      '3D/coffee.gltf',
      (gltf) => {
        this.model = gltf.scene;
        this.model.position.set(0, 0, 0);
        this.model.scale.set(1.5, 1.5, 1.5);
        this.scene.add(this.model);

        if (gltf.animations && gltf.animations.length) {
          this.mixer = new THREE.AnimationMixer(this.model);
          gltf.animations.forEach((clip) => this.mixer.clipAction(clip).play());
        }
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo:', error);
      }
    );

    this.animate();
  }

  private animate() {
    requestAnimationFrame(() => this.animate());

    if (this.model) {
      this.model.rotation.y -= 0.010;
    }

    if (this.mixer) {
      this.mixer.update(0.01);
    }

    this.renderer.render(this.scene, this.camera);
  }
}
