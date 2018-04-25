import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeService } from './employees/employee.service';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { EmployeeCreateComponent } from './employees/employee-create/employee-create.component';
import { EmployeeSkillsEditComponent } from './employees/employee-edit/employee-skills-edit/employee-skills-edit.component';
import { EmployeeSkillsListComponent } from './employees/employee-detail/employee-skills-list/employee-skills-list.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectListComponent } from './Projects/project-list/project-list.component';
import { LocationsComponent } from './regions/locations.component';
import { ProjectsService } from './projects/projects.service';
// import { LocationService } from './locations/location.service';
// import { FakeLocationDataProviderService } from './shared/services/fake-location-data-provider.service';
import { ParentChildRegionsComponent } from './regions/parent-child-locations/parent-child-regions.component';
import { RegionService } from './regions/region.service';
import { OfferingsComponent } from './offerings/offerings.component';
import { SearchTagBoxComponent } from './search-tag-box/search-tag-box.component';
import { OfferingService } from './offerings/offering.service';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { SkillsComponent } from './skills/skills.component';
import { SkillsBrowserComponent } from './skills/skills-browser/skills-browser.component';
import { SkillsService } from './skills/skills.service';
import { SearchTagBoxService } from './search-tag-box/search-tag-box.service';
import { ProtectedTestComponent } from './protected-test/protected-test.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { AuthService } from './shared/services/auth.service';
import { Adal5Service } from 'adal-angular5/adal5.service';
import { Adal5HTTPService } from 'adal-angular5';
import { AuthHttpService } from './shared/services/authHttp.service';
import { CustomersBrowserComponent } from './customers/customers-browser/customers-browser.component';
import { IndustriesBrowserComponent } from './insustries/industries-browser/industries-browser.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PageNotFoundComponent,
    AboutComponent,
    HomeComponent,
    EmployeeListComponent,
    EmployeeEditComponent,
    EmployeesComponent,
    EmployeeDetailComponent,
    EmployeeCreateComponent,
    EmployeeSkillsEditComponent,
    EmployeeSkillsListComponent,
    ProjectsComponent,
    ProjectListComponent,
    LocationsComponent,
    ParentChildRegionsComponent,
    OfferingsComponent,
    SearchTagBoxComponent,
    ProjectDetailComponent,
    SkillsComponent,
    SkillsBrowserComponent,
    ProtectedTestComponent,
    AuthCallbackComponent,
    CustomersBrowserComponent,
    IndustriesBrowserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    EmployeeService,
    ProjectsService,
    RegionService,
    OfferingService,
    SkillsService,
    SearchTagBoxService,
    Adal5Service,
    {
      provide: Adal5HTTPService,
      useFactory: Adal5HTTPService.factory,
      deps: [
        HttpClient,
        Adal5Service
      ]
    },
    AuthService,
    AuthGuardService,
    AuthHttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
