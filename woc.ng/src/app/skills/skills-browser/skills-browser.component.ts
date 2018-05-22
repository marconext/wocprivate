import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Skill } from '../Skill.model';
import { SkillsService } from '../skills.service';

@Component({
  selector: 'app-skills-browser',
  templateUrl: './skills-browser.component.html'
})
export class SkillsBrowserComponent implements OnInit {

  @Output() skillChanged = new EventEmitter<Skill>();

  filteredSkills: Skill[];
  filterText: string;

  constructor(private skillsService: SkillsService) {
    this.filteredSkills = [];
    // this.filteredSkills = this.skillsService.getFilteredProjectSkills('');
  }

  ngOnInit() {
  }

  onSkillItemClicked(skill: Skill) {
    this.skillChanged.emit(skill);
  }

  onFilterChanged(filterText: string) {
    if (filterText === '') {
      this.filteredSkills = [];
    } else {
      this.filteredSkills = this.skillsService.getFilteredProjectSkills(filterText);
    }
  }
}
