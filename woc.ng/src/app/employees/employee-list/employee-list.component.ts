import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  @Input() employees: Employee[];
  @Input() selectedEmployees: Employee[];
  @Output() employeeEditRequested = new EventEmitter<Employee>();
  @Output() employeeSelectRequested = new EventEmitter<Employee>();
  @Output() employeeCreateRequested = new EventEmitter();
  @Output() employeesDeleteRequested = new EventEmitter<Employee[]>();

  monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  currentMonths = [];

  selectedEmployee: Employee;

  constructor() {
    this.currentMonths = this.currentMonthNames();
    this.selectedEmployees = [];
  }

  private currentMonthNames() {
    const currentDate = new Date();
    const ret = [];
    for (let i = 0; i <= 5; i++) {
      ret.push(this.monthNames[currentDate.getMonth()]);
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return ret;
  }

  ngOnInit() {
    console.log(this.employees);
 }

  onEdit(employee: Employee) {
    this.selectedEmployee = employee;
    this.employeeEditRequested.emit(employee);
  }
  onSelect(employee: Employee) {
    this.selectedEmployee = employee;
    this.employeeSelectRequested.emit(employee);
  }
  onNew() {
    this.employeeCreateRequested.emit();
  }

  onDelete() {
    this.employeesDeleteRequested.emit(this.selectedEmployees);
  }

  getManagerString(employee: Employee) {
    let ret = 'not available';
    if ( employee.manager ) {
        ret = employee.manager.name;
    }
    return ret;
  }

  getLocationString(employee: Employee) {
    let ret = 'not available';
    if ( employee.workPlace ) {
        ret = employee.workPlace.name + '(' + employee.workPlace.city + '/' + employee.workPlace.country + ')';
    }
    return ret;
  }
}
