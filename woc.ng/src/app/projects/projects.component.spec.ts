import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';
import { ParentChildRegionsComponent } from '../regions/parent-child-locations/parent-child-regions.component';
import { OfferingFilterComponent } from '../offerings/offering-filter/offering-filter.component';
import { SkillsBrowserComponent } from '../skills/skills-browser/skills-browser.component';
import { SearchTagBoxComponent } from '../search-tag-box/search-tag-box.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { FormsModule } from '@angular/forms';
import { ProjectsService } from './projects.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchTagBoxService } from '../search-tag-box/search-tag-box.service';
import { RegionService } from '../regions/region.service';
import { OfferingService } from '../offerings/offering.service';
import { SkillsService } from '../skills/skills.service';
import { CustomersBrowserComponent } from '../customers/customers-browser/customers-browser.component';
import { IndustriesBrowserComponent } from '../industries/industries-browser/industries-browser.component';


describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [
        ProjectsComponent,
        ParentChildRegionsComponent,
        OfferingFilterComponent,
        SkillsBrowserComponent,
        SearchTagBoxComponent,
        ProjectListComponent,
        CustomersBrowserComponent,
        ProjectDetailComponent,
        IndustriesBrowserComponent
      ],
      providers: [ProjectsService, RegionService, OfferingService, SkillsService,  SearchTagBoxService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
