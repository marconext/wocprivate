import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import { Project } from './project.model';
import { Region } from '../regions/region.model';
import { SearchTag } from '../search-tag-box/search-tag.model';
import { ProjectFilter } from './project-filter';
import { Offering } from '../offerings/offering.model';
// import { LocationService } from '../locations/location.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  parentKeyNamePath: string;
  projectRegions: Region[];
  projectOfferings: Offering[];

  searchTags: SearchTag[];

  constructor(private projectService: ProjectsService) {

    this.projectService.getAllAsync().subscribe(projects => {
      this.projects = projects;
    });

    this.projectService.GetProjectChildRegionsByKeyNamePathsAsync(';').subscribe(locations => {
      this.projectRegions = locations;
    });

    this.projectService.GetProjectChildOfferingsByKeyNamePathsAsync(';').subscribe(offerings => {
      this.projectOfferings = offerings;
    });

    this.searchTags = [];
  }

  ngOnInit() {
  }

  onRegionChanged(loc: Region) {
    this.parentKeyNamePath = loc ? loc.keyNamePath : '';
    if (loc) {
      if (this.searchTags.find(x => x.keyNamePath === loc.keyNamePath) == null) {
        this.searchTags.push(new SearchTag('Region', loc.name , loc.keyNamePath));
      }
    }
    this.searchProjects();
  }

  onOfferingChanged(loc: Offering) {
    this.parentKeyNamePath = loc ? loc.keyNamePath : '';
    if (loc) {
      if (this.searchTags.find(x => x.keyNamePath === loc.keyNamePath) == null) {
        this.searchTags.push(new SearchTag('Offering', loc.name , loc.keyNamePath));
      }
    }
    this.searchProjects();
  }

  onSearchTagDeleted(keyNamePath: string) {
    this.searchTags = this.searchTags.filter(t => t.keyNamePath !== keyNamePath);
    this.searchProjects();
  }

  searchProjects() {
    const filter = new ProjectFilter();


    this.searchTags.forEach(st => {
      if (st.type === 'Region') {
        filter.RegionKeyNames.push(st.keyNamePath);
      }
      if (st.type === 'Offering') {
        filter.OfferingKeyNames.push(st.keyNamePath);
      }
    });

    this.projectService.searchProjectsAsync(filter)
    .subscribe(projects => {
      this.projects = projects;
    });
  }
}
