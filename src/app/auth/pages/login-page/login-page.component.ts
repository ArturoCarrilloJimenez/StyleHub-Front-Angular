import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { FormUtils } from '../../../utils/form-utils';
import { AuthService } from '../../auth.service';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroEnvelope, heroKey } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIcon],
  viewProviders: [provideIcons({ heroEnvelope, heroKey })],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  hasError = signal<boolean>(false);

  formUtils = FormUtils;
  emailPater = this.formUtils.emailPattern;

  // TODO realizar validación asíncrona para email
  loginForm: FormGroup = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.pattern(this.formUtils.emailPattern)],
    ],
    password: ['', [Validators.required]],
    rememberLogin: [false],
  });

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  onSubmit() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      const { email, password, rememberLogin } = this.loginForm.value;

      this.authService
        .login({ email, password }, rememberLogin)
        .subscribe((isAuthenticated) => {
          if (isAuthenticated) {
            this.router.navigateByUrl('/');
            return;
          }

          this.hasError.set(true);
          setTimeout(() => {
            this.hasError.set(false);
          }, 5000);
        });
    }
  }

  public get isValidForm(): boolean {
    return !this.loginForm.valid;
  }
}
