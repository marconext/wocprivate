import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { Project } from '../project.model';

@Component({
  selector: 'app-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit, OnDestroy {

  id: AAGUID;
  project: Project;
  private subscriptionRouteId: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectsService
  ) {
    this.project = new Project();
  }

  ngOnInit() {
    this.subscriptionRouteId = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.projectService.getProjectByIdAsync(this.id).subscribe(project => {
        if (!project) {
          this.router.navigate(['nothing found']);
        }
        this.project = project;
      });
    });
  }

  onProjectEditRequest(id: AAGUID) {
    this.router.navigate(['projects/editor/', id]);
  }

  ngOnDestroy() {
    this.subscriptionRouteId.unsubscribe();
  }
}
