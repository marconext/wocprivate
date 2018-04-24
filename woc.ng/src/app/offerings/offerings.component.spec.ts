import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';

import { OfferingsComponent } from './offerings.component';
import { OfferingService } from './offering.service';


describe('OfferingsComponent', () => {
  let component: OfferingsComponent;
  let fixture: ComponentFixture<OfferingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ OfferingsComponent ],
      providers: [ OfferingService, HttpClient ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
