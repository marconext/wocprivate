import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer.model';
import { environment } from '../../environments/environment';

@Injectable()

export class CustomerService {

  configUrl = '';

  constructor(private httpClient: HttpClient) {
    this.configUrl = environment.apiUrl;
  }

  getAllAsync(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.configUrl + 'customer');
  }
}
