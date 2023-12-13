// carousel.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {

      // Agrega más rutas de imágenes según sea necesario
    images: string[] = [
    'assets/images/carrousel1.jpg',
    'assets/images/carrousel2.jpg',
    'assets/images/carrousel3.jpg',
    'assets/images/carrousel4.jpg',

  ];// Asegúrate de inicializar esta variable con las imágenes que necesitas
  currentIndex = 0;
  intervalId: any;
  autoChangeInterval = 5000; // Cambia esto al intervalo que desees en milisegundos

  ngOnInit() {
    // Inicia el carrusel automáticamente al cargar el componente
    this.startCarousel();
  }

  ngOnDestroy() {
    // Limpia el intervalo al destruir el componente para evitar fugas de memoria
    this.stopCarousel();
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.next();
    }, this.autoChangeInterval);
  }

  stopCarousel() {
    clearInterval(this.intervalId);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
}
