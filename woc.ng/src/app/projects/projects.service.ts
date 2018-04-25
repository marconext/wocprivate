import { Injectable } from '@angular/core';
import { Project } from './project.model';

// import { LocationService } from '../locations/location.service';
import { ProjectFilter } from './project-filter';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Region } from '../regions/region.model';
import { Skill } from '../skills/Skill.model';
import { Customer } from '../customers/customer.model';
import { Industry } from '../insustries/industry.model';


@Injectable()
export class ProjectsService {

  configUrl = 'http://localhost:5000/api/';

  constructor(private httpClient: HttpClient) {
  }

  getAllAsync(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.configUrl + 'project');
  }

  getProjectByIdAsync(projectId: AAGUID): Observable<Project> {
    return this.httpClient.get<Project>(this.configUrl + 'project' + '/' + projectId.toString());
  }

  searchProjectsAsync(filter: ProjectFilter) {
    return this.httpClient.post<Project[]>(this.configUrl + 'project/searches/', filter);
  }


  getFilteredProjectsAsync(filter: ProjectFilter) {
    return this.httpClient.get<Project[]>(
      this.configUrl + 'project/GetProjectChildsByParentRegionKeyNamePath/' + filter.RegionKeyNames[0]
    );
  }

  GetProjectChildRegionsByKeyNamePathsAsync(keyNamePath: string) {
    return this.httpClient.get<Region[]>(this.configUrl + 'project/GetProjectChildRegionsByKeyNamePaths/' + keyNamePath);
  }

  GetProjectChildOfferingsByKeyNamePathsAsync(keyNamePath: string) {
    return this.httpClient.get<Region[]>(this.configUrl + 'project/GetProjectChildOfferingsByKeyNamePaths/' + keyNamePath);
  }

  GetProjectSkills() {
    return this.httpClient.get<Skill[]>(this.configUrl + 'project/GetProjectSkills/');
  }

  GetProjectCustomers() {
    return this.httpClient.get<Customer[]>(this.configUrl + 'project/GetProjectCustomers/');
  }

  GetProjectIndustries() {
    return this.httpClient.get<Industry[]>(this.configUrl + 'project/GetProjectIndustries/');
  }
}
