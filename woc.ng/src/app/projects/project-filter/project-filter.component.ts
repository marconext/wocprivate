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
import { Industry } from '../../industries/industry.model';
import { FavoritesService } from '../../favorites/favorites.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../employees/employee.model';

@Component({
  selector: 'app-project-filter',
  templateUrl: './project-filter.component.html'
})
export class ProjectFilterComponent implements OnInit {
  projects: Project[];
  selectedProjects: Project[];
  selectedProjectsForDeletion: Project[];
  selectedProject: Project;

  customers: Customer[];
  industries: Industry[];
  parentKeyNamePath: string;
  projectRegions: Region[];
  projectOfferings: Offering[];

  skills: Skill[];

  searchTags: SearchTag[];

  plainTextSearchTerm: string;

  favoritesCount: number;

  showDeleteDialog: boolean;

  constructor(
    private router: Router,
    private projectService: ProjectsService,
    private searchTagBoxService: SearchTagBoxService,
    public favoritesService: FavoritesService,
    public toastr: ToastrService
  ) {

    this.projectService.searchProjectsAsync(new ProjectFilterModel()).subscribe((projects) => {
      this.projects = projects;
    },
    error => {
      console.log('ABC:' + error);
      this.toastr.error('Something bad happend', 'error');
    }
  );

    this.projectService.GetProjectCustomers().subscribe(customers => {
      this.customers = customers;
    });

    this.projectService.GetProjectIndustries().subscribe(industries => {
      this.industries = industries;
    });

    this.projectService.GetProjectChildOfferingsByKeyNamePathsAsync(';').subscribe(offerings => {
      this.projectOfferings = offerings;
    });

    this.projectService.GetProjectChildRegionsByKeyNamePathsAsync(';').subscribe(regions => {
      this.projectRegions = regions;
    });

    this.projectService.GetProjectSkills().subscribe(skills => {
      this.skills = skills;
    });

    this.searchTags = [];

    this.favoritesCount = 0;
    this.showDeleteDialog = false;
    this.selectedProjectsForDeletion = [];
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
    this.favoritesCount = this.favoritesService.count;
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

  onSearchTermChanged(term: string) {
    this.plainTextSearchTerm = term;
    this.searchProjects();
  }

  onSearchTagDeleted(keyNamePath: string) {
    this.searchTags = this.searchTagBoxService.deleteTag(keyNamePath);
    this.searchProjects();
  }


  onProjectAddRequest() {
    this.router.navigate(['projects/editor']);
  }

  onProjectEditRequest(id: AAGUID) {
    this.router.navigate(['projects/editor/', id]);
  }

  onProjectsDeleteRequest(projects: Project[]) {
    this.projectService.DeleteProjects(projects).subscribe(() => {
      this.searchProjects();

      // unselect project for details, when this project was deleted
      if (this.selectedProject && this.selectedProjectsForDeletion.find(p => p.id === this.selectedProject.id)) {
        this.selectedProject = null;
      }

      this.selectedProjectsForDeletion = [];
      this.showDeleteDialog = false;
      this.toastr.success('Deleted Projects');
    });
  }

  onAskForDeletion(projects: Project[]) {
    this.selectedProjectsForDeletion = projects;
    this.showDeleteDialog = true;
  }

  searchProjects() {
    const filter = new ProjectFilterModel();

    filter.PlainSearchTerm = this.plainTextSearchTerm;
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
    },
    error => {
      console.log('ABC:' + error);
      this.toastr.error('Something bad happend', 'error');
    });
  }
}
