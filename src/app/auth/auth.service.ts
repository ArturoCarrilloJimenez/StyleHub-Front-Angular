import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AuthResponse } from './interfaces/auth-response.interface';
import { environment } from '../../environments/environments';
import { User } from './interfaces/user.interface';
import { rxResource } from '@angular/core/rxjs-interop';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = environment.baseUrl;

  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(
    localStorage.getItem('token') ?? sessionStorage.getItem('token')
  );
  private _rememberLogin = signal<boolean>(false);

  authStatus = computed(() => this._authStatus());
  user = computed(() => this._user());
  token = computed(() => this._token());

  checkStatusResource = rxResource({
    loader: () => this.checkStatus(),
  });

  constructor(private readonly http: HttpClient) {}

  login(form: { email: string; password: string }, rememberLogin: boolean) {
    return this.handleAuthRequest('auth/login', form, rememberLogin);
  }

  register(
    form: { email: string; password: string; fullName: string },
    rememberLogin: boolean
  ) {
    return this.handleAuthRequest('auth/', form, rememberLogin);
  }

  forgotPassword(form: { email: string }) {
    return this.http
      .post<{ sendEmail: boolean }>(`${this.baseUrl}auth/reset-password`, form)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  checkRestarPassword(id: string) {
    return this.http
      .get<{ modifyPassword: boolean }>(
        `${this.baseUrl}auth/reset-password/${id}`
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  restarPassword(form: { password: string }, id: string) {
    return this.http
      .post<{ modifyPassword: boolean }>(
        `${this.baseUrl}auth/reset-password/${id}`,
        form
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  checkStatus(): Observable<boolean> {
    const token =
      localStorage.getItem('token') ?? sessionStorage.getItem('token');
    if (!token) return of(false);

    return this.http.get<AuthResponse>(`${this.baseUrl}auth/check-status`).pipe(
      tap((resp) => this.handleLoginSuccess(resp, this._rememberLogin())),
      map(() => true),
      catchError(() => {
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

  private handleAuthRequest(
    endpoint: string,
    data: any,
    rememberLogin: boolean
  ) {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}${endpoint}`, data)
      .pipe(
        tap((resp) => this.handleLoginSuccess(resp, rememberLogin)),
        map(() => true),
        catchError((err) => {
          console.error(err);
          this.logout();
          return of(false);
        })
      );
  }

  private handleLoginSuccess(resp: AuthResponse, rememberLogin: boolean) {
    this._user.set(resp.user);
    this._token.set(resp.token);
    this._authStatus.set('authenticated');
    this._rememberLogin.set(rememberLogin);

    rememberLogin
      ? localStorage.setItem('token', resp.token)
      : sessionStorage.setItem('token', resp.token);
  }
}
