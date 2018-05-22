import { Component, OnInit } from '@angular/core';
import { Skill } from '../skills/Skill.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

  skills: Skill[];
  selectedSkills: Skill[];
  showList = false;

  constructor() {
    this.skills = [];
    this.selectedSkills = [];
    this.skills.push(new Skill('37b43056-79ae-4540-9d7a-69504f4dc304', 'skill 1', ''));
    this.skills.push(new Skill('b3427f3f-d4ec-47da-8327-8e6226b257bc', 'skill 2', ''));
  }

  ngOnInit() {
  }

  onSelect(skill: Skill) {
    this.selectedSkills.push(skill);
    this.showList = false;
  }

  addSkill() {
    this.showList = true;
  }
}
