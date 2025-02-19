import { Component, OnInit } from '@angular/core';
import { ThemoviedbService } from '../../services/themoviedb.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-actors',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './actors.component.html',
  styleUrl: './actors.component.scss'
})
export class ActorsComponent implements OnInit {
  popularActors: any[] = [];
  currentIndexPopular = 0;

  constructor(private tmdbService: ThemoviedbService) {}

  ngOnInit(): void {
    this.fetchPopularActors();
  }

  fetchPopularActors(): void {
    this.tmdbService.getPopularPeople().subscribe({
      next: (response) => {
        this.popularActors = response.results;
      }
    });
  }

  scrollCarousel(direction: 'left' | 'right'): void {
    const step = 5;
    this.currentIndexPopular = direction === 'left' 
      ? Math.max(0, this.currentIndexPopular - step) 
      : Math.min(this.popularActors.length - step, this.currentIndexPopular + step);
  }

  getImageUrl(path: string | null): string {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : 'assets/images/placeholder.png';
  }
}
