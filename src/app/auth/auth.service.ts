import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AuthResponse } from './interfaces/auth-response.interface';
import { environment } from '../../environments/environments';
import { User } from './interfaces/user.interface';
import { rxResource } from '@angular/core/rxjs-interop';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = environment.baseUrl;

  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(
    localStorage.getItem('token') ?? sessionStorage.getItem('token')
  );
  private _rememberLogin = signal<boolean>(false);

  constructor(private readonly http: HttpClient) {}

  login(form: { email: string; password: string }, rememberLogin: boolean) {
    return this.http.post<AuthResponse>(this.URL + 'auth/login', form).pipe(
      tap((resp) => {
        this.handleLoginSuccess(resp, rememberLogin);
      }),
      map(() => true),
      catchError((error: any) => {
        this.logout();
        return of(false);
      })
    );
  }

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';

    if (this._user()) return 'authenticated';

    return 'not-authenticated';
  });

  user = computed<User | null>(() => this._user());
  token = computed<string | null>(() => this._token());

  checkStatusResource = rxResource({
    loader: () => this.checkStatus(),
  });

  checkStatus(): Observable<boolean> {
    let token = localStorage.getItem('token');

    if (!token) token = sessionStorage.getItem('token');

    if (!token) return of(false);

    return this.http.get<AuthResponse>(this.URL + 'auth/check-status').pipe(
      tap((resp) => {
        this.handleLoginSuccess(resp, this._rememberLogin());
      }),
      map(() => true),
      catchError((error: any) => {
        this.logout();
        return of(false);
      })
    );
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }

  private handleLoginSuccess(resp: AuthResponse, rememberLogin: boolean) {
    this._user.set(resp.user);
    this._token.set(resp.token);
    this._authStatus.set('authenticated');
    this._rememberLogin.set(rememberLogin);
    this._rememberLogin()
      ? localStorage.setItem('token', resp.token)
      : sessionStorage.setItem('token', resp.token);
  }
}
