import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import { Project } from './project.model';
import { Region } from '../regions/region.model';
import { SearchTag } from '../search-tag-box/search-tag.model';
import { ProjectFilter } from './project-filter';
import { Offering } from '../offerings/offering.model';
import { Skill } from '../skills/Skill.model';
import { SearchTagBoxService } from '../search-tag-box/search-tag-box.service';
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

  selectedProject: Project;

  constructor(private projectService: ProjectsService, private searchTagBoxService: SearchTagBoxService) {

    // this.projectService.getAllAsync().subscribe(projects => {
    //   this.projects = projects;
    // });

    this.projectService.searchProjectsAsync(new ProjectFilter()).subscribe(projects => {
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

  onProjectSelectionChanged(project: Project) {
    this.selectedProject = project;
    this.projectService.getProjectByIdAsync(project.id).subscribe(p => {
        this.selectedProject = p;
      }
    );
  }

  onRegionChanged(loc: Region) {
    if (loc) {
      this.searchTags = this.searchTagBoxService.addTag(new SearchTag('Region', loc.name, loc.keyNamePath));
      this.searchProjects();
    }
  }

  onOfferingChanged(loc: Offering) {
    // this.parentKeyNamePath = loc ? loc.keyNamePath : '';
    // if (loc) {
    //   if (this.searchTags.find(x => x.keyNamePath === loc.keyNamePath) == null) {
    //     this.searchTags.push(new SearchTag('Offering', loc.name , loc.keyNamePath));
    //   }
    // }

    if (loc) {
      this.searchTags = this.searchTagBoxService.addTag(new SearchTag('Offering', loc.name, loc.keyNamePath));
      this.searchProjects();
    }
  }

  onSkillChanged(skill: Skill) {
    // if (this.searchTags.find(x => x.display === skill.name) == null) {
    //   this.searchTags.push(new SearchTag('Skill', skill.name , skill.name));
    // }
    if (skill) {
      this.searchTags = this.searchTagBoxService.addTag(new SearchTag('Skill', skill.name, skill.keyNamePath));
      this.searchProjects();
    }
  }

  onSearchTagDeleted(keyNamePath: string) {
    this.searchTags = this.searchTagBoxService.deleteTag(keyNamePath);
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
      if (st.type === 'Skill') {
        filter.SkillNames.push(st.display);
      }
    });

    this.projectService.searchProjectsAsync(filter)
    .subscribe(projects => {
      this.projects = projects;
    });
  }
}
