import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ProjectsProducerService } from '../projects-producer.service';

@Component({
  selector: 'app-protected-test',
  templateUrl: './protected-test.component.html',
})
export class ProtectedTestComponent implements OnInit {
  name: String = '';

  constructor(private _authService: AuthService, private projectsProducerService: ProjectsProducerService) { }

  ngOnInit() {
      this.name = this._authService.getName();
  }

  public signout(): void {
    this._authService.signout();
  }

}
