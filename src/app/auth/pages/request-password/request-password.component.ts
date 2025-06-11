import { Component, inject, signal } from '@angular/core';
import { FormUtils } from '../../../utils/form-utils';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoadingCardComponent } from '../../../shared/components/loading/loading.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroEnvelope } from '@ng-icons/heroicons/outline';
import { AlertService } from '../../../utils/services/alert.service';

@Component({
  selector: 'app-request-password',
  imports: [RouterLink, ReactiveFormsModule, NgIcon, LoadingCardComponent],
  viewProviders: [provideIcons({ heroEnvelope })],
  templateUrl: './request-password.component.html',
  styleUrl: './request-password.component.scss',
})
export class RequestPasswordComponent {
  private fb = inject(FormBuilder);
  hasError = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  formUtils = FormUtils;
  emailPater = this.formUtils.emailPattern;

  // TODO realizar validación asíncrona para email
  requestPasswordResetForm: FormGroup = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.pattern(this.formUtils.emailPattern)],
    ],
  });

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly alertService: AlertService
  ) {
    console.log(document.documentElement.getAttribute('data-theme'));
  }

  onSubmit() {
    this.requestPasswordResetForm.markAllAsTouched();

    if (this.requestPasswordResetForm.valid) {
      this.isLoading.set(true);
      const { email } = this.requestPasswordResetForm.value;

      this.authService.forgotPassword({ email }).subscribe((isSendEmail) => {
        if (isSendEmail) {
          this.alertService
            .alert({
              icon: 'success',
              title: 'Email sent',
              text: 'Please check your inbox to reset your password.',
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
    return !this.requestPasswordResetForm.valid;
  }
}
