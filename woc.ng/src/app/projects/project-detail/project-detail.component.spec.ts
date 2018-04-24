import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailComponent } from './project-detail.component';
import { Project } from '../project.model';

describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;
    component.project = new Project();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
