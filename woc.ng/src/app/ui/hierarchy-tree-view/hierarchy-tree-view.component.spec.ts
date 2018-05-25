import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyTreeViewComponent } from './hierarchy-tree-view.component';

describe('HierarchyTreeViewComponent', () => {
  let component: HierarchyTreeViewComponent;
  let fixture: ComponentFixture<HierarchyTreeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchyTreeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
