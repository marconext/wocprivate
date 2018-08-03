import { EmployeeSkill } from './employee-skill.model';
import { EmployeeAvailability } from './employee-availability.model';

export class Employee {
    id: AAGUID;
    name: string;
    email: string;
    skills: EmployeeSkill[];
    availability: EmployeeAvailability[];

    constructor() {
        this.skills = [];
        this.availability = [];
    }
}
