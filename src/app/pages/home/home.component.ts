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
  // Numero totale di pagine per ogni contenuto
  movieTotalPages = 1;
  tvTotalPages = 1;
  peopleTotalPages = 1;


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
    this.tmdbService.getPopularMovies(this.moviePage).subscribe({
      next: (response) => {
        this.popularMovies = response.results;
        this.movieTotalPages = response.total_pages; // Salviamo il numero totale di pagine
      }
    });
  }

  // Fetch Serie TV Popolari
  fetchTvShows(): void {
    this.tmdbService.getPopularTvShows(this.tvPage).subscribe({
      next: (response) => {
        this.popularTvShows = response.results;
        this.tvTotalPages = response.total_pages; // Salviamo il numero totale di pagine
      }
    });
  }

  // Fetch Attori Popolari
  fetchPeople(): void {
    this.tmdbService.getPopularPeople(this.peoplePage).subscribe({
      next: (response) => {
        this.popularPeople = response.results;
        this.peopleTotalPages = response.total_pages; // Salviamo il numero totale di pagine
      }
    });
  }


  changePage(type: 'movie' | 'tv' | 'people', page: number): void {
    switch (type) {
      case 'movie':
        this.moviePage = page;
        this.fetchMovies();
        break;
      case 'tv':
        this.tvPage = page;
        this.fetchTvShows();
        break;
      case 'people':
        this.peoplePage = page;
        this.fetchPeople();
        break;
    }
  }
  
  // Funzione per generare numeri di paginazione (max 5 per semplicità)
  getPaginationArray(totalPages: number): number[] {
    const maxPages = 5;
    let startPage = Math.max(1, this.moviePage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }
  

  // Helper per immagini
  getImageUrl(path: string | null): string {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : 'assets/images/placeholder.png';
  }
}

