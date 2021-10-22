import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLayoutComponent {

  isAuth() {
    return this.authService.isAuthenticated()
  };
  constructor(private router: Router,
              private authService: AuthService) { }

  logout($event: Event) {
    $event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/admin', 'login'])
  }
}
