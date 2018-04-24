import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';
import { ParentChildRegionsComponent } from '../regions/parent-child-locations/parent-child-regions.component';
import { OfferingsComponent } from '../offerings/offerings.component';
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


describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [
        ProjectsComponent,
        ParentChildRegionsComponent,
        OfferingsComponent,
        SkillsBrowserComponent,
        SearchTagBoxComponent,
        ProjectListComponent,
        ProjectDetailComponent
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
