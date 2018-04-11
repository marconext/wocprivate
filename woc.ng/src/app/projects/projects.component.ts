import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import { Project } from './project.model';
import { Region } from '../regions/region.model';
// import { LocationService } from '../locations/location.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  parentKeyNamePath: string;
  projectLocations: Region[];

  constructor(private projectService: ProjectsService) {

    this.projectService.getAllAsync().subscribe(projects => {
      this.projects = projects;
    });

    this.projectService.GetProjectChildRegionsByKeyNamePathsAsync(';').subscribe(locations => {
      this.projectLocations = locations;
    });
  }

  ngOnInit() {
  }

  onLocationChanged(loc: Region) {
    this.parentKeyNamePath = loc ? loc.keyNamePath : '';
    this.projectService.getFilteredProjectsAsync({locationsKeyNamePath: this.parentKeyNamePath})
      .subscribe(projects => {
        this.projects = projects;
      }
    );
  }
}
