import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { LoadingCardComponent } from '../../../shared/components/loading/loading.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroKey } from '@ng-icons/heroicons/outline';
import { AlertService } from '../../../utils/services/alert.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgIcon, LoadingCardComponent],
  viewProviders: [provideIcons({ heroKey })],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  private readonly route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  private token = this.route.snapshot.params['token'];

  isLoading = signal<boolean>(false);
  hasError = signal<boolean>(false);

  formUtils = FormUtils;

  resetPasswordForm: FormGroup = this.fb.group(
    {
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.formUtils.passwordPattern),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [this.formUtils.isFieldMatch('password', 'confirmPassword')],
    }
  );

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly alertService: AlertService
  ) {
    this.authService.checkRestarPassword(this.token).subscribe({
      next: (response) => {
        if (response == false) {
          this.router.navigateByUrl('auth/login');
        }
      },
      error: () => {
        this.router.navigateByUrl('auth/login');
      },
    });
  }

  onSubmit() {
    this.resetPasswordForm.markAllAsTouched();

    if (this.resetPasswordForm.valid) {
      this.isLoading.set(true);
      const { password } = this.resetPasswordForm.value;

      this.authService
        .restarPassword({ password }, this.token)
        .subscribe((isPasswordReset) => {
          if (isPasswordReset) {
            this.alertService
              .alert({
                icon: 'success',
                title: 'Password Reset Successful',
                text: 'Your password has been reset successfully. You can now log in with your new password.',
              })
              .then(() => {
                this.router.navigateByUrl('auth/login');
                this.isLoading.set(false);
              });
            this.isLoading.set(false);
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
    return !this.resetPasswordForm.valid;
  }
}
