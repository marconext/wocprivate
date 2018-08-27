import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manager } from './manager.model';

@Injectable()
export class ManagerService extends BaseService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
   }

   findManagersAsync(searchText: string): Observable<Manager[]> {
    return this.httpClient.get<Manager[]>(this.configUrl + 'Manager/'  + 'FindManagersAsync' + '?SearchText=' + searchText);
  }
}
