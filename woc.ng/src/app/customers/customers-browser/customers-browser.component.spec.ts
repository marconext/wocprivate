import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersBrowserComponent } from './customers-browser.component';
import { FormsModule } from '@angular/forms';

describe('CustomersBrowserComponent', () => {
  let component: CustomersBrowserComponent;
  let fixture: ComponentFixture<CustomersBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ CustomersBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
