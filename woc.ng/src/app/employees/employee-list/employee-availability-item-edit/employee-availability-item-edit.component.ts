import { Component, OnInit, Output, Input } from '@angular/core';
import { EmployeeAvailabilityItem } from './employee-availability-item.model';
import { EmployeeService } from '../../employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-availability-item-edit',
  templateUrl: './employee-availability-item-edit.component.html',
  styles: []
})
export class EmployeeAvailabilityItemEditComponent implements OnInit {

  @Input() employeeId: AAGUID;
  @Input() year: number;
  @Input() month: number;
  @Input() precentage: number;

  constructor(private employeeService: EmployeeService, public toastr: ToastrService) { }


  ngOnInit() {
  }

  saveAvailability(employeeid, year, month, precentage) {
    const ai = new EmployeeAvailabilityItem();
    ai.employeeId = employeeid;
    ai.year = year;
    ai.month = month;
    ai.precentage = precentage;
    this.employeeService.SaveAvailability(ai).subscribe(() => {
      this.toastr.success('Saved availability');
    });
  }
}
