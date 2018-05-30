import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Project } from '../project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnInit {

  @Input() projects: Project[];
  @Output() projectSelected = new EventEmitter<Project>();
  @Output() deleteProjectsRequest = new EventEmitter<Project[]>();
  @Output() addProjectsRequest = new EventEmitter<void>();
  @Output() editProjectsRequest = new EventEmitter<AAGUID>();

  selectedItems: Project[];

  constructor() {
    this.selectedItems = [];
  }

  ngOnInit() {
  }

  onProjectSelected(project: Project) {
    this.projectSelected.emit(project);
  }

  onAddRequest() {
    this.addProjectsRequest.emit();
  }

  onEditRequest() {
    this.editProjectsRequest.emit(this.selectedItems[0].id);
  }

  onDeleteRequest() {
    this.deleteProjectsRequest.emit(this.selectedItems);
  }
}
