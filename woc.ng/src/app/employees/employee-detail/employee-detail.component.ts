import { Component, OnInit, Input } from '@angular/core';
import { DetailModeEnum } from '../../shared/models/detailModeEnum';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html'
})
export class EmployeeDetailComponent implements OnInit {
  @Input() employee: Employee;
  constructor() { }

  ngOnInit() {
  }

}
