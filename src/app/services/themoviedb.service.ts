import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

// Interfacce per i dati principali
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

export interface TvShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
}

export interface Person {
  id: number;
  name: string;
  profile_path: string;
  known_for: { title?: string; name?: string; media_type: string }[];
}

export interface ApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})
export class ThemoviedbService {

  private apiUrl = environment.apiUrl;   // es. https://api.themoviedb.org/3
  private apiKey = environment.apiKey;   // es. la tua chiave API

  constructor(private http: HttpClient) {}

  // Funzione per ottenere i parametri comuni
  private getDefaultParams(): HttpParams {
    return new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'it-IT')
      .set('page', '1');
  }

  // Ottenere i film popolari
  getPopularMovies(): Observable<ApiResponse<Movie>> {
    return this.http.get<ApiResponse<Movie>>(`${this.apiUrl}/movie/popular`, {
      params: this.getDefaultParams()
    });
  }

  // Ottenere le serie TV popolari
  getPopularTvShows(): Observable<ApiResponse<TvShow>> {
    return this.http.get<ApiResponse<TvShow>>(`${this.apiUrl}/tv/popular`, {
      params: this.getDefaultParams()
    });
  }

  // Ottenere le persone popolari
  getPopularPeople(): Observable<ApiResponse<Person>> {
    return this.http.get<ApiResponse<Person>>(`${this.apiUrl}/person/popular`, {
      params: this.getDefaultParams()
    });
  }

  // Ottenere tutti i dati popolari insieme
  getAllPopular(): Observable<{ movies: ApiResponse<Movie>, tvShows: ApiResponse<TvShow>, people: ApiResponse<Person> }> {
    return forkJoin({
      movies: this.getPopularMovies(),
      tvShows: this.getPopularTvShows(),
      people: this.getPopularPeople()
    });
  }

  // Ricerca multi-contenuto (film, serie, persone)
  searchMulti(query: string): Observable<any> {
    const params = this.getDefaultParams().set('query', query);
    return this.http.get<any>(`${this.apiUrl}/search/multi`, { params });
  }
}
