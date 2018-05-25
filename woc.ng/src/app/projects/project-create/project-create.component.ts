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
import { KeyValueNode } from '../../shared/models/key-value-node';
import { OfferingService } from '../../offerings/offering.service';
import { KeyNameHierarchyHelperService, KeyNameItem } from '../../shared/services/key-name-hierarchy-helper.service';
import { Offering } from '../../offerings/offering.model';
import { RegionService } from '../../regions/region.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {
  project: Project;
  industries: Industry[];
  industriesLookup: KeyValue[];
  selectedIndustry: Industry;
  customersLookupData: Customer[];
  selectedCustomer: Customer;
  allSkills: Skill[];
  skillsLookup: KeyValue[];
  selectedSkills: KeyValue[];

  allOfferings: Offering[];
  offeringsLookup: KeyNameItem[];
  offeringNode: KeyValueNode;
  selectedOfferings: KeyNameItem[];

  allRegions: Offering[];
  regionsLookup: KeyNameItem[];
  selectedRegions: KeyNameItem[];

  submitting = false;

  constructor(
    private projectService: ProjectsService,
    private industryService: IndustryService,
    private customerService: CustomerService,
    private skillService: SkillsService,
    private offeringService: OfferingService,
    private regionService: RegionService,
    private keyNameHierarchyHelperService: KeyNameHierarchyHelperService
  ) {
    this.selectedSkills = [];
  }

  ngOnInit() {
    this.project = new Project();
    this.industryService.getAllAsync().subscribe(industries => {
      this.industries = industries;
      this.industriesLookup = this.getIndustriesAsKeyValue(industries);
    });

    this.skillService.getAllAsync().subscribe(skills => {
      this.allSkills = skills;
      this.skillsLookup = this.getSkillsAsKeyValue(skills);
    });

    this.customerService.getAllAsync().subscribe(customers => {
      this.customersLookupData = customers;
    });

    this.offeringService.getAllAsync().subscribe(offerings => {
      this.allOfferings = offerings;
      // this.offeringsLookup = this.keyNameHierarchyHelperService.getRootItems(this.allOfferings.map(o => {
      this.offeringsLookup = this.keyNameHierarchyHelperService.getChildsByKeyNamePathHelper(this.allOfferings.map(o => {
        return <KeyNameItem>{ keyNamePath : o.keyNamePath, name : o.name } ;
      }), '');
      const rootnode = new KeyValueNode();
      rootnode.childs = [];
      rootnode.value = 'root';
      this.offeringNode = this.buildOfferingsHierarchy(rootnode, this.keyNameHierarchyHelperService.getRootItems(this.offeringsLookup));

      console.log(JSON.stringify(this.offeringNode));
    });
    this.selectedOfferings = [];

    this.regionService.getAllAsync().subscribe(regions => {
      this.allRegions = regions;
      this.regionsLookup = this.allRegions.map(r => <KeyNameItem> {keyNamePath : r.keyNamePath, name : r.name} );
    });
    this.selectedRegions = [];

    this.submitting = false;
  }

  private getIndustriesAsKeyValue(industries: Industry[]) {
    return industries.map(i => new KeyValue(i.id, i.name) ) ;
  }
  private getSkillsAsKeyValue(skills: Skill[]) {
    return skills.map(i => new KeyValue(i.id, i.name) ) ;
  }

  private buildOfferingsHierarchy(parentNode: KeyValueNode, items: KeyNameItem[]) {
    items.forEach(item => {
      const childNode = new KeyValueNode();
      childNode.key = item.keyNamePath;
      childNode.value = item.name;
      childNode.childs = [];
      parentNode.childs.push(childNode);

      const childItems: KeyNameItem[] = this.keyNameHierarchyHelperService
        .getDirectChildsByKeyNamePathHelper(this.allOfferings, item.keyNamePath);

      this.buildOfferingsHierarchy(childNode, childItems);
    });

    return parentNode;
  }

  onSaveBtnClicked() {
    this.submitting = true;
    // umwandeln von selected Items to domain items
    this.project.customer = this.selectedCustomer;
    this.project.industry = this.selectedIndustry;
    this.project.skills = this.allSkills.filter(s => this.selectedSkills.find(ss => ss.key === s.id));
    this.project.regions = this.allRegions.filter(r => this.selectedRegions.find(rr => rr.keyNamePath === r.keyNamePath));
    this.project.offerings = this.allOfferings.filter(o => this.selectedOfferings.find(oo => oo.keyNamePath === o.keyNamePath));
    this.projectService.SaveProject(this.project).subscribe(
      () => {
        this.submitting = false;
      });
  }
}
