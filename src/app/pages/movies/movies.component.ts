import { Component, OnInit } from '@angular/core';
import { ThemoviedbService } from '../../services/themoviedb.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from '../../components/carousel/carousel.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterModule, CarouselComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit {
  popularMovies: any[] = [];
  upcomingMovies: any[] = [];
  topRatedMovies: any[] = [];
  nowPlayingMovies: any[] = [];

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
}
