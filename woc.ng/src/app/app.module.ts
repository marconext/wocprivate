import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { ProjectListPFComponent } from './projects/project-list/project-list-pf.component';
import { ProjectsService } from './projects/projects.service';
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
import { AuthHttpService } from './shared/services/authHttp.service';
import { CustomersBrowserComponent } from './customers/customers-browser/customers-browser.component';
import { IndustriesBrowserComponent } from './industries/industries-browser/industries-browser.component';
import { FragmentPolyfillModule } from './shared/modules/smooth-scroll-polifill.module';
import { FavoritesComponent } from './favorites/favorites.component';
import { FavoritesService } from './favorites/favorites.service';
import { ProjectNavComponent } from './projects/project-nav/project-nav.component';
import { ProjectFilterComponent } from './projects/project-filter/project-filter.component';
import { ProjectEditorComponent } from './projects/project-editor/project-editor.component';
import { AutocompleteComponent } from './ui/autocomplete/autocomplete.component';
import { IndustryService } from './industries/industry.service';
import { CustomerService } from './customers/customer.service';
import { Autocomplete2Component } from './ui/autocomplete2/autocomplete2.component';
import { OfferingBrowserComponent } from './offerings/offering-browser/offering-browser.component';
import { KeyNameHierarchyHelperService } from './shared/services/key-name-hierarchy-helper.service';
import { HierarchyComponent } from './ui/hierarchy/hierarchy.component';
import { HierarchyTreeViewComponent } from './ui/hierarchy-tree-view/hierarchy-tree-view.component';
import { HierarchyFlatComponent } from './ui/hierarchy-flat/hierarchy-flat.component';
import { ProjectViewComponent } from './projects/project-view/project-view.component';
import { ShellComponent } from './shell/shell.component';

import { ButtonModule, ButtonDirective, Button } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from 'primeng/chips';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TreeModule } from 'primeng/tree';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MessageModule } from 'primeng/message';
import { AccordionModule } from 'primeng/accordion';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { SlideMenuModule } from 'primeng/slidemenu';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PaginatorModule } from 'primeng/paginator';
import {SliderModule} from 'primeng/slider';

import { HierarchyFilterComplexPfComponent } from './ui/hierarchy-filter-complex-pf/hierarchy-filter-complex-pf.component';
import { LabelComponent } from './ui/label/label.component';
import { ProjectsProducerService } from './projects-producer.service';
import { ToastrModule } from 'ngx-toastr';
import { Adal6Service, Adal6HTTPService } from 'adal-angular6';
import { SystemInfoComponent } from './system-info/system-info.component';
import { SystemInfoService } from './system-info/system-info.service';

// tslint:disable-next-line:max-line-length
import { EmployeeAvailabilityItemEditComponent } from './employees/employee-list/employee-availability-item-edit/employee-availability-item-edit.component';
import { EmployeeRolesEditComponent } from './employees/employee-edit/employee-roles-edit/employee-roles-edit.component';
import { EditorComponent } from './role/editor/editor.component';
import { RoleService } from './role/role.service';
import { ContributionGroupService } from './ContributionGroup/contribution-group.service';
import { WorkPlaceComponent } from './work-place/work-place.component';
import { WorkPlaceService } from './work-place/work-place.service';
import { ManagerComponent } from './manager/manager.component';
import { ManagerSelectorComponent } from './manager/manager-selector/manager-selector.component';
import { ManagerService } from './manager/manager.service';
import { EmployeesProducerService } from './employees-producer.service';

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
    AutocompleteComponent,
    Autocomplete2Component,
    OfferingBrowserComponent,
    HierarchyComponent,
    HierarchyTreeViewComponent,
    HierarchyFlatComponent,
    ProjectViewComponent,
    ShellComponent,
    HierarchyFilterComplexPfComponent,
    LabelComponent,
    SystemInfoComponent,
    EmployeeAvailabilityItemEditComponent,
    EmployeeRolesEditComponent,
    EditorComponent,
    WorkPlaceComponent,
    ManagerComponent,
    ManagerSelectorComponent
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
    ToastrModule.forRoot(),
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
    SlideMenuModule,
    ScrollPanelModule,
    PaginatorModule,
    SliderModule
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
    Adal6Service,
    {
      provide: Adal6HTTPService,
      useFactory: Adal6HTTPService.factory,
      deps: [
        HttpClient,
        Adal6Service
      ]
    },    AuthService,
    AuthGuardService,
    AuthHttpService,
    KeyNameHierarchyHelperService,
    ProjectsProducerService,
    EmployeesProducerService,
    SystemInfoService,
    RoleService,
    ContributionGroupService,
    WorkPlaceService,
    ManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
