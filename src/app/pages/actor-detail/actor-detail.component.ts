import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ThemoviedbService } from '../../services/themoviedb.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actor-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './actor-detail.component.html',
  styleUrl: './actor-detail.component.scss'
})
export class ActorDetailComponent implements OnInit {
  actor: any;
  knownWorks: any[] = [];
  currentIndexWork: number = 0;

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

  scrollCarousel(direction: 'left' | 'right'): void {
    const step = 5;
    const totalWorks = this.knownWorks.length;
  
    if (totalWorks > 0) {
      if (direction === 'left') {
        this.currentIndexWork = (this.currentIndexWork - step + totalWorks) % totalWorks;
      } else {
        this.currentIndexWork = (this.currentIndexWork + step) % totalWorks;
      }
    }
  }
  
  getVisibleWorks(): any[] {
    const step = 5;
    const totalWorks = this.knownWorks.length;
    if (totalWorks === 0) return [];
  
    const startIndex = this.currentIndexWork;
    let visibleWorks = this.knownWorks.slice(startIndex, startIndex + step);
  
    if (visibleWorks.length < step) {
      visibleWorks = [...visibleWorks, ...this.knownWorks.slice(0, step - visibleWorks.length)];
    }
    return visibleWorks;
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
