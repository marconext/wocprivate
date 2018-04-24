import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailComponent } from './employee-detail.component';
import { EmployeeSkillsListComponent } from './employee-skills-list/employee-skills-list.component';
import { EmployeeService } from '../employee.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthHttpService } from '../../shared/services/authHttp.service';
import { Adal5HTTPService, Adal5Service } from 'adal-angular5';
import { Employee } from '../employee.model';

describe('EmployeeDetailComponent', () => {
  let component: EmployeeDetailComponent;
  let fixture: ComponentFixture<EmployeeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSkillsListComponent, EmployeeDetailComponent ],
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
    fixture = TestBed.createComponent(EmployeeDetailComponent);
    component = fixture.componentInstance;
    component.employee = new Employee();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
