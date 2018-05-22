import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Industry } from './industry.model';

@Injectable()

export class IndustryService {

  configUrl = 'http://localhost:5000/api/';

  constructor(private httpClient: HttpClient) {
  }

  getAllAsync(): Observable<Industry[]> {
    return this.httpClient.get<Industry[]>(this.configUrl + 'industry');
  }
}
