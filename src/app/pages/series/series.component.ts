import { Component, OnInit } from '@angular/core';
import { ThemoviedbService } from '../../services/themoviedb.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from '../../components/carousel/carousel.component';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [CommonModule, RouterModule, CarouselComponent],
  templateUrl: './series.component.html',
  styleUrl: './series.component.scss'
})
export class SeriesComponent implements OnInit {
  popularTvShows: any[] = [];
  topRatedTvShows: any[] = [];
  onTheAirTvShows: any[] = [];

  constructor(private tmdbService: ThemoviedbService) {}

  ngOnInit(): void {
    this.fetchPopularTvShows();
    this.fetchTopRatedTvShows();
    this.fetchOnTheAirTvShows();
  }

  fetchPopularTvShows(): void {
    this.tmdbService.getPopularTvShows().subscribe({
      next: (tvShows) => {
        console.log(tvShows);
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
        console.log("Risposta TOP RATED: ", topRated);
        this.topRatedTvShows = topRated;
      }
    });
  }

  fetchOnTheAirTvShows(): void {
    this.tmdbService.getOnTheAirTvShows().subscribe({
      next: (onTheAirTvShows) => {
        console.log("Risposta on the air: ", onTheAirTvShows);
        this.onTheAirTvShows = onTheAirTvShows;
      }
    });
  }
}
