import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

  menuItems: MenuItem[];

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.menuItems = [
      {
        label: 'HOME',
        routerLink: '/home',
      },
      {
        label: 'PROJECTS',
        routerLink: '/projects',
      },
      {
        label: 'EMPLOYEES',
        routerLink: '/employees',
        badge: '3'
      },
      {
        label: 'ABOUT',
        routerLink: '/about',
      },
      {
        label: 'PROTECTED',
        routerLink: '/protected-test'
      }
    ];
  }
}
