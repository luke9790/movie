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
      next: (response) => {
        let filteredWorks = response.cast
          .filter((work: any) => 
            !this.isExcludedTvShow(work) && 
            !this.isAwardShow(work) &&
            work.vote_average >= 7
          )
          .sort((a: any, b: any) => b.popularity - a.popularity);
  
        if (filteredWorks.length < 20) {
          const additionalWorks = response.cast
            .filter((work: any) => 
              !this.isExcludedTvShow(work) && 
              !this.isAwardShow(work) &&
              work.vote_average < 7
            )
            .sort((a: any, b: any) => b.popularity - a.popularity);
  
          filteredWorks = [...filteredWorks, ...additionalWorks].slice(0, 20);
        }
  
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
  
  isExcludedTvShow(work: any): boolean {
    const excludedGenres = [10763, 10764, 10767, 10768, 99]; // News, Reality, Talk, War/Politics, documentari
    return work.media_type === 'tv' && work.genre_ids?.some((id: number) => excludedGenres.includes(id));
  }
  
  isAwardShow(work: any): boolean {
    const awardKeywords = ["oscar", "mtv", "emmy", "golden globe", "bafta", "awards", "ceremony"];
    return work.media_type === 'tv' && awardKeywords.some(keyword => 
      work.title?.toLowerCase().includes(keyword) || work.name?.toLowerCase().includes(keyword)
    );
  }
  
  

  scrollCarousel(direction: 'left' | 'right'): void {
    const step = 5;
    if (this.knownWorks.length) {
      if (direction === 'left') {
        this.currentIndexWork = Math.max(0, this.currentIndexWork - step);
      } else {
        this.currentIndexWork = Math.min(this.knownWorks.length - step, this.currentIndexWork + step);
      }
    }
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
