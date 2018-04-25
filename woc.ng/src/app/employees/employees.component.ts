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
    this.selectedEmployee = new Employee();
    this.selectedEmployee.name = 'unknown yet';
    this.selectedEmployee.email = 'unknown@yet';
  }

  ngOnInit() {
    this.employees$ = this.employeeService.GetAll();
  }

  onEmployeeSelectRequested(employee: Employee) {
    this.employeeService.GetById(employee.id).subscribe(e =>
      this.selectedEmployee = e
    );
    this.detailMode = DetailModeEnum.display;
  }

  onEmployeeEditRequested(employee: Employee) {
    this.employeeService.GetById(employee.id).subscribe(e =>
      this.selectedEmployee = e
    );
    this.detailMode = DetailModeEnum.edit;
  }
  onEmployeeCreateRequested() {
    this.detailMode = DetailModeEnum.create;
  }
}
