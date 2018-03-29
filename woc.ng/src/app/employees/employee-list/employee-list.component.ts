import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  @Input() employees$: Observable<Employee[]>;
  @Output() employeeEditRequested = new EventEmitter<Employee>();

  constructor() {
  }

  ngOnInit() {
  }

  onEdit(employee: Employee) {
    alert('edit called');
    this.employeeEditRequested.emit(employee);
  }

}
