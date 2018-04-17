import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Skill } from './Skill.model';
import { ProjectsService } from '../projects/projects.service';


@Injectable()
export class SkillsService {
    private configUrl = 'http://localhost:5000/api/';
    private allSkills: Skill[];
    private projectSkills: Skill[];

    constructor(private httpClient: HttpClient, private projectService: ProjectsService) {
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

    // constructor() {
    //     this.allskills = this.getAllSkillsFake();
    // }

    // getAllSkills() {
    //     return this.allskills;
    // }

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

    // private getAllSkillsFake() {
    //     const skills: Skill[] = [];
    //     skills.push(new Skill('fd5bc91d-8dbb-4be8-bda1-264610d190e6', 'Skill 1', ';Skill_1'));
    //     skills.push(new Skill('7512932a-cdfa-4588-8b66-393733391257', 'askill', ';x'));
    //     skills.push(new Skill('0bb15f99-ae3d-430a-8103-ee5800aed3ba', 'abskill', ';'));
    //     skills.push(new Skill('9e70f735-7f78-499d-b77e-19639d184ea2', 'abcskill', ';'));
    //     skills.push(new Skill('9d2c211b-f4a3-479a-994c-29518a2d00a8', 'abcdskill', ';'));
    //     // skills.push(new Skill('751ca83d-3a5a-437e-b4ea-3f3476e94136', '', ';'));
    //     // skills.push(new Skill('403a7fd1-e10d-4064-9ced-939410de9711', '', ';'));
    //     // skills.push(new Skill('3a26d0e8-3936-4420-85f8-02c6e2ac8eaa', '', ';'));
    //     // skills.push(new Skill('6f622bb7-58a3-48e1-886c-50bd3c12d6a0', '', ';'));
    //     // skills.push(new Skill('4ae98650-8c6c-4824-a353-033fbb86c2da', '', ';'));
    //     // skills.push(new Skill('959e48e6-3d92-46eb-b99f-d5131035f42d', '', ';'));
    //     // skills.push(new Skill('6e0aa3d0-911c-489c-bf75-9e2e85f9fda0', '', ';'));
    //     // skills.push(new Skill('9e0651bc-6137-4c05-a14d-a25a2989d8ac', '', ';'));
    //     return skills;
    // }
}
