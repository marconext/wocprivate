import { Component, OnInit } from '@angular/core';
import { ProjectsProducerService } from '../projects-producer.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

  constructor(private projectsProducerService: ProjectsProducerService) {
  }

  ngOnInit() {
  }

  generateProjects(counter: number) {
    alert(counter);
    this.projectsProducerService.createRandomProjects(counter);
  }
}
