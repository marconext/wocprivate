import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Region } from './region.model';
import { environment } from '../../environments/environment';


@Injectable()
export class RegionService {

  configUrl = '';

  constructor(private httpClient: HttpClient) {
    this.configUrl = environment.apiUrl;
  }

  getAllAsync(): Observable<Region[]> {
    return this.httpClient.get<Region[]>(this.configUrl + 'region');
  }
}
