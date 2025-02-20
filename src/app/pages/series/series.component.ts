import { Component, OnInit } from '@angular/core';
import { ThemoviedbService } from '../../services/themoviedb.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './series.component.html',
  styleUrl: './series.component.scss'
})
export class SeriesComponent implements OnInit {
  popularTvShows: any[] = [];
  topRatedTvShows: any[] = [];
  onTheAirTvShows: any[] = [];

  currentIndexPopular = 0;
  currentIndexTopRated = 0;
  currentIndexOnTheAir = 0;

  constructor(private tmdbService: ThemoviedbService) {}

  ngOnInit(): void {
    this.fetchPopularTvShows();
    this.fetchTopRatedTvShows();
    this.fetchOnTheAirTvShows();
  }

  fetchPopularTvShows(): void {
    this.tmdbService.getPopularTvShows().subscribe({
      next: (tvShows) => {
        console.log(tvShows)
        this.popularTvShows = tvShows;
      },
      error: (err) => {
        console.error("Error fetching TV shows:", err);
      }
    });
  }

  fetchTopRatedTvShows(): void {
    this.tmdbService.getTopRatedTvShows().subscribe({
      next: (topRated) => {
        console.log("Risposta TOP RATED: ",topRated)
        this.topRatedTvShows = topRated;
      }
    });
  }

  fetchOnTheAirTvShows(): void {
    this.tmdbService.getOnTheAirTvShows().subscribe({
      next: (onTheAirTvShows) => {
        console.log("Risposta on the air: ",onTheAirTvShows)
        this.onTheAirTvShows = onTheAirTvShows;
      }
    });
  }

  scrollCarousel(type: 'popular' | 'topRated' | 'onTheAir', direction: 'left' | 'right'): void {
    const step = 5;
    let currentIndex, totalItems;

    switch (type) {
      case 'popular':
        currentIndex = this.currentIndexPopular;
        totalItems = this.popularTvShows.length;
        break;
      case 'topRated':
        currentIndex = this.currentIndexTopRated;
        totalItems = this.topRatedTvShows.length;
        break;
      case 'onTheAir':
        currentIndex = this.currentIndexOnTheAir;
        totalItems = this.onTheAirTvShows.length;
        break;
    }

    if (totalItems > 0) {
      if (direction === 'left') {
        currentIndex = (currentIndex - step + totalItems) % totalItems;
      } else {
        currentIndex = (currentIndex + step) % totalItems;
      }
    }

    switch (type) {
      case 'popular':
        this.currentIndexPopular = currentIndex;
        break;
      case 'topRated':
        this.currentIndexTopRated = currentIndex;
        break;
      case 'onTheAir':
        this.currentIndexOnTheAir = currentIndex;
        break;
    }
  }

  getVisibleShows(type: 'popular' | 'topRated' | 'onTheAir'): any[] {
    const step = 5;
    let shows = [];
    let currentIndex;

    switch (type) {
      case 'popular':
        shows = this.popularTvShows;
        currentIndex = this.currentIndexPopular;
        break;
      case 'topRated':
        shows = this.topRatedTvShows;
        currentIndex = this.currentIndexTopRated;
        break;
      case 'onTheAir':
        shows = this.onTheAirTvShows;
        currentIndex = this.currentIndexOnTheAir;
        break;
    }

    if (shows.length === 0) return [];

    let visibleShows = shows.slice(currentIndex, currentIndex + step);

    if (visibleShows.length < step) {
      visibleShows = [...visibleShows, ...shows.slice(0, step - visibleShows.length)];
    }

    return visibleShows;
  }

  getImageUrl(path: string | null): string {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : 'assets/images/placeholder.png';
  }
}