import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  @Input() title: string = ''; // Titolo del carosello
  @Input() items: any[] = []; // Dati (film, serie, attori)
  @Input() itemType: 'movie' | 'tv' | 'people' = 'movie'; // Tipo di contenuto
  currentIndex: number = 0;

  scrollCarousel(direction: 'left' | 'right'): void {
    const step = 5;
    if (direction === 'left') {
      this.currentIndex = (this.currentIndex - step < 0) ? this.items.length - step : this.currentIndex - step;
    } else {
      this.currentIndex = (this.currentIndex + step >= this.items.length) ? 0 : this.currentIndex + step;
    }
  }

  getImageUrl(path: string | null): string {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : 'assets/images/placeholder.png';
  }

  getItemRouteArray(item: any): any[] {
    switch (this.itemType) {
      case 'movie':
        return ['/movies', item.id];
      case 'tv':
        return ['/series', item.id];
      case 'people':
        return ['/actors', item.id];
      default:
        return ['/'];
    }
  }
}
