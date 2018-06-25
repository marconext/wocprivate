import { Project } from '../projects/project.model';
import { Employee } from '../employees/employee.model';
import { Injectable } from '@angular/core';

export type ProjectOrEmployee = Project | Employee;

@Injectable()
export class FavoritesService {
    private items: ProjectOrEmployee[];

    count: number;

    constructor() {
        this.items = this.loadFromLocalStorage();
    }

    addOrRemove(item: ProjectOrEmployee) {
        if (this.hasId(item)) {
            this.remove(item);
        } else {
            this.add(item);
        }
        this.saveToLocalStorage();
    }

    add(item: ProjectOrEmployee) {
        if (!this.items.find(e => e.id === item.id)) {
            this.items.push(item);
        }
        this.count = this.items.length;
        this.saveToLocalStorage();
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
        this.saveToLocalStorage();

        return ret;
    }

    getAll() {
        // let its = this.items.slice();
        // if (!its || its.length === 0) {
        //     its = this.loadFromLocalStorage();
        //     this.items = its.slice();
        // }
        // return this.items;
        if (this.items.length === 0) {
            this.items = this.loadFromLocalStorage();
        }
        return this.items;
    }

    hasId(item: ProjectOrEmployee) {
        const x = this.items.find(e => e.id === item.id);
        const y = x === (null || undefined);
        const z = 1;
        return this.items.find(e => e.id === item.id) !== (null || undefined);
    }

    saveToLocalStorage() {
        localStorage.setItem('FAVORITES', JSON.stringify(this.items));
    }

    loadFromLocalStorage() {
        let its = JSON.parse(localStorage.getItem('FAVORITES'));
        if (!its && its.length === 0) {
            its = [];
        }
        return its;
    }
}
