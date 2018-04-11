import { Region } from '../regions/region.model';

export class Project {
    id: AAGUID;
    name: string;
    regions: Region[];

    constructor() {
        this.regions = [];
    }
}
