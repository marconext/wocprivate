import { EmployeeSkill } from './employee-skill.model';
import { AvailabilityItem } from './availability-item.model';
import { EmployeeRole } from './employee-role.model';
import { WorkPlace } from '../work-place/work-place.model';
import { Manager } from '../manager/manager.model';

export class Employee {
    id: AAGUID;
    name: string;
    email: string;
    skills: EmployeeSkill[];
    availability: AvailabilityItem[];
    roles: EmployeeRole[];
    workPlace: WorkPlace;
    manager: Manager;

    constructor() {
        this.skills = [];
        this.availability = [];
        this.roles = [];
        this.workPlace = new WorkPlace();
        // this.manager = <Manager>{};
    }
}
