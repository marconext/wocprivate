import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Offering } from './offering.model';
import { OfferingService } from './offering.service';

@Component({
  selector: 'app-offerings',
  templateUrl: './offerings.component.html',
  styleUrls: ['./offerings.component.css']
})
export class OfferingsComponent implements OnInit {

  @Input() parentString: string;
  @Input() projectOfferings: Offering[];
  allOfferings: Offering[];

  @Output() offeringChanged = new EventEmitter<Offering>();

  parent: Offering;
  childs: Offering[];
  breadCrumpNodes: Offering[];

  rootLocation: Offering;
  rootRegions: Offering[];

  constructor(private offeringService: OfferingService) {
    this.projectOfferings = [];
    this.allOfferings = [];
    this.childs = [];
    this.breadCrumpNodes = [];
    this.rootRegions = [];
    // this.onParentChanged(';EMEA');
    this.rootRegions = [];
  }

  ngOnInit() {
    this.offeringService.getAllAsync().subscribe(rr => {
      this.allOfferings = rr;
      this.onParentChanged(this.parent ? this.parent.keyNamePath : '' );
    });
  }

  async onParentChanged(value: string) {
    if (value === '') {
      this.parent = null;
      // this.childs = this.locationService.getChildsByKeyNamePath(this.parent.keyNamePath);
      this.childs = await this.getRootOfferings();
      this.breadCrumpNodes = null;
    } else {
      this.parent = this.getOfferingByKeyNamePath(value);
      // this.childs = this.locationService.getChildsByKeyNamePath(this.parent.keyNamePath);
      this.childs = this.getDirectChildsByKeyNamePathHelper(this.parent.keyNamePath);
      this.breadCrumpNodes = this.keyNamePathToBreadCrumpNodes(this.parent.keyNamePath);
    }
    this.offeringChanged.emit(this.parent);
  }

  // extracts the given keyname path to its locations
  private keyNamePathToBreadCrumpNodes(keyNamePath: string): Offering[] {
    const offerings: Offering[] = [];
    let restKeyNamePath = keyNamePath;
    while (restKeyNamePath.length > 0) {
      offerings.unshift(this.getOfferingByKeyNamePath(restKeyNamePath));
      restKeyNamePath = this.getParentKeyNamePath(restKeyNamePath);
    }
    return offerings;
  }

  private getDirectChildsByKeyNamePathHelper(keyNamePath: string): Offering[] {
    return this.allOfferings.filter(l =>
      (l.keyNamePath !== keyNamePath)
      && (l.keyNamePath.startsWith(keyNamePath))
      && (this.getLevel(keyNamePath) + 1 === this.getLevel(l.keyNamePath))
    );
  }

  private getRootOfferings() {
    return this.allOfferings.filter(l => l.keyNamePath.split(';').length === 2);
  }

  private getOfferingByKeyNamePath(keyNamePath: string): Offering {
    return this.allOfferings.filter(l => l.keyNamePath === keyNamePath)[0];
  }

  // retruns the parent KeyNamePath
  private getParentKeyNamePath(keyNamePath: string) {
    const parentKeyNamePath: string = keyNamePath.substr(0, keyNamePath.lastIndexOf(';'));
    return parentKeyNamePath;
  }

  private getLevel(keyNamePath: string) {
    const len = keyNamePath.split(';').length - 1;
    return len;
  }
}
