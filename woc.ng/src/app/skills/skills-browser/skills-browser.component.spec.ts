import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsBrowserComponent } from './skills-browser.component';

describe('SkillsBrowserComponent', () => {
  let component: SkillsBrowserComponent;
  let fixture: ComponentFixture<SkillsBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
