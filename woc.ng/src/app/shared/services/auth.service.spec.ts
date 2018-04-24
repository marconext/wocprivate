import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Adal5Service } from 'adal-angular5';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, Adal5Service]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
