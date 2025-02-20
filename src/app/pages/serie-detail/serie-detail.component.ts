import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ThemoviedbService } from '../../services/themoviedb.service';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../../components/carousel/carousel.component';


@Component({
  selector: 'app-series-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, CarouselComponent],
  templateUrl: './serie-detail.component.html',
  styleUrl: './serie-detail.component.scss'
})
export class SeriesDetailComponent implements OnInit {
  series: any;
  credits: any;

  constructor(private route: ActivatedRoute, private tmdbService: ThemoviedbService) {}

  ngOnInit(): void {
    const seriesId = this.route.snapshot.paramMap.get('id');
    if (seriesId) {
      this.fetchSeriesDetails(+seriesId);
      this.fetchSeriesCredits(+seriesId);
    }
  }

  fetchSeriesDetails(id: number): void {
    this.tmdbService.getTvShowDetails(id).subscribe({
      next: (response) => {
        this.series = response;
      }
    });
  }

  fetchSeriesCredits(id: number): void {
    this.tmdbService.getTvShowCredits(id).subscribe({
      next: (response) => {
        this.credits = response;
      }
    });
  }
}
