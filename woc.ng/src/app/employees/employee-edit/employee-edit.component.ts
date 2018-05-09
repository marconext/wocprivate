import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html'
})
export class EmployeeEditComponent implements OnInit {
  @Input() employee: Employee;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
  }

  onSave() {
    this.employeeService.Save(this.employee);
    alert('employee Saved \n ' + JSON.stringify(this.employee));
  }

}
