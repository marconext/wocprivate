import { Component, OnInit } from '@angular/core';
import { ProjectOrEmployee, FavoritesService } from './favorites.service';
import { Project } from '../projects/project.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favoritesItems: ProjectOrEmployee[];
  selectedItems: ProjectOrEmployee[];

  constructor(
     private favoritesService: FavoritesService
  ) {
    this.selectedItems = [];
    this.favoritesItems = favoritesService.getAll();
  }

  ngOnInit() {
  }

  removeFromFavorites() {
    this.selectedItems.forEach(item => {
      this.favoritesService.remove(item);
    });
  }
}
