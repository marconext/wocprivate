import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Industry } from './industry.model';
import { environment } from '../../environments/environment';

@Injectable()

export class IndustryService {

  configUrl = '';

  constructor(private httpClient: HttpClient) {
    this.configUrl = environment.apiUrl;
  }

  getAllAsync(): Observable<Industry[]> {
    return this.httpClient.get<Industry[]>(this.configUrl + 'industry');
  }
}
