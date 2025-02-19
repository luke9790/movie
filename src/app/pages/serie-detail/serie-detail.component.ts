import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemoviedbService } from '../../services/themoviedb.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-series-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './serie-detail.component.html',
  styleUrl: './serie-detail.component.scss'
})
export class SeriesDetailComponent implements OnInit {
  series: any;

  constructor(private route: ActivatedRoute, private tmdbService: ThemoviedbService) {}

  ngOnInit(): void {
    const seriesId = this.route.snapshot.paramMap.get('id');
    if (seriesId) {
      this.fetchSeriesDetails(+seriesId);
    }
  }

  fetchSeriesDetails(id: number): void {
    this.tmdbService.getTvShowDetails(id).subscribe({
      next: (response) => {
        this.series = response;
      }
    });
  }
}
