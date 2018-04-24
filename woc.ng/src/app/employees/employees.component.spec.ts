// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { EmployeesComponent } from './employees.component';
// import { EmployeeListComponent } from './employee-list/employee-list.component';
// import { EmployeeCreateComponent } from './employee-create/employee-create.component';
// import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
// import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
// import { FormsModule } from '@angular/forms';
// import { EmployeeSkillsListComponent } from './employee-detail/employee-skills-list/employee-skills-list.component';
// import { EmployeeService } from './employee.service';
// import { HttpClient, HttpHandler } from '@angular/common/http';
// import { AuthHttpService } from '../shared/services/authHttp.service';
// import { Adal5Service, Adal5HTTPService } from 'adal-angular5';

// describe('EmployeesComponent', () => {
//   let component: EmployeesComponent;
//   let fixture: ComponentFixture<EmployeesComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [FormsModule],
//       declarations: [ EmployeesComponent, EmployeeListComponent, EmployeeCreateComponent, EmployeeEditComponent,
//         EmployeeDetailComponent, EmployeeSkillsListComponent ],
//         providers: [EmployeeService, HttpClient, HttpHandler, AuthHttpService, Adal5Service,
//           {
//             provide: Adal5HTTPService,
//             useFactory: Adal5HTTPService.factory,
//             deps: [
//               HttpClient,
//               Adal5Service
//             ]
//           }]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(EmployeesComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
