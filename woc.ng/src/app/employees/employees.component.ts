import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';
import { DetailModeEnum } from '../shared/models/detailModeEnum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];
  selectedEmployee: Employee;
  selectedEmployees: Employee[];

  detailMode: DetailModeEnum;
  detailModeEnum = DetailModeEnum;

  displayDeleteConfirmation = false;

  errors: string[];

  constructor(private employeeService: EmployeeService, public toastr: ToastrService) {
    this.detailMode = DetailModeEnum.none;
    this.selectedEmployee = new Employee();
    this.selectedEmployee.name = 'unknown yet';
    this.selectedEmployee.email = 'unknown@yet';
    this.selectedEmployees = [];
    this.errors = [];
  }

  ngOnInit() {
    this.search();
  }

  private search() {
    this.employeeService.GetAll().subscribe(r => {
      this.employees = r;
      console.log(r);
    });
  }

  onEmployeeSelectRequested(employee: Employee) {
    this.employeeService.GetById(employee.id).subscribe(e => {
      this.selectedEmployee = e;
      this.detailMode = DetailModeEnum.display;
    });
  }

  onEmployeeEditRequested(employee: Employee) {
    this.employeeService.GetById(employee.id).subscribe(e => {
      this.selectedEmployee = e;
      this.detailMode = DetailModeEnum.edit;
    });
  }
  onEmployeeCreateRequested() {
    this.selectedEmployee = new Employee();
    this.detailMode = DetailModeEnum.edit;
    // this.detailMode = DetailModeEnum.create;
  }

  onEmployeeDeleteRequested(employees: Employee[]) {
    this.selectedEmployees = employees;
    this.displayDeleteConfirmation = true;
  }
  onConfirmDelete() {
    this.employeeService.DeleteEmployees(this.selectedEmployees).subscribe(
      () => {
        this.toastr.success('deleted');
        this.search();
      },
      (err) => {
        this.toastr.error('Error deleting Employee.' + err.error.errorMessage);
        console.log(JSON.stringify(err));
      }
    );
    this.selectedEmployees = [];
    this.displayDeleteConfirmation = false;
  }
  onCancelDelete() {
    this.displayDeleteConfirmation = false;
  }

  onEmployeeSaved(employee: Employee) {
    this.detailMode = DetailModeEnum.none;
    const emp = this.employees.find(e => e.id === employee.id);
    const i = this.employees.indexOf(emp);
    this.employees[i] = employee;
  }
}
