import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="container">
      <nav>
        <a routerLink="/zone-tree" routerLinkActive="active">1. Zone.js (Default)</a>
        <a routerLink="/onpush-tree" routerLinkActive="active">2. OnPush</a>
      </nav>
      
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
