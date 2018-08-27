import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { RoleService } from '../../../role/role.service';
import { ContributionGroupService } from '../../../ContributionGroup/contribution-group.service';
import { Role } from '../../../role/role.model';
import { ContributionGroup } from '../../../ContributionGroup/contribution-group.model';
import { EmployeeRole } from '../../employee-role.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-employee-roles-edit',
  templateUrl: './employee-roles-edit.component.html'
})
export class EmployeeRolesEditComponent implements OnInit {
  @Input() employeeRole: EmployeeRole;
  @Output() employeeRoleChange: EventEmitter<EmployeeRole>;

  rolesLookup: Role[];
  allRoles: Role[];

  selectedRole: Role;

  contributionGroupsLookup: ContributionGroup[];
  allContributionGroups: ContributionGroup[];
  selectedContibutionGroup: ContributionGroup;

  dataLoaded: boolean;

  constructor(
    private roleService: RoleService,
    private contributionGroupService: ContributionGroupService
  ) {
    this.dataLoaded = false;
  }

  async ngOnInit() {
    this.allRoles = await this.roleService.getAllAsync().toPromise();
    this.rolesLookup = this.allRoles;

    this.allContributionGroups = await this.contributionGroupService.getAllAsync().toPromise();
    this.contributionGroupsLookup = this.allContributionGroups;


    if (!this.employeeRole.roleId) {
      const newRole = this.allRoles[0];
      this.employeeRole.roleId = newRole.id;
      this.employeeRole.name = newRole.name;
      this.employeeRole.contributionGroup  = this.allContributionGroups[0];
    }
    this.selectedRole  = this.allRoles.find(r => r.name === this.employeeRole.name);
    this.selectedContibutionGroup = this.allContributionGroups.find(cg => cg.name === this.employeeRole.contributionGroup.name);
    this.dataLoaded = true;
  }

  roleOrContributionGroupChanged() {
    this.employeeRole.roleId = this.selectedRole.id;
    this.employeeRole.name = this.selectedRole.name;
    this.employeeRole.contributionGroup.id = this.selectedContibutionGroup.id;
    this.employeeRole.contributionGroup.name = this.selectedContibutionGroup.name;
  }
}
