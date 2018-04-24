import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSkillsListComponent } from './employee-skills-list.component';
import { EmployeeService } from '../../employee.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthHttpService } from '../../../shared/services/authHttp.service';
import { Adal5Service, Adal5HTTPService } from 'adal-angular5';

describe('EmployeeSkillsListComponent', () => {
  let component: EmployeeSkillsListComponent;
  let fixture: ComponentFixture<EmployeeSkillsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSkillsListComponent ],
      providers: [EmployeeService, HttpClient, HttpHandler, AuthHttpService, Adal5Service,
        {
          provide: Adal5HTTPService,
          useFactory: Adal5HTTPService.factory,
          deps: [
            HttpClient,
            Adal5Service
          ]
        }]
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
