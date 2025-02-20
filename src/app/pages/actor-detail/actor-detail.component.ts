import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ThemoviedbService } from '../../services/themoviedb.service';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../../components/carousel/carousel.component';

@Component({
  selector: 'app-actor-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, CarouselComponent],
  templateUrl: './actor-detail.component.html',
  styleUrl: './actor-detail.component.scss'
})
export class ActorDetailComponent implements OnInit {
  actor: any;
  knownWorks: any[] = [];

  constructor(private route: ActivatedRoute, private tmdbService: ThemoviedbService) {}

  ngOnInit(): void {
    const actorId = this.route.snapshot.paramMap.get('id');
    if (actorId) {
      this.fetchActorDetails(+actorId);
      this.fetchActorWorks(+actorId);
    }
  }

  fetchActorDetails(id: number): void {
    this.tmdbService.getPersonDetails(id).subscribe({
      next: (response) => {
        this.actor = response;
      },
      error: (err) => {
        console.error('Error fetching actor details:', err);
      }
    });
  }

  fetchActorWorks(id: number): void {
    this.tmdbService.getPersonDetailsWork(id).subscribe({
      next: (filteredWorks) => {
        console.log(filteredWorks);
        this.knownWorks = filteredWorks.map((work: any) => ({
          id: work.id,
          title: work.title || work.name,
          media_type: work.media_type || (work.first_air_date ? 'tv' : 'movie'),
          poster_path: work.poster_path
        }));
      },
      error: (err) => {
        console.error('Error fetching actor works:', err);
      }
    });
  }  

  getItemRouteArray(item: any): any[] {
    switch (item.media_type) {
      case 'movie':
        return ['/movies', item.id];
      case 'tv':
        return ['/series', item.id];
      default:
        return ['/'];
    }
  }
}
