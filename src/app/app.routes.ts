import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { SeriesComponent } from './pages/series/series.component';
import { ActorsComponent } from './pages/actors/actors.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { SerieDetailComponent } from './pages/serie-detail/serie-detail.component';
import { ActorDetailComponent } from './pages/actor-detail/actor-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: 'series', component: SeriesComponent },
  { path: 'series/:id', component: SerieDetailComponent },
  { path: 'actors', component: ActorsComponent },
  { path: 'actors/:id', component: ActorDetailComponent },
  { path: '**', redirectTo: '' }
];
