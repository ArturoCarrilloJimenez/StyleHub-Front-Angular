import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

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

  loginForm: FormGroup = this.fb.group(
    {
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
    },
  );

  onSubmit() {
    this.loginForm.markAllAsTouched();
  }
}
