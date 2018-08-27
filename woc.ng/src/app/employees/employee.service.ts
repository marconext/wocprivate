import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/of';

import { Employee } from './employee.model';
import { AuthHttpService } from '../shared/services/authHttp.service';
import { environment } from '../../environments/environment';
import { EmployeeAvailabilityItem } from './employee-list/employee-availability-item-edit/employee-availability-item.model';

@Injectable()
export class EmployeeService {
  configUrl = '';

  constructor(private httpClient: HttpClient, private httpClientAuth: AuthHttpService) {
    this.configUrl = environment.apiUrl;
  }

  GetAll(): Observable<Employee[]> {
    // return this.httpClient.get<Employee[]>(this.configUrl + 'employee');
    // return Observable.from<Employee[]>(this.httpClientAuth.get(this.configUrl + 'employee'));
    return this.httpClientAuth.get<Employee[]>(this.configUrl + 'employee');
  }

  GetById(id: AAGUID): Observable<Employee> {
    return this.httpClient.get<Employee>(this.configUrl + 'employee/' + id.toString());
  }

  Save(employee: Employee) {
    return this.httpClient.post(this.configUrl + 'employee/save/', employee);
  }

  SaveAvailability(employeeAvailability: EmployeeAvailabilityItem) {
    return this.httpClient.post<Employee[]>(this.configUrl + 'employee/' + 'SaveEmplyoeeAvailability/', employeeAvailability);
  }


  DeleteEmployees(employees: Employee[]) {
    const ids = employees.map(e => e.id);
    return this.httpClient.post(this.configUrl + 'employee/DeleteEmployees/', ids);
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
      availability: [],
      roles: [],
      manager: {id: '712C4019-3692-4F01-A00B-045300F52AB4', name: 'Emp2'},
      workPlace: {id: '75ea568f-a779-42c7-b5c5-b876e29ef8ad', country : 'CH', city: 'Zürich', name: 'Dübi'}
    };
    data.push(emp1);
    data.push(<Employee>{name: 'Emp2', email: 'emp2@company.com'});
    data.push(<Employee>{name: 'Emp3', email: 'emp3@company.com'});
    data.push(<Employee>{name: 'Emp4', email: 'emp4@company.com'});
    return data;
  }
}
