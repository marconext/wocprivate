import { Region } from '../regions/region.model';
import { Offering } from '../offerings/offering.model';
import { Skill } from '../skills/Skill.model';
import { Customer } from '../customers/customer.model';
import { Industry } from '../insustries/industry.model';

export class Project {
    id: AAGUID;
    name: string;
    customer: Customer;
    industry: Industry;
    dxcServices: string;
    facts: string;
    dxcSolution: string;
    betriebsleistung: string;
    regions: Region[];
    offerings: Offering[];
    skills: Skill[];

    constructor() {
        this.regions = [];
        this.offerings = [];
        this.skills = [];
    }
}
