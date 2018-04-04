import { EmployeeSkill } from './employee-skill.model';

export class Employee {
    id: AAGUID;
    name: string;
    email: string;
    skills: EmployeeSkill[];

    constructor() {
        this.skills = [];
    }
}
