import { TestBed, inject } from '@angular/core/testing';

import { OfferingService } from './offering.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('OfferingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfferingService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([OfferingService], (service: OfferingService) => {
    expect(service).toBeTruthy();
  }));
});
