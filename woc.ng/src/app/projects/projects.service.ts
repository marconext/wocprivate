import { Injectable } from '@angular/core';
import { Project } from './project.model';

// import { LocationService } from '../locations/location.service';
import { ProjectFilter } from './project-filter';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Region } from '../regions/region.model';


@Injectable()
export class ProjectsService {

  configUrl = 'http://localhost:5000/api/';

  constructor(private httpClient: HttpClient) {
  }

  getAllAsync(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.configUrl + 'project');
  }


  getFilteredProjectsAsync(filter: ProjectFilter) {
    return this.httpClient.get<Project[]>(
      this.configUrl + 'project/GetProjectChildsByParentRegionKeyNamePath/' + filter.locationsKeyNamePath
    );
  }

  GetProjectChildRegionsByKeyNamePathsAsync(keyNamePath: string) {
    return this.httpClient.get<Region[]>(this.configUrl + 'project/GetProjectChildRegionsByKeyNamePaths/' + keyNamePath);
  }
}