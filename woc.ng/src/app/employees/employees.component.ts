import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Observable } from 'rxjs/Observable';
import { Employee } from './employee.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees$: Observable<Employee[]>;
  selectedEmployee: Employee;


  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.employees$ = this.employeeService.GetAll();
  }

  onEmployeeEditRequested(employee: Employee) {
    this.selectedEmployee = employee;
    alert('recived EditRequest');
    // this.editModalOpened = true;
  }
}
