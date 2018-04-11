import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Region } from './region.model';


@Injectable()
export class RegionService {

  configUrl = 'http://localhost:5000/api/';

  constructor(private httpClient: HttpClient) {
  }

  getAllAsync(): Observable<Region[]> {
    return this.httpClient.get<Region[]>(this.configUrl + 'region');
  }
}
