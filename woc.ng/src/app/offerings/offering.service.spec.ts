import { TestBed, inject } from '@angular/core/testing';

import { OfferingService } from './offering.service';

describe('OfferingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfferingService]
    });
  });

  it('should be created', inject([OfferingService], (service: OfferingService) => {
    expect(service).toBeTruthy();
  }));
});
