import { BusinessLocation } from '../locations/business-location.model';

export class Project {
    id: AAGUID;
    name: string;
    locations: BusinessLocation[];

    constructor() {
        this.locations = [];
    }
}
