import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSkillsListComponent } from './employee-skills-list.component';

describe('EmployeeSkillsListComponent', () => {
  let component: EmployeeSkillsListComponent;
  let fixture: ComponentFixture<EmployeeSkillsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSkillsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSkillsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
