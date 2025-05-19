import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { FormUtils } from '../../../utils/form-utils';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroEnvelope, heroKey, heroUser } from '@ng-icons/heroicons/outline';
import { LoadingCardComponent } from "../../../shared/components/loading/loading.component";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIcon, LoadingCardComponent],
  viewProviders: [provideIcons({ heroEnvelope, heroKey, heroUser })],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  hasError = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  formUtils = FormUtils;

  // TODO realizar validación asíncrona para email y fullname
  registerForm: FormGroup = this.fb.group(
    {
      email: [
        '',
        [Validators.required, Validators.pattern(this.formUtils.emailPattern)],
      ],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.formUtils.passwordPattern),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
      rememberLogin: [false],
    },
    {
      validators: [this.formUtils.isFieldMatch('password', 'confirmPassword')],
    }
  );

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  onSubmit() {
    this.registerForm.markAllAsTouched();

    console.log(this.registerForm.controls);

    if (this.registerForm.valid) {
      this.isLoading.set(true);
      const { rememberLogin, confirmPassword, ...data } =
        this.registerForm.value;

      console.log('data valid');

      this.authService
        .register({ ...data }, rememberLogin)
        .subscribe((isAuthenticated) => {
          if (isAuthenticated) {
            this.router.navigateByUrl('/');
            return;
          }

          this.isLoading.set(false);
          this.hasError.set(true);
          setTimeout(() => {
            this.hasError.set(false);
          }, 5000);
        });
    }
  }

  public get isValidForm(): boolean {
    return !this.registerForm.valid;
  }
}
