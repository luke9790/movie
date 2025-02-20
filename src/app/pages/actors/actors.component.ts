import { Component, OnInit } from '@angular/core';
import { ThemoviedbService } from '../../services/themoviedb.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from '../../components/carousel/carousel.component';

@Component({
  selector: 'app-actors',
  standalone: true,
  imports: [CommonModule, RouterModule, CarouselComponent],
  templateUrl: './actors.component.html',
  styleUrl: './actors.component.scss'
})
export class ActorsComponent implements OnInit {
  popularActorsPage1: any[] = [];
  popularActorsPage2: any[] = [];

  constructor(private tmdbService: ThemoviedbService) {}

  ngOnInit(): void {
    this.fetchPopularActors();
  }

  fetchPopularActors(): void {
    this.tmdbService.getPopularPeople(1).subscribe({
      next: (response) => {
        this.popularActorsPage1 = response.results;
      }
    });

    this.tmdbService.getPopularPeople(2).subscribe({
      next: (response) => {
        this.popularActorsPage2 = response.results;
      }
    });
  }
}
