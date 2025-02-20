import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ThemoviedbService } from '../../services/themoviedb.service';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../../components/carousel/carousel.component';


@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, CarouselComponent],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent implements OnInit {
  movie: any;
  credits: any;

  constructor(private route: ActivatedRoute, private tmdbService: ThemoviedbService) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.fetchMovieDetails(+movieId);
      this.fetchMovieCredits(+movieId);
    }
  }

  fetchMovieDetails(id: number): void {
    this.tmdbService.getMovieDetails(id).subscribe({
      next: (response) => {
        this.movie = response;
      }
    });
  }

  fetchMovieCredits(id: number): void {
    this.tmdbService.getMovieCredits(id).subscribe({
      next: (response) => {
        this.credits = response;
      }
    });
  }
}
