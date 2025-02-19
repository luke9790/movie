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
      .set('language', 'en-US')
      .set('page', '1');
  }

  // Ottenere i dettagli di un film
  getMovieDetails(movieId: number): Observable<Movie> {
    const params = this.getDefaultParams();
    return this.http.get<Movie>(`${this.apiUrl}/movie/${movieId}`, { params });
  }

  // Ottenere i dettagli di una serie TV
  getTvShowDetails(tvId: number): Observable<TvShow> {
    const params = this.getDefaultParams();
    return this.http.get<TvShow>(`${this.apiUrl}/tv/${tvId}`, { params });
  }

  // Ottenere i dettagli di un attore
  getPersonDetails(personId: number): Observable<Person> {
    const params = this.getDefaultParams();
    return this.http.get<Person>(`${this.apiUrl}/person/${personId}`, { params });
  }

  // Ottenere i film popolari (con pagina)
  getPopularMovies(page: number = 1): Observable<ApiResponse<Movie>> {
    const params = this.getDefaultParams().set('page', page.toString());
    return this.http.get<ApiResponse<Movie>>(`${this.apiUrl}/movie/popular`, { params });
  }

  // Ottenere i film in arrivo (con pagina)
  getUpcomingMovies(page: number = 1): Observable<ApiResponse<Movie>> {
    const params = this.getDefaultParams().set('page', page.toString());
    return this.http.get<ApiResponse<Movie>>(`${this.apiUrl}/movie/upcoming`, { params });
  }

  // Ottenere i film migliori (Top Rated) (con pagina)
  getTopRatedMovies(page: number = 1): Observable<ApiResponse<Movie>> {
    const params = this.getDefaultParams().set('page', page.toString());
    return this.http.get<ApiResponse<Movie>>(`${this.apiUrl}/movie/top_rated`, { params });
  }

  // Ottenere i film attualmente in sala (Now Playing) (con pagina)
  getNowPlayingMovies(page: number = 1): Observable<ApiResponse<Movie>> {
    const params = this.getDefaultParams().set('page', page.toString());
    return this.http.get<ApiResponse<Movie>>(`${this.apiUrl}/movie/now_playing`, { params });
  }


  // Ottenere le serie TV popolari (con pagina)
  getPopularTvShows(page: number = 1): Observable<ApiResponse<TvShow>> {
    const params = this.getDefaultParams().set('page', page.toString());
    return this.http.get<ApiResponse<TvShow>>(`${this.apiUrl}/tv/popular`, { params });
  }

  // Ottenere le serie TV migliori (Top Rated) (con pagina)
  getTopRatedTvShows(page: number = 1): Observable<ApiResponse<TvShow>> {
    const params = this.getDefaultParams().set('page', page.toString());
    return this.http.get<ApiResponse<TvShow>>(`${this.apiUrl}/tv/top_rated`, { params });
  }

  // Ottenere le serie TV in onda (On The Air) (con pagina)
  getOnTheAirTvShows(page: number = 1): Observable<ApiResponse<TvShow>> {
    const params = this.getDefaultParams().set('page', page.toString());
    return this.http.get<ApiResponse<TvShow>>(`${this.apiUrl}/tv/on_the_air`, { params });
  }

  // Ottenere le serie TV in onda oggi (Airing Today) (con pagina)
  getAiringTodayTvShows(page: number = 1): Observable<ApiResponse<TvShow>> {
    const params = this.getDefaultParams().set('page', page.toString());
    return this.http.get<ApiResponse<TvShow>>(`${this.apiUrl}/tv/airing_today`, { params });
  }

  // Ottenere le persone popolari (con pagina)
  getPopularPeople(page: number = 1): Observable<ApiResponse<Person>> {
    const params = this.getDefaultParams().set('page', page.toString());
    return this.http.get<ApiResponse<Person>>(`${this.apiUrl}/person/popular`, { params });
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
