// import { Injectable } from '@angular/core';
// import { Project } from './project.model';
// import { BusinessLocation } from '../locations/business-location.model';
// import { LocationService } from '../locations/location.service';
// import { ProjectFilter } from './project-filter';
// import { FakeLocationDataProviderService } from '../shared/services/fake-location-data-provider.service';

// @Injectable()
// export class ProjectsService {
//   projects: Project[];

//   // constructor(private locationService: LocationService) {
//   constructor(private fakeLocationDataProviderService: FakeLocationDataProviderService) {
//     this.loadFakeData();
//   }

//   getAllProjects() {
//     return this.projects;
//   }

//   getFilteredProjects(filter: ProjectFilter) {

//     let res = this.projects; // start with all projects.
//     if (filter.locationsKeyNamePath.length > 0) {
//       res = res.filter(p => {
//         const locs = p.locations.filter(pl => {
//           const i = pl.keyNamePath.startsWith(filter.locationsKeyNamePath);
//           return i;
//         });

//         const b = locs.length;
//         return locs.length > 0;
//       });
//     }
//     return res;
//   }

//   getLocatinList() {
//     const locs: BusinessLocation[] = [];
//     // gather all locations from Business
//     this.projects.forEach(p => p.locations.forEach(l => {
//       if (!locs.includes(l)) {
//         locs.push(l);
//       }
//     }));
//     return locs;
//   }

//   private loadFakeData() {
//     // const locations: BusinessLocation[] = [];
//     // locations.push({id: '123', name: 'EMEA', keyName: 'EMEA', keyNamePath: ';EMEA', idPath: ';123'});
//     // locations.push({id: '456', name: 'CH', keyName: 'CH', keyNamePath: ';EMEA;CH', idPath: ';123;456'});
//     // locations.push({id: '789', name: 'DE', keyName: 'DE', keyNamePath: ';EMEA;DE', idPath: ';123;789'});
//     this.projects = [];
//     let proj = new Project();
//     proj.id = '7bdf6bee-3025-48ad-8860-f88bcef8f367';
//     // proj.locations.push(locations.filter(l => l.name === 'CH')[0]);
//     proj.locations.push(this.fakeLocationDataProviderService.getByKeyNamePath(';EMEA;CH'));
//     proj.locations.push(this.fakeLocationDataProviderService.getByKeyNamePath(';EMEA;CH;BERN'));
//     proj.name = 'Project 1';
//     this.projects.push(proj);

//     proj = new Project();
//     proj.id = '0597d0ef-50a2-4c3b-9b93-05a8902f5232';
//     // proj.locations.push(locations.filter(l => l.name === 'DE')[0]);
//     proj.locations.push(this.fakeLocationDataProviderService.getByKeyNamePath(';EMEA;DE'));
//     proj.name = 'Project 2';
//     this.projects.push(proj);

//     proj = new Project();
//     proj.id = 'f0e42d82-d655-4a9d-bc5e-7731fe16870f';
//     // proj.locations.push(locations.filter(l => l.name === 'CH')[0]);
//     const x = this.fakeLocationDataProviderService.getByKeyNamePath(';EMEA;CH');
//     proj.locations.push(this.fakeLocationDataProviderService.getByKeyNamePath(';EMEA;CH'));
//     proj.locations.push(this.fakeLocationDataProviderService.getByKeyNamePath(';EMEA;DE'));
//     proj.name = 'Project 3';
//     this.projects.push(proj);


//     proj = new Project();
//     proj.id = 'b5b21497-8dff-4a9d-8798-7e150664f857';
//     // proj.locations.push(locations.filter(l => l.name === 'DE')[0]);
//     proj.locations.push(this.fakeLocationDataProviderService.getByKeyNamePath(';NA;US'));
//     proj.name = 'Project 4';
//     this.projects.push(proj);

//   }
// }
