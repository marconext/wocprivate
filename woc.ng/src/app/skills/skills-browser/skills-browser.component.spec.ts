import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsBrowserComponent } from './skills-browser.component';
import { FormsModule } from '@angular/forms';
import { SkillsService } from '../skills.service';
import { HttpClientModule } from '@angular/common/http';
import { ProjectsService } from '../../projects/projects.service';

describe('SkillsBrowserComponent', () => {
  let component: SkillsBrowserComponent;
  let fixture: ComponentFixture<SkillsBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [ SkillsBrowserComponent ],
      providers: [SkillsService, ProjectsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
