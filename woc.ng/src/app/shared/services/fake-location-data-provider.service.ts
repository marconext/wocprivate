import { Region } from '../../regions/region.model';

export class FakeRegionDataProviderService {
    private locations: Region [] = [];

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
        this.locations.push({id: '45a77b91-84d9-4f81-a52c-4bfa3f747e5a', name: 'EMEA', keyNamePath: ';EMEA'});
        this.locations.push({id: 'b6c37d26-b0e1-4ab7-8f77-d2ef920faed9', name: 'CH', keyNamePath: ';EMEA;CH'});
        this.locations.push({id: 'e1afabdb-7f56-4608-8638-90f5b216fcbe', name: 'Bern', keyNamePath: ';EMEA;CH;BERN'});
        this.locations.push({id: '011adcf6-65fa-4dc6-99fd-df2becf56ab8', name: 'Zürich', keyNamePath: ';EMEA;CH;ZUERICH'});
        this.locations.push({id: '96d030c9-2e97-4883-ac79-7ca3583fef8d', name: 'DE', keyNamePath: ';EMEA;DE'});
        this.locations.push({id: '48f438ad-3df2-4173-87df-0e1ec7eacb8f', name: 'NA', keyNamePath: ';NA'});
        this.locations.push({id: 'a09eb74e-d546-41d9-9a4b-b91dc5a5d0fc', name: 'USA', keyNamePath: ';NA;US'});
        this.locations.push({id: 'ed5dd34a-a01c-4070-8bf1-0fc87963082f', name: 'CANADA', keyNamePath: ';NA;CND'});
    }
}
