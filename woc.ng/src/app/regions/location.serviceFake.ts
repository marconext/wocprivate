// import { Injectable } from '@angular/core';
// import { BusinessLocation } from './business-location.model';
// import { ProjectsService } from '../projects/projects.service';
// import { FakeLocationDataProviderService } from '../shared/services/fake-location-data-provider.service';

// @Injectable()
// export class LocationService {
//     locations: BusinessLocation[];
//     projectLocations: BusinessLocation[];

//     constructor(private projectService: ProjectsService, private fakeLocationDataProviderService: FakeLocationDataProviderService) {
//         this.locations = [];
//         this.projectLocations = [];
//         this.locations = this.fakeLocationDataProviderService.getFakeData();
//         this.loadFakeProjectLocationData();
//     }

//     getByKeyNamePath(keyNamePath: string) {
//         return this.locations.filter(l => l.keyNamePath === keyNamePath)[0];
//     }

//     getChildsByKeyNamePath(keyNamePath: string) {
//         return this.getChildsByKeyNamePathHelper(this.locations, keyNamePath);
//     }

//     getProjectChildsByKeyNamePath(keyNamePath: string) {
//         return this.getChildsByKeyNamePathHelper(this.projectLocations, keyNamePath);
//     }

//     private getChildsByKeyNamePathHelper(locations: BusinessLocation[], keyNamePath: string) {
//         return locations.filter(l =>
//             (l.keyNamePath !== keyNamePath)
//             && (l.keyNamePath.startsWith(keyNamePath))
//             && (this.getLevel(keyNamePath) + 1  === this.getLevel(l.keyNamePath))
//         );
//     }

//     getRootLocations() {
//         return this.locations.filter(l => l.keyNamePath.split(';').length === 2);
//     }

//     private _loadFakeData() {
//         this.locations.push({id: '123', name: 'EMEA', keyNamePath: ';EMEA'});
//         this.locations.push({id: '456', name: 'CH', keyNamePath: ';EMEA;CH', });
//         this.locations.push({id: '2456', name: 'Bern', keyNamePath: ';EMEA;CH;BERN', });
//         this.locations.push({id: '3456', name: 'Zürich', keyNamePath: ';EMEA;CH;ZUERICH'});
//         this.locations.push({id: '789', name: 'DE', keyNamePath: ';EMEA;DE'});
//         this.locations.push({id: 'B123', name: 'NA', keyNamePath: ';NA'});
//         this.locations.push({id: 'B456', name: 'USA', keyNamePath: ';NA;US'});
//         this.locations.push({id: 'B789', name: 'CANADA', keyNamePath: ';NA;CND'});
//     }

//     private loadFakeProjectLocationData() {
//         this.projectLocations = this.projectService.getLocatinList();
//     }

//     private getLevel(keyNamePath: string) {
//         const len = keyNamePath.split(';').length - 1;
//         console.log('keyname: ', keyNamePath, ': ', len);

//         return len;
//     }
// }
