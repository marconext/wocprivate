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
  rootNodes: BusinessLocation[];
  selectedLocation: BusinessLocation;

  constructor(private projectService: ProjectsService, private locationService: LocationService) {
    this.projects = this.projectService.getAllProjects();
    this.rootNodes = this.locationService.getRootLocations();
  }

  ngOnInit() {
  }

  onLocationChanged(loc: BusinessLocation) {
    this.projects = this.projectService.getFilteredProjects({locationsKeyNamePath: loc.keyNamePath});
  }

}
