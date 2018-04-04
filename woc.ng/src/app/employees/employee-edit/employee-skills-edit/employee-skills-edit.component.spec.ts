import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSkillsEditComponent } from './employee-skills-edit.component';

describe('EmployeeSkillsEditComponent', () => {
  let component: EmployeeSkillsEditComponent;
  let fixture: ComponentFixture<EmployeeSkillsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSkillsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSkillsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
