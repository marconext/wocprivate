import { Component, OnInit } from '@angular/core';
import { ProjectOrEmployee, FavoritesService } from './favorites.service';
import { Project } from '../projects/project.model';
import { ProjectsService } from '../projects/projects.service';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favoritesItems: ProjectOrEmployee[];
  selectedItems: ProjectOrEmployee[];

  constructor(
     private favoritesService: FavoritesService,
     private projectService: ProjectsService
  ) {
    this.selectedItems = [];
    this.favoritesItems = [];
    this.favoritesItems = favoritesService.getAll();
  }

  ngOnInit() {
  }

  removeFromFavorites() {
    this.selectedItems.forEach(item => {
      this.favoritesService.remove(item);
      this.favoritesItems = this.favoritesService.getAll();
    });
  }

  download() {
    const ids = this.selectedItems.map(i => i.id);
    // this.projectService.CreatePdfForIdsAsync(['315BF4B2-7DC5-46B8-9F47-C1CE9BA27202', '24C51C88-9EE6-4680-B34C-63DCED09C21F']).subscribe(
    this.projectService.CreatePdfForIdsAsync(ids).subscribe(
      res => {
        const blob = new Blob([res], { type: 'text/plain' });
        saveAs(blob, 'myFilename.pdf');
      }
    );
  }
}
