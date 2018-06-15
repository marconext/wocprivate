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
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss']
})
export class ProjectEditorComponent implements OnInit {
  projectId: AAGUID;
  project: Project;
  industries: Industry[];
  // industriesLookup: KeyValue[];
  selectedIndustry: Industry;

  customersLookupData: Customer[];

  selectedCustomer: Customer;
  allSkills: Skill[];
  skillsLookup: KeyValue[];
  selectedSkills: KeyValue[];

  allOfferings: Offering[];
  allOfferingsLookup: KeyNameItem[];
  filteredOfferingsLookup: KeyNameItem[];
  offeringNode: KeyValueNode;
  selectedOfferings: KeyNameItem[];
  primeNGTreeOfferingNodes: any[];

  allRegions: Offering[];
  allRegionsLookup: KeyNameItem[];
  filteredRegionsLookup: KeyNameItem[];
  selectedRegions: KeyNameItem[];
  regionNode: KeyValueNode;
  primeNGTreeRegionNodes: any[];


  // dxcServices: string;
  // dxcFacts: string;
  // dxcSolution: string;
  // dxcBetriebsleistung: string;

  submitting = false;

  // formErrors: {[key: string]: string};
  formErrors: Map<string, string>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private industryService: IndustryService,
    private customerService: CustomerService,
    private skillService: SkillsService,
    private offeringService: OfferingService,
    private regionService: RegionService,
    private keyNameHierarchyHelperService: KeyNameHierarchyHelperService,
    public toastr: ToastsManager
  ) {
    this.selectedSkills = [];
    this.formErrors = new Map<string, string>();
  }

  async ngOnInit() {
    this.project = new Project();

    this.selectedOfferings = [];
    this.selectedRegions = [];
    this.submitting = false;

    this.industryService.getAllAsync().subscribe(industries => {
      this.industries = industries;
      // this.industriesLookup = this.getIndustriesAsKeyValue(industries);
    });

    this.skillService.getAllAsync().subscribe(skills => {
      this.allSkills = skills;
      this.skillsLookup = this.getSkillsAsKeyValue(skills);
      this.selectedSkills.push(this.skillsLookup[0]);
    });

    // in the following code, we had the problem, that customersLookupData was not ready, when needed.
    // therefore I implemented the async await. Now it seams to work. Even though I do not like to wait here.
    // this.customerService.getAllAsync().subscribe(customers => {
    //   this.customersLookupData = customers;
    // });
    this.customersLookupData = await this.customerService.getAllAsync().toPromise();

    this.regionService.getAllAsync().subscribe(regions => {
      this.allRegions = regions;
      this.allRegionsLookup = this.allRegions.map(r => <KeyNameItem> {keyNamePath : r.keyNamePath, name : r.name} );
      this.filteredRegionsLookup = this.allRegionsLookup.slice();
      const rootnode = new KeyValueNode();
      rootnode.children = [];
      rootnode.value = 'root';
      this.regionNode = this.keyNameHierarchyHelperService.buildKeyValueNodeHierarchy(
        this.allRegions,
        rootnode,
        this.keyNameHierarchyHelperService.getRootItems(this.allRegionsLookup)
      );
      this.primeNGTreeRegionNodes = this.keyNameHierarchyHelperService.transformToPrimeNGTreeNode(this.regionNode.children);
    });


    this.offeringService.getAllAsync().subscribe(offerings => {
      this.allOfferings = offerings;
      // this.offeringsLookup = this.keyNameHierarchyHelperService.getRootItems(this.allOfferings.map(o => {
      this.allOfferingsLookup = this.keyNameHierarchyHelperService.getChildsByKeyNamePathHelper(this.allOfferings.map(o => {
        return <KeyNameItem>{ keyNamePath : o.keyNamePath, name : o.name } ;
      }), '');
      this.filteredOfferingsLookup = this.allOfferingsLookup.slice();
      const rootnode = new KeyValueNode();
      rootnode.children = [];
      rootnode.value = 'root';
      this.offeringNode = this.keyNameHierarchyHelperService.buildKeyValueNodeHierarchy(
        this.allOfferings,
        rootnode,
        this.keyNameHierarchyHelperService.getRootItems(this.allOfferingsLookup)
      );
      this.primeNGTreeOfferingNodes = this.keyNameHierarchyHelperService.transformToPrimeNGTreeNode(this.offeringNode.children);
      // console.log(JSON.stringify(this.offeringNode));
    });

    this.route.params.subscribe((params: Params) => this.projectId = params['id'] ) ;
    if (this.projectId) {
      this.projectService.getProjectByIdAsync(this.projectId).subscribe(project => {
        this.project = project;
        if (project.industry) {
          this.selectedIndustry = this.industries.find(i => i.id === project.industry.id);
        }
        if (project.customer) {
          this.selectedCustomer = this.customersLookupData.find(c => c.id === project.customer.id);
        }
        if (project.skills) {
          this.selectedSkills = project.skills.map(s => new KeyValue(s.id, s.name));
        }
        if (project.offerings) {
          this.selectedOfferings = project.offerings.map(o => <KeyNameItem>{ keyNamePath: o.keyNamePath, name: o.name});
        }

        if (project.regions) {
          this.selectedRegions = project.regions.map(r => <KeyNameItem>{ keyNamePath: r.keyNamePath, name: r.name});
        }
      });
    }
  }

  onOfferingTreeNodeSelected(event: any) {
    this.selectedOfferings.push({name: event.node.label, keyNamePath: event.node.data});
  }
  onRegionTreeNodeSelected(event: any) {
    this.selectedRegions.push({name: event.node.label, keyNamePath: event.node.data});
  }

  private getIndustriesAsKeyValue(industries: Industry[]) {
    return industries.map(i => new KeyValue(i.id, i.name) ) ;
  }
  private getSkillsAsKeyValue(skills: Skill[]) {
    return skills.map(i => new KeyValue(i.id, i.name) ) ;
  }

  onSkillLookup(event) {
    this.skillsLookup = this.getSkillsAsKeyValue(this.allSkills.filter(s => s.name.toUpperCase().indexOf(event.query.toUpperCase()) > -1));
  }

  onOfferingsLookup(event) {
    this.filteredOfferingsLookup = this.allOfferingsLookup.filter(o => o.name.toUpperCase().indexOf(event.query.toUpperCase()) > -1);
  }

  onRegionsLookup(event) {
    this.filteredRegionsLookup = this.allRegionsLookup.filter(o => o.name.toUpperCase().indexOf(event.query.toUpperCase()) > -1);
  }

  getParentTreeOfferings(child: KeyNameItem): KeyNameItem[] {
    const ret = this.keyNameHierarchyHelperService.getBreadCrumpArray(this.allOfferingsLookup, child);
    return ret;
  }

  getParentTreeRegions(child: KeyNameItem): KeyNameItem[] {
    const ret = this.keyNameHierarchyHelperService.getBreadCrumpArray(this.allRegionsLookup, child);
    return ret;
  }

  onSaveBtnClicked() {
    this.submitting = true;
    // umwandeln von selected Items to domain items
    this.project.customer = this.selectedCustomer;
    this.project.industry = this.selectedIndustry;
    this.project.skills = this.allSkills.filter(s => this.selectedSkills.find(ss => ss.key === s.id));
    this.project.regions = this.allRegions.filter(r => this.selectedRegions.find(rr => rr.keyNamePath === r.keyNamePath));
    this.project.offerings = this.allOfferings.filter(o => this.selectedOfferings.find(oo => oo.keyNamePath === o.keyNamePath));
    // this.project.dxcServices = this.dxcServices;
    // this.project.dxcSolution = this.dxcSolution;
    // this.project.facts = this.dxcFacts;
    // this.project.betriebsleistung = this.dxcBetriebsleistung;


    this.projectService.SaveProject(this.project).subscribe(
      () => {
        this.submitting = false;

        this.projectService.getProjectIdByNameAsync(this.project.name).subscribe(id => {
          this.router.navigate(['/projects/detail/', id]);
          // this.toastr.success('Saving Project: ' + this.project.name, 'Success');
          this.toastr.success('Saved');
        });
      },
      (err) => {
        this.toastr.error('an error occured saving data');
        this.formErrors.clear();
        err.error.errors.forEach(element => {
          this.formErrors[element.name] = element.message;
        });
        console.log(JSON.stringify(this.formErrors));
      }
    );
  }
}
