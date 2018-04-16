import { Region } from '../regions/region.model';
import { Offering } from '../offerings/offering.model';
import { Skill } from '../skills/Skill.model';

export class Project {
    id: AAGUID;
    name: string;
    regions: Region[];
    offerings: Offering[];
    skills: Skill[];

    constructor() {
        this.regions = [];
        this.offerings = [];
        this.skills = [];
    }
}
