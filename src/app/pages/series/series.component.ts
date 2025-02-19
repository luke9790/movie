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

  currentIndexPopular = 0;
  currentIndexTopRated = 0;

  constructor(private tmdbService: ThemoviedbService) {}

  ngOnInit(): void {
    this.fetchPopularTvShows();
    this.fetchTopRatedTvShows();
  }

  fetchPopularTvShows(): void {
    this.tmdbService.getPopularTvShows().subscribe({
      next: (response) => {
        this.popularTvShows = response.results;
      }
    });
  }

  fetchTopRatedTvShows(): void {
    this.tmdbService.getTopRatedTvShows().subscribe({
      next: (response) => {
        this.topRatedTvShows = response.results;
      }
    });
  }

  scrollCarousel(type: 'popular' | 'topRated', direction: 'left' | 'right'): void {
    const step = 5;
    if (type === 'popular') {
      this.currentIndexPopular = direction === 'left' 
        ? Math.max(0, this.currentIndexPopular - step) 
        : Math.min(this.popularTvShows.length - step, this.currentIndexPopular + step);
    } else if (type === 'topRated') {
      this.currentIndexTopRated = direction === 'left' 
        ? Math.max(0, this.currentIndexTopRated - step) 
        : Math.min(this.topRatedTvShows.length - step, this.currentIndexTopRated + step);
    }
  }

  getImageUrl(path: string | null): string {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : 'assets/images/placeholder.png';
  }
}