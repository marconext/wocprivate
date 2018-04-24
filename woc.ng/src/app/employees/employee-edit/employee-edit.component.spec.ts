import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEditComponent } from './employee-edit.component';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthHttpService } from '../../shared/services/authHttp.service';
import { Adal5Service, Adal5HTTPService } from 'adal-angular5';
import { Employee } from '../employee.model';

describe('EmployeeEditComponent', () => {
  let component: EmployeeEditComponent;
  let fixture: ComponentFixture<EmployeeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ EmployeeEditComponent ],
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
    fixture = TestBed.createComponent(EmployeeEditComponent);
    component = fixture.componentInstance;
    component.employee = new Employee();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
