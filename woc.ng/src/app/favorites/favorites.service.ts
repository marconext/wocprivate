import { Project } from '../projects/project.model';
import { Employee } from '../employees/employee.model';
import { Injectable } from '@angular/core';

export type ProjectOrEmployee = Project | Employee;

@Injectable()
export class FavoritesService {
    private items: (Project| Employee)[];

    count: number;

    constructor() {
        this.items = [];
    }

    addOrRemove(item: ProjectOrEmployee) {
        if (this.hasId(item)) {
            this.remove(item);
        } else {
            this.add(item);
        }
    }

    add(item: ProjectOrEmployee) {
        if (!this.items.find(e => e.id === item.id)) {
            this.items.push(item);
        }
        this.count = this.items.length;
    }

    remove(item: ProjectOrEmployee) {
        const ret = new Array<ProjectOrEmployee>();
        this.items.forEach(i => {
            if (i.id !== item.id) {
                ret.push(i);
            }
        });

        this.items = ret;
        this.count = this.items.length;
        return ret;

    }

    getAll() {
        return this.items.slice();
    }

    hasId(item: ProjectOrEmployee) {
        const x = this.items.find(e => e.id === item.id);
        const y = x === (null || undefined);
        const z = 1;
        return this.items.find(e => e.id === item.id) !== (null || undefined);
    }

}
