import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CommonHelper } from 'src/app/core/helpers/common.helper';
import { LoginModel } from 'src/app/core/models/login.model';
import { AuthService } from 'src/app/core/services/auth/auth/auth.service';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SignInComponent implements OnInit {
  @ViewChild('ngSigInForm') ngSigInForm: NgForm;
  signInForm: FormGroup;
  hidePassword: boolean = true;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private notificationService: DialogService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signInForm = this.createSigInForm();
  }

  createSigInForm(): FormGroup {
    return this.fb.group({
      usernameOrEmail: ['', [Validators.required, Validators.email]],
      userPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()!?\[\]])[A-Za-z\d@#$%^&*()!?\[\]]+$/
          ),
          Validators.minLength(5),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  resetForm() {
    this.signInForm.reset();
    this.ngSigInForm.resetForm();
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const formValues = this.signInForm.getRawValue();
      let model: LoginModel = {
        usernameOrEmail: formValues.usernameOrEmail,
        userPassword: formValues.userPassword,
      };
      this.isLoading = true;
      this.authService.loginUser(model).subscribe((res) => {
        this.isLoading = false;
        if (res.isSuccessful) {
          this.resetForm();
        }
        this.notificationService.showMessage(res.message, res.isSuccessful);
      });
    } else {
      Object.keys(this.signInForm.controls).forEach((key) => {
        const control = this.signInForm.get(key);
        if (control.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
