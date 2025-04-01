import { HttpHandlerFn, HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn) {
  const authToken = inject(AuthService).token();

  const authReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${authToken}`),
  });

  return next(authReq);
}
