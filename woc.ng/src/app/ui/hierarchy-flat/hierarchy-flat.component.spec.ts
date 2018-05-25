import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyFlatComponent } from './hierarchy-flat.component';

describe('HierarchyFlatComponent', () => {
  let component: HierarchyFlatComponent;
  let fixture: ComponentFixture<HierarchyFlatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchyFlatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyFlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
