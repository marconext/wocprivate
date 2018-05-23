import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';

import { OfferingFilterComponent } from './offering-filter.component';
import { OfferingService } from '../offering.service';


describe('OfferingsComponent', () => {
  let component: OfferingFilterComponent;
  let fixture: ComponentFixture<OfferingFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ OfferingFilterComponent ],
      providers: [ OfferingService, HttpClient ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
