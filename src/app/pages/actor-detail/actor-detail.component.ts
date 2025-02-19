import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemoviedbService } from '../../services/themoviedb.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actor-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actor-detail.component.html',
  styleUrl: './actor-detail.component.scss'
})
export class ActorDetailComponent implements OnInit {
  actor: any;

  constructor(private route: ActivatedRoute, private tmdbService: ThemoviedbService) {}

  ngOnInit(): void {
    const actorId = this.route.snapshot.paramMap.get('id');
    if (actorId) {
      this.fetchActorDetails(+actorId);
    }
  }

  fetchActorDetails(id: number): void {
    this.tmdbService.getPersonDetails(id).subscribe({
      next: (response) => {
        this.actor = response;
      }
    });
  }
}
