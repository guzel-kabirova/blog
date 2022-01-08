import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';

import {AuthService} from '../admin/shared/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      req = req.clone({
        setParams: {
          ...(this.authService.token) && {auth: this.authService.token},
        },
      });
    }

    return next.handle(req)
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.authService.logout();
          this.router.navigate(['/admin', 'login'], {
            queryParams: {timeout: true},
          });
        }
        return throwError(err);
      }));
  }
}
