import { Region } from '../regions/region.model';
import { Offering } from '../offerings/offering.model';

export class Project {
    id: AAGUID;
    name: string;
    regions: Region[];
    offerings: Offering[];

    constructor() {
        this.regions = [];
        this.offerings = [];
    }
}
