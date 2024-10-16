import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ResetOtpModel } from 'src/app/core/models/resetOtp.model';
import { AuthService } from 'src/app/core/services/auth/auth/auth.service';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent {
  @ViewChild('ngForgotPassForm') ngForgotPassForm: NgForm;
  forgotPasswordForm: FormGroup;
  isLoading: boolean = false;
  isEmailSelected: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationService: DialogService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.createForgotPassForm();
    this.updateFieldStatus();
  }

  createForgotPassForm(): FormGroup {
    return this.fb.group({});
  }

  toggleSearchMethod() {
    this.isEmailSelected = !this.isEmailSelected;
    this.updateFieldStatus();
  }

  updateFieldStatus() {
    if (this.isEmailSelected) {
      if (!this.forgotPasswordForm.get('userEmail')) {
        this.forgotPasswordForm.addControl(
          'userEmail',
          new FormControl('', [Validators.required, Validators.email])
        );
      }

      if (this.forgotPasswordForm.get('userPhoneNumber')) {
        this.forgotPasswordForm.removeControl('userPhoneNumber');
      }
    } else {
      if (!this.forgotPasswordForm.get('userPhoneNumber')) {
        this.forgotPasswordForm.addControl(
          'userPhoneNumber',
          new FormControl('+92', [
            Validators.required,
            Validators.maxLength(14),
            Validators.minLength(14),
          ])
        );
      }

      if (this.forgotPasswordForm.get('userEmail')) {
        this.forgotPasswordForm.removeControl('userEmail');
      }
    }
  }

  resetForm() {
    this.forgotPasswordForm.reset();
    this.ngForgotPassForm.resetForm();
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      let model: ResetOtpModel = {
        userEmail: this.isEmailSelected
          ? this.forgotPasswordForm.get('userEmail').value
          : null,
        userPhoneNumber: !this.isEmailSelected
          ? this.forgotPasswordForm.get('userPhoneNumber').value
          : null,
      };
      this.isLoading = true;
        this.authService.forgotPasswordAuth(model).subscribe((res) => {
          this.isLoading = false;
          if (res.isSuccessful) {
            this.resetForm();
            this.isEmailSelected = true;
            this.updateFieldStatus();
            this.router.navigate([`/auth/verify-otp/${res.data}`]);
          }
          this.notificationService.showMessage(res.message, res.isSuccessful);
        });
    } else {
      Object.keys(this.forgotPasswordForm.controls).forEach((key) => {
        const control = this.forgotPasswordForm.get(key);
        if (control.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
