import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Observable } from 'rxjs/Observable';
import { Employee } from './employee.model';
import { DetailModeEnum } from '../shared/models/detailModeEnum';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees$: Observable<Employee[]>;
  selectedEmployee: Employee;
  detailMode: DetailModeEnum;
  detailModeEnum = DetailModeEnum;

  constructor(private employeeService: EmployeeService) {
    this.detailMode = DetailModeEnum.none;
  }

  ngOnInit() {
    this.employees$ = this.employeeService.GetAll();
  }

  onEmployeeSelectRequested(employee: Employee) {
    this.selectedEmployee = employee;
    this.detailMode = DetailModeEnum.display;
  }

  onEmployeeEditRequested(employee: Employee) {
    this.selectedEmployee = employee;
    this.detailMode = DetailModeEnum.edit;
    // this.editModalOpened = true;
  }
}
