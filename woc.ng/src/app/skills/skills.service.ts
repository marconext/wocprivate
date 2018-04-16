import { Skill } from './Skill.model';

export class SkillsService {
    private allskills: Skill[];

    constructor() {
        this.allskills = this.getAllSkillsFake();
    }

    getAllSkills() {
        return this.allskills;
    }

    getFilteredSkills(filter: string) {
        let filtered = [];
        if (filter !== '') {
            filtered = this.allskills.filter(s =>
                s.name.toUpperCase().indexOf(filter.toUpperCase()) >= 0
            );
        } else {
            filtered = this.allskills;
        }
        return filtered;
    }

    private getAllSkillsFake() {
        const skills: Skill[] = [];
        skills.push(new Skill('fd5bc91d-8dbb-4be8-bda1-264610d190e6', 'Skill 1', ';Skill_1'));
        skills.push(new Skill('7512932a-cdfa-4588-8b66-393733391257', 'askill', ';x'));
        skills.push(new Skill('0bb15f99-ae3d-430a-8103-ee5800aed3ba', 'abskill', ';'));
        skills.push(new Skill('9e70f735-7f78-499d-b77e-19639d184ea2', 'abcskill', ';'));
        skills.push(new Skill('9d2c211b-f4a3-479a-994c-29518a2d00a8', 'abcdskill', ';'));
        // skills.push(new Skill('751ca83d-3a5a-437e-b4ea-3f3476e94136', '', ';'));
        // skills.push(new Skill('403a7fd1-e10d-4064-9ced-939410de9711', '', ';'));
        // skills.push(new Skill('3a26d0e8-3936-4420-85f8-02c6e2ac8eaa', '', ';'));
        // skills.push(new Skill('6f622bb7-58a3-48e1-886c-50bd3c12d6a0', '', ';'));
        // skills.push(new Skill('4ae98650-8c6c-4824-a353-033fbb86c2da', '', ';'));
        // skills.push(new Skill('959e48e6-3d92-46eb-b99f-d5131035f42d', '', ';'));
        // skills.push(new Skill('6e0aa3d0-911c-489c-bf75-9e2e85f9fda0', '', ';'));
        // skills.push(new Skill('9e0651bc-6137-4c05-a14d-a25a2989d8ac', '', ';'));
        return skills;
    }
}
