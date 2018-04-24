import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Adal5HTTPService } from 'adal-angular5/adal5-http.service';
import { Adal5Service } from 'adal-angular5';

import { EmployeeCreateComponent } from './employee-create.component';

import { EmployeeService } from '../employee.service';
import { AuthHttpService } from '../../shared/services/authHttp.service';

describe('EmployeeCreateComponent', () => {
  let component: EmployeeCreateComponent;
  let fixture: ComponentFixture<EmployeeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCreateComponent ],
      imports: [ FormsModule ],
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
    fixture = TestBed.createComponent(EmployeeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
