import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { LoginResponse } from './interfaces/login-response.interface';
import { environment } from '../../environments/environments';
import { User } from './interfaces/user.interface';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = environment.baseUrl

  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(
    localStorage.getItem('token') ?? sessionStorage.getItem('token')
  );

  constructor(private readonly http: HttpClient) {}

  loginUser(form: { email: string; password: string }) {
    return this.http.post<LoginResponse>(this.URL + 'auth/login', form).pipe(
      tap((resp) => {
        sessionStorage.setItem('token', resp.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token');
  }
}
