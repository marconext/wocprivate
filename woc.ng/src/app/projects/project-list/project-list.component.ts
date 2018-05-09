import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Project } from '../project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnInit {

  @Input() projects: Project[];
  @Output() projectSelected = new EventEmitter<Project>();

  constructor() { }

  ngOnInit() {
  }

  onProjectSelected(project: Project) {
    this.projectSelected.emit(project);
  }
}
