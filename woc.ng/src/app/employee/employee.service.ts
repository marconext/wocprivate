import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/of';

import { Employee } from './employee.model';

@Injectable()
export class EmployeeService {

  // configUrl = 'assets/config.json';
  configUrl = 'http://localhost:15296/api/';

  constructor(private http: HttpClient) { }

  GetAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.configUrl + 'employee');
  }


  GetAllFake(): Observable<Employee[]> {
    return Observable.of(this.fakeData());
  }


  private fakeData(): Employee[] {
    const data: Employee[] = [];
    const emp1: Employee = {name : 'Emp1', email : 'emp1@company.com'};
    data.push(emp1);
    data.push(<Employee>{name: 'Emp2', email: 'emp2@company.com'});
    data.push(<Employee>{name: 'Emp3', email: 'emp3@company.com'});
    data.push(<Employee>{name: 'Emp4', email: 'emp4@company.com'});
    return data;
  }
}
