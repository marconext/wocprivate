import { Component, OnInit, Input } from '@angular/core';
import { DetailModeEnum } from '../../shared/models/detailModeEnum';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html'
})
export class EmployeeDetailComponent implements OnInit {
  @Input() employee: Employee;

  monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  currentMonths = [];

  constructor() {
    this.currentMonths = this.currentMonthNames();
  }

  ngOnInit() {
    const x = this.employee;
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

  getLocationString() {
    let ret = 'not available';
    if ( this.employee.workPlace ) {
        ret = this.employee.workPlace.name + '(' + this.employee.workPlace.city + '/' + this.employee.workPlace.country + ')';
    }
    return ret;
  }
}
