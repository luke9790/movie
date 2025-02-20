import { Component, OnInit } from '@angular/core';
import { ThemoviedbService } from '../../services/themoviedb.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  popularMovies: any[] = [];
  popularTvShows: any[] = [];
  popularPeople: any[] = [];

  currentIndexMovie = 0;
  currentIndexTv = 0;
  currentIndexPeople = 0;

  constructor(private tmdbService: ThemoviedbService) {}

  ngOnInit(): void {
    this.fetchMovies();
    this.fetchTvShows();
    this.fetchPeople();
  }

  fetchMovies(): void {
    this.tmdbService.getPopularMovies(1).subscribe({
      next: (response) => {
        this.popularMovies = response.results;
      }
    });
  }

  fetchTvShows(): void {
    this.tmdbService.getPopularTvShows().subscribe({
      next: (tvShows) => {
        this.popularTvShows = tvShows;
      },
      error: (err) => {
        console.error("Error fetching TV shows:", err);
      }
    });
  }
  

  fetchPeople(): void {
    this.tmdbService.getPopularPeople(1).subscribe({
      next: (response) => {
        this.popularPeople = response.results;
      }
    });
  }

  scrollCarousel(type: 'movie' | 'tv' | 'people', direction: 'left' | 'right'): void {
    switch (type) {
      case 'movie':
        if (direction === 'left') {
          this.currentIndexMovie = (this.currentIndexMovie - 5 < 0) ? 15 : this.currentIndexMovie - 5;
        } else {
          this.currentIndexMovie = (this.currentIndexMovie + 5 > 15) ? 0 : this.currentIndexMovie + 5;
        }
        break;
      case 'tv':
        if (direction === 'left') {
          this.currentIndexTv = (this.currentIndexTv - 5 < 0) ? 15 : this.currentIndexTv - 5;
        } else {
          this.currentIndexTv = (this.currentIndexTv + 5 > 15) ? 0 : this.currentIndexTv + 5;
        }
        break;
      case 'people':
        if (direction === 'left') {
          this.currentIndexPeople = (this.currentIndexPeople - 5 < 0) ? 15 : this.currentIndexPeople - 5;
        } else {
          this.currentIndexPeople = (this.currentIndexPeople + 5 > 15) ? 0 : this.currentIndexPeople + 5;
        }
        break;
    }
  }

  // ricostruire url completo per immagine
  getImageUrl(path: string | null, size: string = 'w500'): string {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : 'assets/images/placeholder.png';
  }
  
}
