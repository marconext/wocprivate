import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ToastModule } from 'ng2-toastr/ng2-toastr';

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
// import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectListPFComponent } from './projects/project-list/project-list-pf.component';
import { LocationsComponent } from './regions/locations.component';
import { ProjectsService } from './projects/projects.service';
// import { LocationService } from './locations/location.service';
// import { FakeLocationDataProviderService } from './shared/services/fake-location-data-provider.service';
import { ParentChildRegionsComponent } from './regions/parent-child-locations/parent-child-regions.component';
import { RegionService } from './regions/region.service';
import { OfferingFilterComponent } from './offerings/offering-filter/offering-filter.component';
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
import { IndustriesBrowserComponent } from './industries/industries-browser/industries-browser.component';
import { FragmentPolyfillModule } from './shared/modules/smooth-scroll-polifill.module';
import { FavoritesComponent } from './favorites/favorites.component';
import { FavoritesService } from './favorites/favorites.service';
import { ProjectNavComponent } from './projects/project-nav/project-nav.component';
import { ProjectFilterComponent } from './projects/project-filter/project-filter.component';
import { ProjectEditorComponent } from './projects/project-editor/project-editor.component';
// import { AutocompleteComponent } from './ui/autocomplete/autocomplete.component';
import { IndustryService } from './industries/industry.service';
import { CustomerService } from './customers/customer.service';
// import { Autocomplete2Component } from './ui/autocomplete2/autocomplete2.component';
import { OfferingBrowserComponent } from './offerings/offering-browser/offering-browser.component';
import { KeyNameHierarchyHelperService } from './shared/services/key-name-hierarchy-helper.service';
import { HierarchyComponent } from './ui/hierarchy/hierarchy.component';
// import { HierarchyTreeViewComponent } from './ui/hierarchy-tree-view/hierarchy-tree-view.component';
// import { HierarchyFlatComponent } from './ui/hierarchy-flat/hierarchy-flat.component';
import { ProjectViewComponent } from './projects/project-view/project-view.component';
import { ShellComponent } from './shell/shell.component';

import {ButtonModule, ButtonDirective, Button} from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import {DropdownModule} from 'primeng/dropdown';
import {ChipsModule} from 'primeng/chips';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {TreeModule} from 'primeng/tree';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {MessageModule} from 'primeng/message';
import {AccordionModule} from 'primeng/accordion';
import {TabMenuModule} from 'primeng/tabmenu';
import {TabViewModule} from 'primeng/tabview';
import {PanelModule} from 'primeng/panel';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {CardModule} from 'primeng/card';

import {SlideMenuModule} from 'primeng/slidemenu';


import { HierarchyFilterComplexPfComponent } from './ui/hierarchy-filter-complex-pf/hierarchy-filter-complex-pf.component';
import { LabelComponent } from './ui/label/label.component';






@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PageNotFoundComponent,
    AboutComponent,
    HomeComponent,
    FavoritesComponent,
    EmployeeListComponent,
    EmployeeEditComponent,
    EmployeesComponent,
    EmployeeDetailComponent,
    EmployeeCreateComponent,
    EmployeeSkillsEditComponent,
    EmployeeSkillsListComponent,
    ProjectsComponent,
    // ProjectListComponent,
    ProjectListPFComponent,
    ProjectNavComponent,
    ProjectFilterComponent,
    LocationsComponent,
    ParentChildRegionsComponent,
    OfferingFilterComponent,
    SearchTagBoxComponent,
    ProjectDetailComponent,
    SkillsComponent,
    SkillsBrowserComponent,
    ProtectedTestComponent,
    AuthCallbackComponent,
    CustomersBrowserComponent,
    IndustriesBrowserComponent,
    ProjectEditorComponent,
    // AutocompleteComponent,
    // Autocomplete2Component,
    OfferingBrowserComponent,
    HierarchyComponent,
    // HierarchyTreeViewComponent,
    // HierarchyFlatComponent,
    ProjectViewComponent,
    ShellComponent,
    HierarchyFilterComplexPfComponent,
    LabelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    FragmentPolyfillModule.forRoot({
      smooth: true
    }),
    ToastModule.forRoot(),
    // PrimeFace Modules
    ButtonModule,
    MenubarModule,
    DropdownModule,
    ChipsModule,
    AutoCompleteModule,
    TreeModule,
    OverlayPanelModule,
    MessageModule,
    AccordionModule,
    TabMenuModule,
    TabViewModule,
    PanelModule,
    TieredMenuModule,
    TableModule,
    DialogModule,
    CardModule,
    SlideMenuModule

  ],
  providers: [
    FavoritesService,
    EmployeeService,
    ProjectsService,
    RegionService,
    OfferingService,
    SkillsService,
    IndustryService,
    CustomerService,
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
    AuthHttpService,
    KeyNameHierarchyHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
