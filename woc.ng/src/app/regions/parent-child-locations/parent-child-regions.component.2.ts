// import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { Region } from '../region.model';
// import { RegionService } from '../region.service';
// import { timeout } from 'q';

// @Component({
//   selector: 'app-parent-child-locations',
//   templateUrl: './parent-child-regions.component.html',
//   styleUrls: ['./parent-child-regions.component.css']
// })
// export class ParentChildRegionsComponent implements OnInit {

//   private _parentNamePath = '';
//   @Input() set parentString(value: string) {
//     this._parentNamePath = value;
//     this.onParentChanged(value);
//   }
//   get parentString() {
//     return this._parentNamePath;
//   }

//   @Input() projectRegions: Region[];
//   allRegions: Region[];

//   @Output() locationChanged = new EventEmitter<Region>();

//   parent: Region;
//   childs: Region[];
//   breadCrumpNodes: Region[];

//   rootLocation: Region;
//   rootRegions: Region[];

//   firsttime: boolean;

//   constructor(private regionService: RegionService) {
//     this.projectRegions = [];
//     this.allRegions = [];
//     this.childs = [];
//     this.breadCrumpNodes = [];
//     this.rootRegions = [];
//     // this.onParentChanged(';EMEA');
//     this.rootRegions = [];
//     this.firsttime = true;
//   }

//   ngOnInit() {
//     // this.onParentChanged(this.parentString);
//     this.loadAllRegions();
//   }

//   private async loadAllRegions() {
//     await this.regionService.getAllAsync().subscribe(rr => {
//       this.allRegions = rr;
//       this.onParentChanged(this.parent ? this.parent.keyNamePath : '' );
//     });

//   }

//   async onParentChanged(value: string) {
//     if (value === '') {
//       this.parent = null;
//       // this.childs = this.locationService.getChildsByKeyNamePath(this.parent.keyNamePath);
//       this.childs = await this.getRootRegions();
//       this.breadCrumpNodes = null;
//     } else {
//       this.parent = this.getLocationByKeyNamePath(value);
//       // this.childs = this.locationService.getChildsByKeyNamePath(this.parent.keyNamePath);
//       this.childs = this.getDirectChildsByKeyNamePathHelper(this.parent.keyNamePath);
//       this.breadCrumpNodes = this.keyNamePathToBreadCrumpNodes(this.parent.keyNamePath);
//     }
//     this.locationChanged.emit(this.parent);
//   }

//   // extracts the given keyname path to its locations
//   keyNamePathToBreadCrumpNodes(keyNamePath: string): Region[] {
//     const locations: Region[] = [];
//     let restKeyNamePath = keyNamePath;
//     while (restKeyNamePath.length > 0) {
//       locations.unshift(this.getLocationByKeyNamePath(restKeyNamePath));
//       restKeyNamePath = this.getParentKeyNamePath(restKeyNamePath);
//     }
//     return locations;
//   }

//   private getDirectChildsByKeyNamePathHelper(keyNamePath: string): Region[] {
//     return this.allRegions.filter(l =>
//       (l.keyNamePath !== keyNamePath)
//       && (l.keyNamePath.startsWith(keyNamePath))
//       && (this.getLevel(keyNamePath) + 1 === this.getLevel(l.keyNamePath))
//     );
//   }

//   private async getRootRegions() {
//     if (this.allRegions.length === 0) {
//       await this.loadAllRegions();
//     }
//     return this.allRegions.filter(l => l.keyNamePath.split(';').length === 2);
//   }

//   private getLocationByKeyNamePath(keyNamePath: string): Region {
//     return this.allRegions.filter(l => l.keyNamePath === keyNamePath)[0];
//   }

//   // retruns the parent KeyNamePath
//   private getParentKeyNamePath(keyNamePath: string) {
//     const parentKeyNamePath: string = keyNamePath.substr(0, keyNamePath.lastIndexOf(';'));
//     return parentKeyNamePath;
//   }

//   private getLevel(keyNamePath: string) {
//     const len = keyNamePath.split(';').length - 1;
//     console.log('keyname: ', keyNamePath, ': ', len);

//     return len;
//   }
// }
