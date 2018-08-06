import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/of';

import { Employee } from './employee.model';
import { AuthHttpService } from '../shared/services/authHttp.service';

@Injectable()
export class EmployeeService {
  // configUrl = 'assets/config.json';
  // configUrl = 'http://localhost:15269/api/';
  configUrl = 'http://localhost:5000/api/';

  // constructor(private httpClient: HttpClient) { }
  constructor(private httpClient: HttpClient, private httpClientAuth: AuthHttpService) { }

  GetAll(): Observable<Employee[]> {
    // return this.httpClient.get<Employee[]>(this.configUrl + 'employee');
    // return Observable.from<Employee[]>(this.httpClientAuth.get(this.configUrl + 'employee'));
    return this.httpClientAuth.get<Employee[]>(this.configUrl + 'employee');
  }

  GetById(id: AAGUID): Observable<Employee> {
    return this.httpClient.get<Employee>(this.configUrl + 'employee/' + id.toString());
  }

  Save(employee: Employee) {
    this.httpClient.post<Employee[]>(this.configUrl + 'employee', employee)
      .subscribe((emp) => {
      // this.employeesChanged.next();
      // this.alertService.success('Successful saved!', true);
      console.log('save employee: ', emp);
    });
  }

  GetAllFake(): Observable<Employee[]> {
    return of(this.fakeData());
  }


  private fakeData(): Employee[] {
    const data: Employee[] = [];
    const emp1: Employee = {
      id: 'e0b38a80-df97-4f7b-a564-0e0e428fec9e',
      name : 'Emp1',
      email : 'emp1@company.com',
      skills: [],
      availability: []
    };
    data.push(emp1);
    data.push(<Employee>{name: 'Emp2', email: 'emp2@company.com'});
    data.push(<Employee>{name: 'Emp3', email: 'emp3@company.com'});
    data.push(<Employee>{name: 'Emp4', email: 'emp4@company.com'});
    return data;
  }
}
