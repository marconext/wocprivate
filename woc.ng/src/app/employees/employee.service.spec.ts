import { TestBed, inject } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthHttpService } from '../shared/services/authHttp.service';
import { Adal5Service, Adal5HTTPService } from 'adal-angular5';

describe('EmployeeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeService, HttpClient, HttpHandler, AuthHttpService, Adal5Service,
        {
          provide: Adal5HTTPService,
          useFactory: Adal5HTTPService.factory,
          deps: [
            HttpClient,
            Adal5Service
          ]
        }]
    });
  });

  it('should be created', inject([EmployeeService], (service: EmployeeService) => {
    expect(service).toBeTruthy();
  }));
});
