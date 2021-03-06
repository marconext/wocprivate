import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Project } from './project.model';

// import { LocationService } from '../locations/location.service';
import { ProjectFilterModel } from './project-filter.model';

import { Observable, pipe } from 'rxjs';
import { Region } from '../regions/region.model';
import { Skill } from '../skills/Skill.model';
import { Customer } from '../customers/customer.model';
import { Industry } from '../industries/industry.model';


@Injectable()
export class ProjectsService {

  configUrl = '';

  constructor(private httpClient: HttpClient) {
    this.configUrl = environment.apiUrl;
  }

  getAllAsync(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.configUrl + 'project');
  }

  getProjectByIdAsync(projectId: AAGUID): Observable<Project> {
    return this.httpClient.get<Project>(this.configUrl + 'project/' + projectId.toString());
  }

  getProjectIdByNameAsync(projectName: string): Observable<AAGUID> {
    return this.httpClient.get<AAGUID>(this.configUrl + 'project/' + 'GetIdByName/' + projectName);
  }

  searchProjectsAsync(filter: ProjectFilterModel) {
    return this.httpClient.post<Project[]>(this.configUrl + 'project/searches/', filter);
  }


  getFilteredProjectsAsync(filter: ProjectFilterModel) {
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

  SaveProject(project: Project) {
    return this.httpClient.post(this.configUrl + 'project/SaveProject/', project);
  }

  DeleteProjects(projects: Project[]) {
    // const params = new HttpParams();
    // projects.forEach(p =>
    //   params.append('ProjectIds', p.id)
    // );

    const ids = projects.map(p => p.id);

    return this.httpClient.post(this.configUrl + 'project/DeleteProjects/', ids);
  }

  CreatePdfForIdsAsync(ids: AAGUID[]) {
    // const options = new RequestOptions({responseType:  ResponseContentType.Blob });

        // Process the file downloaded
    return this.httpClient.post(this.configUrl + 'project/CreatePdfForIds/', ids, {responseType: 'arraybuffer'} );
  }
}
