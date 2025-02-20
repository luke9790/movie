import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchQuery: string = '';
  isMenuOpen: boolean = false;
  isAnimating: boolean = false;

  constructor(private router: Router) {}

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
      this.searchQuery = ''; 
    }
  }

  toggleMenu(): void {
    if (!this.isMenuOpen) {
      this.isAnimating = true;
    }
    this.isMenuOpen = !this.isMenuOpen;
  }

  onAnimationEnd(): void {
    this.isAnimating = false;
  }
}
