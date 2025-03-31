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
    ],
    password: [
      '',
      [
        Validators.required,
      ],
    ],
    rememberLogin: [false],
  });

  constructor(private readonly authService: AuthService) {}

  onSubmit() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      const { email, password, rememberLogin } = this.loginForm.value;

      this.authService
        .loginUser({ email, password }, rememberLogin)
        .subscribe((res) => console.log(res));
    }
  }
}
