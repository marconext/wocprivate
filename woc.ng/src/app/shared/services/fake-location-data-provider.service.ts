import { BusinessLocation } from '../../locations/business-location.model';

export class FakeLocationDataProviderService {
    private locations: BusinessLocation [] = [];

    constructor() {
        this.loadFakeData();
    }

    getByKeyNamePath(keyNamePath: string) {
        return this.locations.filter(l => l.keyNamePath === keyNamePath)[0];
    }

    getFakeData() {
        return this.locations;
    }

    private loadFakeData() {

        this.locations.push({id: '123', name: 'EMEA', keyName: 'EMEA', keyNamePath: ';EMEA', idPath: ';123'});
        this.locations.push({id: '456', name: 'CH', keyName: 'CH', keyNamePath: ';EMEA;CH', idPath: ';123;456'});
        this.locations.push({id: '2456', name: 'Bern', keyName: 'BERN', keyNamePath: ';EMEA;CH;BERN', idPath: ';123;456;2456'});
        this.locations.push({id: '3456', name: 'Zürich', keyName: 'ZUERICH', keyNamePath: ';EMEA;CH;ZUERICH', idPath: ';123;456;3456'});
        this.locations.push({id: '789', name: 'DE', keyName: 'DE', keyNamePath: ';EMEA;DE', idPath: ';123;789'});
        this.locations.push({id: 'B123', name: 'NA', keyName: 'NA', keyNamePath: ';NA', idPath: ';B123'});
        this.locations.push({id: 'B456', name: 'USA', keyName: 'US', keyNamePath: ';NA;US', idPath: ';B123;B456'});
        this.locations.push({id: 'B789', name: 'CANADA', keyName: 'CND', keyNamePath: ';NA;CND', idPath: ';B123;B789'});
    }

}
