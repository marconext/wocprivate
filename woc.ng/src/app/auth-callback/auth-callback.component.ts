import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html'
})

export class AuthCallbackComponent implements OnInit {

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _zone: NgZone,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this._authService.completeAuthentication();

    setTimeout(() => {
      this._zone.run(
        () => this._router.navigate(['/protected-test'])
      );
    }, 200);
  }
}
