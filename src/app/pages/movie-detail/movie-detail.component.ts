import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ThemoviedbService } from '../../services/themoviedb.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent implements OnInit {
  movie: any;
  credits: any;
  currentIndexPeople: number = 0;

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

  scrollCarousel(direction: 'left' | 'right'): void {
      if (direction === 'left') {
        this.currentIndexPeople = (this.currentIndexPeople - 5 < 0) ? Math.max(0, this.credits?.cast.length - 5) : this.currentIndexPeople - 5;
      } else {
        this.currentIndexPeople = (this.currentIndexPeople + 5 >= (this.credits?.cast.length || 0)) ? 0 : this.currentIndexPeople + 5;
      }
  }

  getImageUrl(path: string | null): string {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : 'assets/images/placeholder.png';
  }
}
