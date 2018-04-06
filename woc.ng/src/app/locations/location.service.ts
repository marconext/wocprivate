import { Injectable } from '@angular/core';
import { BusinessLocation } from './business-location.model';
import { ProjectsService } from '../projects/projects.service';
import { FakeLocationDataProviderService } from '../shared/services/fake-location-data-provider.service';

@Injectable()
export class LocationService {
    locations: BusinessLocation[];
    projectLocations: BusinessLocation[];

    constructor(private projectService: ProjectsService, private fakeLocationDataProviderService: FakeLocationDataProviderService) {
        this.locations = [];
        this.projectLocations = [];
        this.locations = this.fakeLocationDataProviderService.getFakeData();
        this.loadFakeProjectLocationData();
    }

    getByKeyNamePath(keyNamePath: string) {
        return this.locations.filter(l => l.keyNamePath === keyNamePath)[0];
    }

    getChildsByKeyNamePath(keyNamePath: string) {
        return this.getChildsByKeyNamePathHelper(this.locations, keyNamePath);
    }

    getProjectChildsByKeyNamePath(keyNamePath: string) {
        return this.getChildsByKeyNamePathHelper(this.projectLocations, keyNamePath);
    }

    private getChildsByKeyNamePathHelper(locations: BusinessLocation[], keyNamePath: string) {
        return locations.filter(l =>
            (l.keyNamePath !== keyNamePath)
            && (l.keyNamePath.startsWith(keyNamePath))
            && (this.getLevel(keyNamePath) + 1  === this.getLevel(l.keyNamePath))
        );
    }

    getRootLocations() {
        return this.locations.filter(l => l.keyNamePath.indexOf(';') === 0);
    }

    private _loadFakeData() {
        this.locations.push({id: '123', name: 'EMEA', keyName: 'EMEA', keyNamePath: ';EMEA', idPath: ';123'});
        this.locations.push({id: '456', name: 'CH', keyName: 'CH', keyNamePath: ';EMEA;CH', idPath: ';123;456'});
        this.locations.push({id: '2456', name: 'Bern', keyName: 'BERN', keyNamePath: ';EMEA;CH;BERN', idPath: ';123;456;2456'});
        this.locations.push({id: '3456', name: 'Zürich', keyName: 'ZUERICH', keyNamePath: ';EMEA;CH;ZUERICH', idPath: ';123;456;3456'});
        this.locations.push({id: '789', name: 'DE', keyName: 'DE', keyNamePath: ';EMEA;DE', idPath: ';123;789'});
        this.locations.push({id: 'B123', name: 'NA', keyName: 'NA', keyNamePath: ';NA', idPath: ';B123'});
        this.locations.push({id: 'B456', name: 'USA', keyName: 'US', keyNamePath: ';NA;US', idPath: ';B123;B456'});
        this.locations.push({id: 'B789', name: 'CANADA', keyName: 'CND', keyNamePath: ';NA;CND', idPath: ';B123;B789'});
    }

    private loadFakeProjectLocationData() {
        this.projectLocations = this.projectService.getLocatinList();
    }

    private getLevel(keyNamePath: string) {
        const len = keyNamePath.split(';').length - 1;
        console.log('keyname: ', keyNamePath, ': ', len);

        return len;
    }
}
