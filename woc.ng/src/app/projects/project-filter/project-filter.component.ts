import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { Project } from '../project.model';
import { Region } from '../../regions/region.model';
import { SearchTag } from '../../search-tag-box/search-tag.model';
import { ProjectFilterModel } from '../project-filter.model';
import { Offering } from '../../offerings/offering.model';
import { Skill } from '../../skills/Skill.model';
import { SearchTagBoxService } from '../../search-tag-box/search-tag-box.service';
import { Customer } from '../../customers/customer.model';
import { Industry } from '../../insustries/industry.model';
import { FavoritesService } from '../../favorites/favorites.service';
// import { LocationService } from '../locations/location.service';

@Component({
  selector: 'app-project-filter',
  templateUrl: './project-filter.component.html'
})
export class ProjectFilterComponent implements OnInit {
  projects: Project[];
  customers: Customer[];
  industries: Industry[];
  parentKeyNamePath: string;
  projectRegions: Region[];
  projectOfferings: Offering[];

  searchTags: SearchTag[];

  selectedProject: Project;

  showfavoritesModal: boolean;
  favoritesCount: number;

  constructor(
    private projectService: ProjectsService,
    private searchTagBoxService: SearchTagBoxService,
    public favoritesService: FavoritesService
  ) {

    // this.projectService.getAllAsync().subscribe(projects => {
    //   this.projects = projects;
    // });

    this.projectService.searchProjectsAsync(new ProjectFilterModel()).subscribe(projects => {
      this.projects = projects;
    });


    this.projectService.GetProjectChildRegionsByKeyNamePathsAsync(';').subscribe(locations => {
      this.projectRegions = locations;
    });

    this.projectService.GetProjectChildOfferingsByKeyNamePathsAsync(';').subscribe(offerings => {
      this.projectOfferings = offerings;
    });

    this.projectService.GetProjectCustomers().subscribe(customers => {
      this.customers = customers;
    });

    this.projectService.GetProjectIndustries().subscribe(industries => {
      this.industries = industries;
    });

    this.searchTags = [];

    this.showfavoritesModal = false;
    this.favoritesCount = 0;
  }

  ngOnInit() {
  }

  onProjectSelectionChanged(project: Project) {
    this.selectedProject = project;
    this.projectService.getProjectByIdAsync(project.id).subscribe(p => {
        this.selectedProject = p;
        const eleme = document.getElementsByName('projectdetailanchor')[0];
        if (eleme) {
          eleme.scrollIntoView();
        }
      }
    );
  }

  onAddRemoveProjectToFavorites() {
    this.favoritesService.addOrRemove(this.selectedProject);
    this.favoritesCount = this.favoritesService.getAll().length;
  }

  onRegionChanged(loc: Region) {
    if (loc) {
      this.searchTags = this.searchTagBoxService.addTag(new SearchTag('Region', loc.name, loc.keyNamePath));
      this.searchProjects();
    }
  }

  onOfferingChanged(offering: Offering) {
    if (offering) {
      this.searchTags = this.searchTagBoxService.addTag(new SearchTag('Offering', offering.name, offering.keyNamePath));
      this.searchProjects();
    }
  }

  onSkillChanged(skill: Skill) {
    if (skill) {
      this.searchTags = this.searchTagBoxService.addTag(new SearchTag('Skill', skill.name, skill.keyNamePath));
      this.searchProjects();
    }
  }

  onCustomerChanged(customer: Customer) {
    if (customer) {
      this.searchTags = this.searchTagBoxService.addTag(new SearchTag('Customer', customer.name, customer.name));
      this.searchProjects();
    }
  }

  onIndustryChanged(industry: Industry) {
    if (industry) {
      this.searchTags = this.searchTagBoxService.addTag(new SearchTag('Industry', industry.name, industry.name));
      this.searchProjects();
    }
  }

  onSearchTagDeleted(keyNamePath: string) {
    this.searchTags = this.searchTagBoxService.deleteTag(keyNamePath);
    this.searchProjects();
  }

  searchProjects() {
    const filter = new ProjectFilterModel();

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
      if (st.type === 'Customer') {
        filter.CustomerNames.push(st.display);
      }
      if (st.type === 'Industry') {
        filter.IndustryNames.push(st.display);
      }
    });

    this.projectService.searchProjectsAsync(filter)
    .subscribe(projects => {
      this.projects = projects;
    });
  }
}
