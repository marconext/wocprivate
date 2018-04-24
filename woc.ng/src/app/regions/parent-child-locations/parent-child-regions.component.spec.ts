import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ParentChildRegionsComponent } from './parent-child-regions.component';
import { RegionService } from '../region.service';
import { HttpClientModule } from '@angular/common/http';

describe('ParentChildRegionsComponent', () => {
  let component: ParentChildRegionsComponent;
  let fixture: ComponentFixture<ParentChildRegionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ ParentChildRegionsComponent ],
      providers: [RegionService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentChildRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
