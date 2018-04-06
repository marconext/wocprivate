import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import { Project } from './project.model';
import { BusinessLocation } from '../locations/business-location.model';
import { LocationService } from '../locations/location.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  parentKeyNamePath: string;

  constructor(private projectService: ProjectsService) {
    this.projects = this.projectService.getAllProjects();
  }

  ngOnInit() {
  }

  onLocationChanged(loc: BusinessLocation) {
    this.parentKeyNamePath = loc ? loc.keyNamePath : '';
    this.projects = this.projectService.getFilteredProjects({locationsKeyNamePath: this.parentKeyNamePath});
  }
}
