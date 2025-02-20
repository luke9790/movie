import { Component, OnInit } from '@angular/core';
import { ThemoviedbService } from '../../services/themoviedb.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-actors',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './actors.component.html',
  styleUrl: './actors.component.scss'
})
export class ActorsComponent implements OnInit {
  popularActorsPage1: any[] = [];
  popularActorsPage2: any[] = [];
  currentIndexPopular1 = 0;
  currentIndexPopular2 = 0;
  totalActors = 20;

  constructor(private tmdbService: ThemoviedbService) {}

  ngOnInit(): void {
    this.fetchPopularActors();
  }

  fetchPopularActors(): void {
    this.tmdbService.getPopularPeople(1).subscribe({
      next: (response) => {
        this.popularActorsPage1 = response.results;
      }
    });

    this.tmdbService.getPopularPeople(2).subscribe({
      next: (response) => {
        this.popularActorsPage2 = response.results;
      }
    });
  }

  scrollCarousel(direction: 'left' | 'right', carousel: 'first' | 'second'): void {
    const step = 5;
    if (carousel === 'first') {
      this.currentIndexPopular1 = direction === 'left'
        ? (this.currentIndexPopular1 - step + this.totalActors) % this.totalActors
        : (this.currentIndexPopular1 + step) % this.totalActors;
    } else {
      this.currentIndexPopular2 = direction === 'left'
        ? (this.currentIndexPopular2 - step + this.totalActors) % this.totalActors
        : (this.currentIndexPopular2 + step) % this.totalActors;
    }
  }

  getImageUrl(path: string | null): string {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : 'assets/images/placeholder.png';
  }
}
