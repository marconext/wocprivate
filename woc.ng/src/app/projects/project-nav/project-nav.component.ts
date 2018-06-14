import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../favorites/favorites.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-project-nav',
  templateUrl: './project-nav.component.html',
  styleUrls: ['./project-nav.component.scss']
})
export class ProjectNavComponent implements OnInit {

  menuItems: MenuItem[];

  constructor(public favoritesService: FavoritesService) {

  }

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Search',
        routerLink: '/projects/filter',
        visible: true
      },
      {
        label: 'Favorites',
        routerLink: '/projects/favorites',
        // badge: this.favoritesService.count ? this.favoritesService.count.toString() : ''
        badgeStyleClass: 'badge',
        badge: '3'
      }
    ];
  }
}
