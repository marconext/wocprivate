import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BusinessLocation } from '../business-location.model';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-parent-child-locations',
  templateUrl: './parent-child-locations.component.html',
  styleUrls: ['./parent-child-locations.component.css']
})
export class ParentChildLocationsComponent implements OnInit {

  private _parentNamePath = '';
  @Input() set parentString(value: string) {
    this._parentNamePath = value;
    this.onParentChanged(value);
  }
  get parentString() {
    return this._parentNamePath;
  }

  @Output() locationChanged = new EventEmitter<BusinessLocation>();

  parent: BusinessLocation;
  childs: BusinessLocation[];
  breadCrumpNodes: BusinessLocation[];

  rootLocation: BusinessLocation;
  rootLocations: BusinessLocation[];


  constructor(private locationService: LocationService) {
    this.childs = this.locationService.getRootLocations();
    this.breadCrumpNodes = [];
    // this.onParentChanged(';EMEA');
    this.rootLocations = this.locationService.getRootLocations();
  }

  ngOnInit() {
    // this.onParentChanged(this.parentString);
  }

  onParentChanged(value: string) {
    if (value === '') {
      this.parent = null;
      // this.childs = this.locationService.getChildsByKeyNamePath(this.parent.keyNamePath);
      this.childs = this.locationService.getRootLocations();
      this.breadCrumpNodes = null;
    } else {
      this.parent = this.locationService.getByKeyNamePath(value);
      // this.childs = this.locationService.getChildsByKeyNamePath(this.parent.keyNamePath);
      this.childs = this.locationService.getProjectChildsByKeyNamePath(this.parent.keyNamePath);
      this.breadCrumpNodes = this.keyNamePathToBreadCrumpNodes(this.parent.keyNamePath);
    }
    this.locationChanged.emit(this.parent);
  }

  keyNamePathToBreadCrumpNodes(keyNamePath: string) {
    const locations: BusinessLocation[] = [];
    let restKeyNamePath = keyNamePath;
    while (restKeyNamePath.length > 0) {
      locations.unshift(this.locationService.getByKeyNamePath(restKeyNamePath));
      restKeyNamePath = this.getParentKeyNamePath(restKeyNamePath);
    }
    return locations;
  }
  private getParentKeyNamePath(keyNamePath: string) {
    const parentKeyNamePath: string = keyNamePath.substr(0, keyNamePath.lastIndexOf(';'));
    return parentKeyNamePath;
  }
}
