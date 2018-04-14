import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTagBoxComponent } from './search-tag-box.component';

describe('SearchTagBoxComponent', () => {
  let component: SearchTagBoxComponent;
  let fixture: ComponentFixture<SearchTagBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTagBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTagBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
