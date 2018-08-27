import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../shared/services/base-service';
import { Observable } from '../../../node_modules/rxjs';
import { ContributionGroup } from './contribution-group.model';


@Injectable()
export class ContributionGroupService extends BaseService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
   }

   getAllAsync(): Observable<ContributionGroup[]> {
    return this.httpClient.get<ContributionGroup[]>(this.configUrl + 'ContributionGroup');
  }
}

