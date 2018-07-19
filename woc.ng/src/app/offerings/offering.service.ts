import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offering } from './offering.model';
import { Observable } from 'rxjs';
@Injectable()
export class OfferingService {

  configUrl = 'http://localhost:5000/api/';

  constructor(private httpClient: HttpClient) {
  }

  getAllAsync(): Observable<Offering[]> {
    return this.httpClient.get<Offering[]>(this.configUrl + 'offering');
  }
}
