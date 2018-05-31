import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { CrisisListComponent } from './crisis-list.component';
// import { HeroListComponent } from './hero-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { EmployeesComponent } from './employees/employees.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProtectedTestComponent } from './protected-test/protected-test.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProjectFilterComponent } from './projects/project-filter/project-filter.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { ProjectCreateComponent } from './projects/project-create/project-create.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectViewComponent } from './projects/project-view/project-view.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'filter' },
      { path: 'filter', component: ProjectFilterComponent},
      { path: 'favorites', component: FavoritesComponent },
      { path: 'create', component: ProjectCreateComponent },
      { path: 'create/:id', component: ProjectCreateComponent },
      { path: 'detail/:id', component: ProjectViewComponent }
    ]
  },
  { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuardService] },
  { path: 'about', component: AboutComponent },
  { path: 'protected-test', component: ProtectedTestComponent, canActivate: [AuthGuardService] },
  { path: 'auth-callback', component: AuthCallbackComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
