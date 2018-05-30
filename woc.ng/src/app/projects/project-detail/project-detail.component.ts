import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../project.model';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html'
})
export class ProjectDetailComponent implements OnInit {

  @Input() project: Project;
  @Output() editProjectsRequest = new EventEmitter<AAGUID>();

  ngOnInit() {
  }

  onEditRequest() {
    this.editProjectsRequest.emit(this.project.id);
  }
}
