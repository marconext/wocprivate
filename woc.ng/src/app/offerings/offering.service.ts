import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offering } from './offering.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable()
export class OfferingService {

  configUrl = '';

  constructor(private httpClient: HttpClient) {
    this.configUrl = environment.apiUrl;
  }

  getAllAsync(): Observable<Offering[]> {
    return this.httpClient.get<Offering[]>(this.configUrl + 'offering');
  }
}
