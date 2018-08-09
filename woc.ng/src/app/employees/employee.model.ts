import { EmployeeSkill } from './employee-skill.model';
import { AvailabilityItem } from './availability-item.model';

export class Employee {
    id: AAGUID;
    name: string;
    email: string;
    skills: EmployeeSkill[];
    availability: AvailabilityItem[];

    constructor() {
        this.skills = [];
        this.availability = [];
    }
}
