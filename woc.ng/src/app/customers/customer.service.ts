import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Customer } from './customer.model';

@Injectable()

export class CustomerService {

  configUrl = 'http://localhost:5000/api/';

  constructor(private httpClient: HttpClient) {
  }

  getAllAsync(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.configUrl + 'customer');
  }
}
