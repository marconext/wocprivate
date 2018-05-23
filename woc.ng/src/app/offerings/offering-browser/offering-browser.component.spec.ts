import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingBrowserComponent } from './offering-browser.component';

describe('OfferingBrowserComponent', () => {
  let component: OfferingBrowserComponent;
  let fixture: ComponentFixture<OfferingBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferingBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferingBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
