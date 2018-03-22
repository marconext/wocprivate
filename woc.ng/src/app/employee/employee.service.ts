import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Employee } from './employee.model';

import 'rxjs/add/observable/of';

@Injectable()
export class EmployeeService {

  constructor() { }

  GetAll(): Observable<Employee[]> {
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
