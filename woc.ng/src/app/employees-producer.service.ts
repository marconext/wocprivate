import { Injectable } from '@angular/core';
import { SkillsService } from './skills/skills.service';

import { Skill } from './skills/Skill.model';
import { RoleService } from './role/role.service';
import { Role } from './role/role.model';
import { Manager } from './manager/manager.model';
import { ManagerService } from './manager/manager.service';
import { WorkPlace } from './work-place/work-place.model';
import { WorkPlaceService } from './work-place/work-place.service';
import { EmployeeRole } from './employees/employee-role.model';
import { ContributionGroup } from './ContributionGroup/contribution-group.model';
import { ContributionGroupService } from './ContributionGroup/contribution-group.service';
import { Employee } from './employees/employee.model';
import { EmployeeService } from './employees/employee.service';

@Injectable()
export class EmployeesProducerService {

  private roles: Role[] = [];
  private contributionGroups: ContributionGroup[] = [];

  private skills: Skill[] = [];
  private managers: Manager[] = [];
  private workPlaces: WorkPlace[] = [];

  private employeeRole: EmployeeRole[] = [];

  constructor(
    private employeeService: EmployeeService,
    private roleService: RoleService,
    private skillsService: SkillsService,
    private managerService: ManagerService,
    private workPlaceService: WorkPlaceService,
    private contributionGroupService: ContributionGroupService,

  ) {
    this.roleService.getAllAsync().subscribe(rr => this.roles = rr);
    this.contributionGroupService.getAllAsync().subscribe(cgs => this.contributionGroups = cgs);

    this.skillsService.getAllAsync().subscribe(ss => this.skills = ss);
    this.managerService.findManagersAsync('').subscribe(mm => this.managers = mm);
    this.workPlaceService.getAllAsync().subscribe(wps => this.workPlaces = wps);
  }

  createRandomEmployees(numberOfEmployees: number) {

    for ( let i = 0; i < numberOfEmployees; i++) {
      const emp = new Employee();
      emp.name = 'Empl ' + i.toString();
      emp.email = emp.name + '@.somewheredxc.com';
      emp.manager = this.randomElement(this.managers);
      emp.workPlace = this.randomElement(this.workPlaces);

      const rndRoleNumber = this.randomNumber(3);
      for ( let ri = 0; ri < rndRoleNumber; ri++) {
        const role = <Role>this.randomElement(this.roles);
        const empRole = new EmployeeRole();
        empRole.roleId = role.id;
        empRole.name = role.name;
        const contGroup = <ContributionGroup>this.randomElement(this.contributionGroups);
        empRole.contributionGroup = contGroup;
        if (
          !emp.roles.find(r => r.roleId === role.id)
        ) {
          emp.roles.push(empRole);
        }
      }

      const rndSkll = this.randomNumber(3);
      for ( let is = 0; is < rndSkll; is++) {
        const skll = this.randomElement(this.skills);
        if (!emp.skills.find(s => s.id === skll.id)) {
          emp.skills.push(skll);
        }
      }

      this.employeeService.Save(emp).subscribe(() => {
        console.log('saved employee');
      });
    }
  }

  private randomElement(elements: any[]) {
    const nr = this.randomNumber(elements.length);
    return elements[nr];
  }

  private randomNumber(maxnumber: number) {
    return Math.floor((Math.random() * maxnumber));
  }

  private randomText() {
    // tslint:disable-next-line:max-line-length
    const longText = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fortasse id optimum, sed ubi illud: Plus semper voluptatis? Quae similitudo in genere etiam humano apparet. In eo enim positum est id, quod dicimus esse expetendum. Duo Reges: constructio interrete. <i>Honesta oratio, Socratica, Platonis etiam.</i> At quicum ioca seria, ut dicitur, quicum arcana, quicum occulta omnia? Quasi vero, inquit, perpetua oratio rhetorum solum, non etiam philosophorum sit. Est tamen ea secundum naturam multoque nos ad se expetendam magis hortatur quam superiora omnia. <b>Ostendit pedes et pectus.</b> </p>  <p>Ita enim vivunt quidam, ut eorum vita refellatur oratio. Utrum igitur tibi litteram videor an totas paginas commovere? An hoc usque quaque, aliter in vita? Cum salvum esse flentes sui respondissent, rogavit essentne fusi hostes. Cum id fugiunt, re eadem defendunt, quae Peripatetici, verba. Si longus, levis. </p>       <p>Aliter homines, aliter philosophos loqui putas oportere? <b>Quorum altera prosunt, nocent altera.</b> Videsne quam sit magna dissensio? Quo modo autem optimum, si bonum praeterea nullum est? <b>Estne, quaeso, inquam, sitienti in bibendo voluptas?</b> Quis tibi ergo istud dabit praeter Pyrrhonem, Aristonem eorumve similes, quos tu non probas? Hic Speusippus, hic Xenocrates, hic eius auditor Polemo, cuius illa ipsa sessio fuit, quam videmus. Hunc ipsum Zenonis aiunt esse finem declarantem illud, quod a te dictum est, convenienter naturae vivere. </p>';
    const textLengthg = this.randomNumber(longText.length);
    const startPos = this.randomNumber(longText.length - textLengthg);
    const ret = longText.substr(startPos, textLengthg);
    return ret;
  }
}
