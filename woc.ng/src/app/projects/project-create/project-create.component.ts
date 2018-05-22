import { Component, OnInit } from '@angular/core';
import { Project } from '../project.model';
import { Industry } from '../../industries/industry.model';
import { IndustryService } from '../../industries/industry.service';
import { KeyValue } from '../../shared/models/key-value';
import { Customer } from '../../customers/customer.model';
import { CustomerService } from '../../customers/customer.service';
import { Skill } from '../../skills/Skill.model';
import { SkillsService } from '../../skills/skills.service';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {
  project: Project;
  industries: Industry[];
  industriesLookup: KeyValue[];
  customersLookupData: Customer[];
  selectedCustomer: Customer;
  allSkills: Skill[];
  skillsLookup: KeyValue[];
  selectedSkills: KeyValue[];

  constructor(
    private projectService: ProjectsService,
    private industryService: IndustryService,
    private customerService: CustomerService,
    private skillService: SkillsService
  ) {
    this.selectedSkills = [];
  }

  ngOnInit() {
    this.project = new Project();
    this.industryService.getAllAsync().subscribe(industries => {
      this.industries = [];
      this.industriesLookup = this.getIndustriesAsKeyValue(industries);
    });

    this.skillService.getAllAsync().subscribe(skills => {
      this.allSkills = skills;
      this.skillsLookup = this.getSkillsAsKeyValue(skills);
    });

    this.customerService.getAllAsync().subscribe(customers => {
      this.customersLookupData = customers;
    });
  }

  private getIndustriesAsKeyValue(industries: Industry[]) {
    return industries.map(i => new KeyValue(i.id, i.name) ) ;
  }
  private getSkillsAsKeyValue(skills: Skill[]) {
    return skills.map(i => new KeyValue(i.id, i.name) ) ;
  }

  onSaveBtnClicked() {
    // umwandeln von selected Items to domain items
    this.project.customer = this.selectedCustomer;
    this.project.skills = this.allSkills.filter(s => this.selectedSkills.find(ss => ss.key === s.id));
    this.projectService.SaveProject(this.project).subscribe();
  }
}
