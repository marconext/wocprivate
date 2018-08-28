import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { Skill } from '../../skills/Skill.model';
import { SkillsService } from '../../skills/skills.service';
import { EmployeeRole } from '../employee-role.model';
import { ContributionGroup } from '../../ContributionGroup/contribution-group.model';
import { ManagerService } from '../../manager/manager.service';
import { Manager } from '../../manager/manager.model';
import { WorkPlace } from '../../work-place/work-place.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html'
})
export class EmployeeEditComponent implements OnInit {
  @Input() employee: Employee;
  @Output() CloseRequest = new EventEmitter<void>();

  allSkills: Skill[];
  skillsLookup: Skill[];

  allManagers: Manager[];
  managersLookup: Manager[];

  selectedRole: EmployeeRole;

  displayRoleDialog = false;
  displayWorkPlaceDialog = false;

  formErrors: Map<string, string>;

  constructor(
    private employeeService: EmployeeService,
    private skillService: SkillsService,
    private managerService: ManagerService,
    public toastr: ToastrService
  ) {
    this.allSkills = [];
    this.skillsLookup = [];
    this.allManagers = [];
    this.managersLookup = [];

    this.formErrors = new Map<string, string>();

  }

  ngOnInit() {
    this.skillService.getAllAsync().subscribe(skills => {
      this.allSkills = skills;
      this.skillsLookup = skills;
    });

    this.managerService.findManagersAsync('').subscribe(managers => {
      this.allManagers = managers;
      this.managersLookup = managers;
    });
    const x = this.employee;
  }

  onSave() {
    this.employee.skills.forEach(s => s.maturity = 98); // TODO: remove
    this.formErrors.clear();
    this.employeeService.Save(this.employee).subscribe(
      () => {
        // alert('employee Saved \n ' + JSON.stringify(this.employee));
        this.toastr.success('Saved');
        this.close();
      },
      (err) => {
        this.formErrors.clear();
        err.error.errors.forEach(element => {
          // this.formErrors[element.name] = element.message;
          this.formErrors.set(element.name, element.message);
        });
        if (this.formErrors.size === 0) {
            this.toastr.error('an error occured saving data');
        }
        console.log(JSON.stringify(this.formErrors));
        this.close();
      }
  );
  }

  onSkillInnerSearch(event: any) {
    this.skillsLookup = this.allSkills.filter(s => s.name.toUpperCase().indexOf(event.query.toUpperCase()) > -1);
  }

  onManagerInnerSearch(event: any) {
    this.managersLookup = this.allManagers.filter(s => s.name.toUpperCase().indexOf(event.query.toUpperCase()) > -1);
  }

  onEditrole(role: EmployeeRole) {
    this.selectedRole = role;
  }
  showRoleDialog(role: EmployeeRole) {
    this.selectedRole = role;
    this.displayRoleDialog = true;
  }

  deleteRole(role: EmployeeRole) {
    this.employee.roles = this.employee.roles.filter(r => r.name !== role.name);
  }

  close() {
    this.displayRoleDialog = false;
    this.selectedRole = null;
    this.CloseRequest.emit();
  }
  addEmployeeRole() {
    // const er = new EmployeeRole();
    // er.name = 'none';
    // er.roleId = '0';
    // const cg = new ContributionGroup('0', 'Master');
    // er.contributionGroup = cg;
    // this.employee.roles.push(er);
    const er = new EmployeeRole();
    er.name = 'none';
    er.contributionGroup = new ContributionGroup('0', 'none');
    this.employee.roles.push(er);
    this.showRoleDialog(er);
  }

  showWorkPlaceString(wp: WorkPlace) {
    let ret = 'unknown';
    if (wp) {
      ret = wp.name + ' (' + wp.city + '/' + wp.country + ')';
    }
    // console.log('wp: ' + ret);
    return ret;
  }
}
