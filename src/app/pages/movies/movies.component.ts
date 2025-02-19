import { Component, OnInit } from '@angular/core';
import { ThemoviedbService } from '../../services/themoviedb.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies',
  imports: [CommonModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit {
  popularMovies: any[] = [];
  upcomingMovies: any[] = [];
  topRatedMovies: any[] = [];
  nowPlayingMovies: any[] = [];

  currentIndexPopular = 0;
  currentIndexUpcoming = 0;
  currentIndexTopRated = 0;
  currentIndexNowPlaying = 0;

  constructor(private tmdbService: ThemoviedbService) {}

  ngOnInit(): void {
    this.fetchPopularMovies();
    this.fetchUpcomingMovies();
    this.fetchTopRatedMovies();
    this.fetchNowPlayingMovies();
  }

  fetchPopularMovies(): void {
    this.tmdbService.getPopularMovies(1).subscribe({
      next: (response) => {
        this.popularMovies = response.results;
      }
    });
  }

  fetchUpcomingMovies(): void {
    this.tmdbService.getUpcomingMovies(1).subscribe({
      next: (response) => {
        this.upcomingMovies = response.results;
      }
    });
  }

  fetchTopRatedMovies(): void {
    this.tmdbService.getTopRatedMovies(1).subscribe({
      next: (response) => {
        this.topRatedMovies = response.results;
      }
    });
  }

  fetchNowPlayingMovies(): void {
    this.tmdbService.getNowPlayingMovies(1).subscribe({
      next: (response) => {
        this.nowPlayingMovies = response.results;
      }
    });
  }

  scrollCarousel(type: 'popular' | 'upcoming' | 'topRated' | 'nowPlaying', direction: 'left' | 'right'): void {
    switch (type) {
      case 'popular':
        this.currentIndexPopular = this.adjustIndex(this.currentIndexPopular, direction, this.popularMovies.length);
        break;
      case 'upcoming':
        this.currentIndexUpcoming = this.adjustIndex(this.currentIndexUpcoming, direction, this.upcomingMovies.length);
        break;
      case 'topRated':
        this.currentIndexTopRated = this.adjustIndex(this.currentIndexTopRated, direction, this.topRatedMovies.length);
        break;
      case 'nowPlaying':
        this.currentIndexNowPlaying = this.adjustIndex(this.currentIndexNowPlaying, direction, this.nowPlayingMovies.length);
        break;
    }
  }

  adjustIndex(index: number, direction: 'left' | 'right', total: number): number {
    const step = 5;
    if (direction === 'left') {
      return (index - step < 0) ? total - step : index - step;
    } else {
      return (index + step >= total) ? 0 : index + step;
    }
  }

  getImageUrl(path: string | null): string {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : 'assets/images/placeholder.png';
  }
}
