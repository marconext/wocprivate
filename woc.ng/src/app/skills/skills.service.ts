import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Skill } from './Skill.model';
import { ProjectsService } from '../projects/projects.service';
import { environment } from '../../environments/environment';


@Injectable()
export class SkillsService {
    private configUrl = '';
    private allSkills: Skill[];
    private projectSkills: Skill[];

    constructor(private httpClient: HttpClient, private projectService: ProjectsService) {
        this.configUrl = environment.apiUrl;

        this.allSkills = [];
        this.projectSkills = [];
        // // todo: handle all skills
        // this.getAllAsync().subscribe(ss => {
        //     this.allSkills = ss;
        // });

        this.projectService.GetProjectSkills().subscribe(ss => {
            this.projectSkills = ss;
        });
    }

    getAllAsync(): Observable<Skill[]> {
      return this.httpClient.get<Skill[]>(this.configUrl + 'skill');
    }

    getFilteredAllSkills(filter: string) {
        return this.getFilteredSkills(this.allSkills, filter);
    }

    getFilteredProjectSkills(filter: string) {
        return this.getFilteredSkills(this.projectSkills, filter);
    }

    getFilteredSkills(skills: Skill[], filter: string) {
        let filtered = [];
        if (filter !== '') {
            filtered = skills.filter(s =>
                s.name.toUpperCase().indexOf(filter.toUpperCase()) >= 0
            );
        } else {
            filtered = skills;
        }
        return filtered;
    }
}
