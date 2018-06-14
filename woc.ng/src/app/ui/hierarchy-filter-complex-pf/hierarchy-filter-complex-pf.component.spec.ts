import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyFilterComplexPfComponent } from './hierarchy-filter-complex-pf.component';

describe('HierarchyFilterComplexPfComponent', () => {
  let component: HierarchyFilterComplexPfComponent;
  let fixture: ComponentFixture<HierarchyFilterComplexPfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchyFilterComplexPfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyFilterComplexPfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
