import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observer } from 'rxjs';
import { Observable } from 'rxjs';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  @Input() employees$: Observable<Employee[]>;
  @Output() employeeEditRequested = new EventEmitter<Employee>();
  @Output() employeeSelectRequested = new EventEmitter<Employee>();
  @Output() employeeCreateRequested = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.employees$.subscribe(e => console.log(e));
 }

  onEdit(employee: Employee) {
    this.employeeEditRequested.emit(employee);
  }
  onSelect(employee: Employee) {
    this.employeeSelectRequested.emit(employee);
  }
  onNew() {
    this.employeeCreateRequested.emit();
  }
}
