import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html'
})
export class EmployeeCreateComponent implements OnInit {
  employee: Employee;

  constructor(private employeeService: EmployeeService) {
    this.employee = new Employee();
  }

  ngOnInit() {
  }

  onSave() {

  }

}
