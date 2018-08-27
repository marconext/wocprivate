import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../shared/services/base-service';
import { Observable } from '../../../node_modules/rxjs';
import { Role } from './role.model';

@Injectable()
export class RoleService extends BaseService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
   }

   getAllAsync(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.configUrl + 'Role');
  }
}
