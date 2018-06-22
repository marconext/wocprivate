import { Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { Project } from '../project.model';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-project-list-pf',
  templateUrl: './project-list-pf.component.html'
})
export class ProjectListPFComponent implements OnInit {

  @Input() projects: Project[];

  @Input() selectedProjects: Project[];
  @Output() selectedProjectsChanged = new EventEmitter<Project>();

  @Input() selectedProject: Project;
  @Output() selectedProjectChanged = new EventEmitter<Project>();

  @Output() projectSelected = new EventEmitter<Project>();
  @Output() deleteProjectsRequest = new EventEmitter<Project[]>();
  @Output() addProjectsRequest = new EventEmitter<void>();
  @Output() editProjectsRequest = new EventEmitter<AAGUID>();

  @ViewChild('pager') paginator: Paginator;

  data: Project[];

  constructor() {
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
    this.editProjectsRequest.emit(this.projectSelected[0].id);
  }

  onDeleteRequest() {
    this.deleteProjectsRequest.emit(this.selectedProjects);
  }

  resetPager($event) {
    this.paginator.changePageToFirst($event);
  }
}
