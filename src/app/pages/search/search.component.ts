import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemoviedbService } from '../../services/themoviedb.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  query: string = '';
  results: any[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: ThemoviedbService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
      if (this.query) {
        this.performSearch();
      }
    });
  }

  performSearch(): void {
    this.loading = true;
    this.error = null;
    this.tmdbService.searchMulti(this.query).subscribe({
      next: (response) => {
        this.results = response.results;
        this.loading = false;
      },
      error: (err) => {
        console.error('Errore nella ricerca:', err);
        this.error = 'Errore durante la ricerca. Riprova più tardi.';
        this.loading = false;
      }
    });
  }

  getImageUrl(path: string | null): string {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : 'assets/images/placeholder.png';
  }
}
