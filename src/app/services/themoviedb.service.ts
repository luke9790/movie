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
  original_language: string;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
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

  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;
  private preferredLanguages = ['en','it'];

  constructor(private http: HttpClient) {}

  private getDefaultParams(): HttpParams {
    return new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'en-US')
  }

  private isExcludedTvShow(series: TvShow): boolean {
    const excludedGenres = [10763, 10764, 10767, 10768, 99]; // News, Reality, Talk, Politics, Documentari
    return series.genre_ids?.some((id) => excludedGenres.includes(id));
  }

  private isAwardShow(series: any): boolean {
    const awardKeywords = ["oscar", "mtv", "emmy", "golden globe", "bafta", "awards", "ceremony"];
    return awardKeywords.some(keyword => 
      series.title?.toLowerCase().includes(keyword) || 
      series.name?.toLowerCase().includes(keyword)
    );
  }

  private isPreferredLanguage(series: TvShow): boolean {
    return this.preferredLanguages.includes(series.original_language);
  }

  getMovieDetails(movieId: number): Observable<Movie> {
    const params = this.getDefaultParams();
    return this.http.get<Movie>(`${this.apiUrl}/movie/${movieId}`, { params });
  }

  getMovieCredits(movieId: number): Observable<Movie> {
    const params = this.getDefaultParams();
    return this.http.get<Movie>(`${this.apiUrl}/movie/${movieId}/credits`, { params });
  }

  getTvShowDetails(tvId: number): Observable<TvShow> {
    const params = this.getDefaultParams();
    return this.http.get<TvShow>(`${this.apiUrl}/tv/${tvId}`, { params });
  }

  getTvShowCredits(tvId: number): Observable<TvShow> {
    const params = this.getDefaultParams();
    return this.http.get<TvShow>(`${this.apiUrl}/tv/${tvId}/credits`, { params });
  }

  getPersonDetails(personId: number): Observable<Person> {
    const params = this.getDefaultParams();
    return this.http.get<Person>(`${this.apiUrl}/person/${personId}`, { params });
  }

  getPersonDetailsWork(personId: number): Observable<any[]> {
    const params = this.getDefaultParams();
    return this.http.get<any>(`${this.apiUrl}/person/${personId}/combined_credits`, { params }).pipe(
      map(response => response.cast
        .filter((work: any) => 
          !this.isExcludedTvShow(work) && 
          !this.isAwardShow(work) && 
          work.vote_average >= 7
        )
        .sort((a: any, b: any) => b.popularity - a.popularity)
        .slice(0, 20)
      )
    );
  }

  getPopularMovies(page: number = 1): Observable<ApiResponse<Movie>> {
    const params = this.getDefaultParams().set('page', page.toString());
    return this.http.get<ApiResponse<Movie>>(`${this.apiUrl}/movie/popular`, { params });
  }

  getUpcomingMovies(page: number = 1): Observable<ApiResponse<Movie>> {
    const params = this.getDefaultParams().set('page', page.toString());
    return this.http.get<ApiResponse<Movie>>(`${this.apiUrl}/movie/upcoming`, { params });
  }

  getTopRatedMovies(page: number = 1): Observable<ApiResponse<Movie>> {
    const params = this.getDefaultParams().set('page', page.toString());
    return this.http.get<ApiResponse<Movie>>(`${this.apiUrl}/movie/top_rated`, { params });
  }

  getNowPlayingMovies(page: number = 1): Observable<ApiResponse<Movie>> {
    const params = this.getDefaultParams().set('page', page.toString());
    return this.http.get<ApiResponse<Movie>>(`${this.apiUrl}/movie/now_playing`, { params });
  }

  getPopularTvShows(minResults: number = 20, maxPages: number = 10): Observable<TvShow[]> {
    let allResults: TvShow[] = [];
    let currentPage = 1;
  
    return new Observable<TvShow[]>(observer => {
      const fetchPage = () => {
        const params = this.getDefaultParams().set('page', currentPage.toString());
  
        this.http.get<ApiResponse<TvShow>>(`${this.apiUrl}/tv/popular`, { params }).subscribe({
          next: response => {
            const filteredResults = response.results.filter(series => 
              !this.isExcludedTvShow(series) &&
              !this.isAwardShow(series) && 
              this.isPreferredLanguage(series) 
            );
  
            allResults = [...allResults, ...filteredResults];
  
            if (allResults.length >= minResults || currentPage >= maxPages) {
              observer.next(allResults.slice(0, minResults)); 
              observer.complete();
            } else {
              currentPage++;
              fetchPage(); 
            }
          },
          error: err => observer.error(err)
        });
      };
  
      fetchPage();
    });
  }
  

  // Ottenere le serie TV migliori (Top Rated) (con pagina)
  getTopRatedTvShows(minResults: number = 20, maxPages: number = 5): Observable<TvShow[]> {
    let allResults: TvShow[] = [];
    let currentPage = 1;
  
    return new Observable<TvShow[]>(observer => {
      const fetchPage = () => {
        const params = this.getDefaultParams().set('page', currentPage.toString());
  
        this.http.get<ApiResponse<TvShow>>(`${this.apiUrl}/tv/top_rated`, { params }).subscribe({
          next: response => {
            const filteredResults = response.results.filter(series => 
              !this.isExcludedTvShow(series) &&
              !this.isAwardShow(series) &&
              this.isPreferredLanguage(series)
            );
  
            allResults = [...allResults, ...filteredResults];
  
            if (allResults.length >= minResults || currentPage >= maxPages) {
              observer.next(allResults.slice(0, minResults)); 
              observer.complete();
            } else {
              currentPage++;
              fetchPage(); 
            }
          },
          error: err => observer.error(err)
        });
      };
  
      fetchPage();
    });
  }
  

  // Ottenere le serie TV in onda (On The Air) (con pagina)
  getOnTheAirTvShows(minResults: number = 20, maxPages: number = 5): Observable<TvShow[]> {
    let allResults: TvShow[] = [];
    let currentPage = 1;
  
    return new Observable<TvShow[]>(observer => {
      const fetchPage = () => {
        const params = this.getDefaultParams().set('page', currentPage.toString());
  
        this.http.get<ApiResponse<TvShow>>(`${this.apiUrl}/tv/on_the_air`, { params }).subscribe({
          next: response => {
            const filteredResults = response.results.filter(series => 
              !this.isExcludedTvShow(series) &&
              !this.isAwardShow(series) &&
              this.isPreferredLanguage(series) // 🔥 Filtro per lingua
            );
  
            allResults = [...allResults, ...filteredResults];
  
            if (allResults.length >= minResults || currentPage >= maxPages) {
              observer.next(allResults.slice(0, minResults)); 
              observer.complete();
            } else {
              currentPage++;
              fetchPage(); 
            }
          },
          error: err => observer.error(err)
        });
      };
  
      fetchPage();
    });
  }
  


  // Ottenere le persone popolari (con pagina)
  getPopularPeople(page: number = 1): Observable<ApiResponse<Person>> {
    const params = this.getDefaultParams().set('page', page.toString());
    return this.http.get<ApiResponse<Person>>(`${this.apiUrl}/person/popular`, { params });
  }

  // Ricerca multi-contenuto (film, serie, persone)
  searchMulti(query: string): Observable<any> {
    const params = this.getDefaultParams().set('query', query);
    return this.http.get<any>(`${this.apiUrl}/search/multi`, { params });
  }
}
