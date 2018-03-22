import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees$: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService) {


  }

  ngOnInit() {
    this.employees$ = this.employeeService.GetAll();
  }

}
