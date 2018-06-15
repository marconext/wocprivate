import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Project } from '../project.model';

@Component({
  selector: 'app-project-list-pf',
  templateUrl: './project-list-pf.component.html'
})
export class ProjectListPFComponent implements OnInit {

  @Input() projects: Project[];
  @Output() projectSelected = new EventEmitter<Project>();
  @Output() deleteProjectsRequest = new EventEmitter<Project[]>();
  @Output() addProjectsRequest = new EventEmitter<void>();
  @Output() editProjectsRequest = new EventEmitter<AAGUID>();

  selectedItems: Project[];
  data: Project[];

  selectedProject: Project;

  constructor() {
    this.selectedItems = [];
  }


  ngOnInit() {
    setTimeout(() => {
      this.data = this.projects;
    }, 1000);
  }

  onProjectSelected(project: Project) {
    this.projectSelected.emit(project);
    this.selectedProject = project;
  }

  // onProjectSelected(event) {
  //   const project: Project = event.data;
  //   this.projectSelected.emit(project);
  // }


  onAddRequest() {
    this.addProjectsRequest.emit();
  }

  onEditRequest() {
    this.editProjectsRequest.emit(this.selectedItems[0].id);
  }

  onDeleteRequest() {
    this.deleteProjectsRequest.emit(this.selectedItems);
    this.selectedItems = [];
  }
}
