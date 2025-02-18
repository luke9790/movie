import { Component, OnInit } from '@angular/core';
import { ThemoviedbService } from '../../services/themoviedb.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  // Dati principali
  popularMovies: any[] = [];
  popularTvShows: any[] = [];
  popularPeople: any[] = [];

  // Stato della paginazione
  moviePage: number = 1;
  tvPage: number = 1;
  peoplePage: number = 1;
  loadingMovies = false;
  loadingTv = false;
  loadingPeople = false;

  constructor(private tmdbService: ThemoviedbService) {}

  ngOnInit(): void {
    this.fetchMovies();
    this.fetchTvShows();
    this.fetchPeople();
  }

  // Fetch Film Popolari
  fetchMovies(): void {
    this.loadingMovies = true;
    this.tmdbService.getPopularMovies(this.moviePage).subscribe({
      next: (response) => {
        this.popularMovies = response.results;
        this.loadingMovies = false;
      },
      error: () => this.loadingMovies = false
    });
  }

  // Fetch Serie TV Popolari
  fetchTvShows(): void {
    this.loadingTv = true;
    this.tmdbService.getPopularTvShows(this.tvPage).subscribe({
      next: (response) => {
        this.popularTvShows = response.results;
        this.loadingTv = false;
      },
      error: () => this.loadingTv = false
    });
  }

  // Fetch Attori Popolari
  fetchPeople(): void {
    this.loadingPeople = true;
    this.tmdbService.getPopularPeople(this.peoplePage).subscribe({
      next: (response) => {
        this.popularPeople = response.results;
        this.loadingPeople = false;
      },
      error: () => this.loadingPeople = false
    });
  }

  // Cambia pagina (Generico)
  changePage(type: 'movie' | 'tv' | 'people', direction: 'next' | 'prev'): void {
    switch (type) {
      case 'movie':
        this.moviePage = direction === 'next' ? this.moviePage + 1 : Math.max(1, this.moviePage - 1);
        this.fetchMovies();
        break;
      case 'tv':
        this.tvPage = direction === 'next' ? this.tvPage + 1 : Math.max(1, this.tvPage - 1);
        this.fetchTvShows();
        break;
      case 'people':
        this.peoplePage = direction === 'next' ? this.peoplePage + 1 : Math.max(1, this.peoplePage - 1);
        this.fetchPeople();
        break;
    }
  }

  // Helper per immagini
  getImageUrl(path: string | null): string {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : 'assets/images/placeholder.png';
  }
}

