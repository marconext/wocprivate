import { Component, OnInit } from '@angular/core';
import { ProjectsProducerService } from '../projects-producer.service';
import { environment } from '../../environments/environment';
import { EmployeesProducerService } from '../employees-producer.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

  apiUrl = '';
  dbConnectionStringSecure = '';

  constructor(private projectsProducerService: ProjectsProducerService, private employeesProducerService: EmployeesProducerService) {
  }

  ngOnInit() {
    this.apiUrl = environment.apiUrl;
    const tokens = environment.apiUrl.split(';');
    tokens.forEach(t => {
      if (t.toLowerCase().indexOf('password') >= 0) {
        t = 'password=***********';
      }
    });
    this.dbConnectionStringSecure = tokens.join(';');
  }

  generateProjects(counter: number) {
    this.projectsProducerService.createRandomProjects(counter);
  }

  generateEmployees(counter: number) {
    this.employeesProducerService.createRandomEmployees(counter);
  }
}
