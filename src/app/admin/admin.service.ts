import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class ServiceNameService {

  constructor(
    private httpClient: HttpClient,
    private readonly authService: AuthService
  ) {}
}
