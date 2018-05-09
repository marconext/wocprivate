import { Component, OnInit, Input } from '@angular/core';
import { EmployeeSkill } from '../../employee-skill.model';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-employee-skills-list',
  templateUrl: './employee-skills-list.component.html'
})
export class EmployeeSkillsListComponent implements OnInit {
  @Input() skills: EmployeeSkill[];

  constructor(private employeeService: EmployeeService) {

  }

  ngOnInit() {
    const x = this.skills;
  }
}
