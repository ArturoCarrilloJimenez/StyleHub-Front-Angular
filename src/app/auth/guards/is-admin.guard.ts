import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export const IsAdminGuard: CanActivateFn = async (route, state) => {
    const authService = inject(AuthService);

    const router = inject(Router);

    const isAuthenticated = await firstValueFrom(authService.checkStatus());
    const user = authService.user();

    if (!isAuthenticated) {
      router.navigateByUrl('/');
      return false;
    }

    if (!user?.roles.find((role) => role == 'admin')) {
      router.navigateByUrl('/');
      return false;
    }

    return true;
};
