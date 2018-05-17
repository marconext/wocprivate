import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../favorites/favorites.service';

@Component({
  selector: 'app-project-nav',
  templateUrl: './project-nav.component.html',
  styleUrls: ['./project-nav.component.scss']
})
export class ProjectNavComponent implements OnInit {

  constructor(public favoritesService: FavoritesService) {

  }

  ngOnInit() {
  }

}
