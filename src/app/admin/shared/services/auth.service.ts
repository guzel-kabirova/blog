import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {FbAuthResponse, User} from '../../../shared/interfaces';

const API_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

@Injectable({providedIn: 'root'})
export class AuthService {
  public error$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  get token(): string | null {
    const expiresStr = localStorage.getItem('fb-token-expires');
    if (expiresStr) {
      const expiresData = new Date(expiresStr);
      if (new Date() > expiresData) {
        this.logout();
        return null;
      } else {
        return localStorage.getItem('fb-token');
      }
    }
    return null;
  }

  login(user: User): Observable<FbAuthResponse> {
    const payload: User = { ...user, returnSecureToken: true};
    return this.http.post<FbAuthResponse>(API_URL + environment.apiKey, payload)
      .pipe(tap(res => this.setToken(res)), catchError(err => {
        return this.handleError(err);
      }));
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
      const expiresDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-expires', expiresDate.toString());
    } else {
      localStorage.clear();
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const {message} = error.error.error;
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такой почты не существует');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Пароль недействителен');
        break;
      case 'USER_DISABLED':
        this.error$.next('Такой пользователь не зарегистрирован');
        break;
    }
    return throwError(error);
  }
}
