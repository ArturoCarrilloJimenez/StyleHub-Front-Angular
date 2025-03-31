import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);

  formUtils = FormUtils;

  loginForm: FormGroup = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.pattern(this.formUtils.emailPattern)],
      [FormUtils.checkingServerResponse],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(this.formUtils.notOnlySpacesPattern),
      ],
    ],
    rememberMe: [false],
  });

  constructor(private readonly authService: AuthService) {}

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const email = this.loginForm.controls['email'].value;
      const password = this.loginForm.controls['password'].value;

      this.authService
        .loginUser({ email, password })
        .subscribe((res) => console.log(res));
    }
  }
}
