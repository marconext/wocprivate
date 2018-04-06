import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentChildLocationsComponent } from './parent-child-locations.component';

describe('ParentChildLocationsComponent', () => {
  let component: ParentChildLocationsComponent;
  let fixture: ComponentFixture<ParentChildLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentChildLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentChildLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
