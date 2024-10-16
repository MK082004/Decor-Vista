import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonHelper } from 'src/app/core/helpers/common.helper';
import { ResetPasswordModel } from 'src/app/core/models/resetPassword.model';
import { AuthService } from 'src/app/core/services/auth/auth/auth.service';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('ngResetPassForm') ngResetPassForm: NgForm;
  resetPasswordForm: FormGroup;
  isLoading: boolean = false;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  encryptedParamTokenValue: string = '';
  decryptedParamTokenValue: string = '';
  tokenCheckIntervalId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notificationService: DialogService
  )
  {
    this.route.paramMap.subscribe((params) => {
      this.encryptedParamTokenValue = params.get('tokenValue') || '';
      this.decryptedParamTokenValue = this.authService.jwtDecodeToken<string>(this.encryptedParamTokenValue);
    });
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.createResetPassForm();
    this.startTokenCheck();
    if (this.encryptedParamTokenValue) {
      this.verifyToken();
    }
  }

  createResetPassForm(): FormGroup {
    return this.fb.group({
      newPassword: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()!?\[\]])[A-Za-z\d@#$%^&*()!?\[\]]+$/),
        Validators.minLength(5),
        Validators.maxLength(15)
      ]],
      newConfirmPassword: ['', [
        Validators.required
      ]]
    });
  }

  resetForm() {
    this.resetPasswordForm.reset();
    this.ngResetPassForm.resetForm();
  }

  startTokenCheck() {
    if (this.decryptedParamTokenValue) {
      this.tokenCheckIntervalId = setInterval(() => {
        if (this.authService.jwtTokenExpireationChecker(this.decryptedParamTokenValue)) {
          clearInterval(this.tokenCheckIntervalId);
          this.router.navigate(['/auth']);
        }
      }, 5000);
    }
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.isLoading = true;
      const newPassword = this.resetPasswordForm.controls['newPassword'].value;
      const userEmail = this.decryptedParamTokenValue['email'] || null;
      const userPhoneNumber = this.decryptedParamTokenValue['phoneNumber'] || null;
      let model: ResetPasswordModel = {
        userEmail: userEmail,
        userPhoneNumber: userPhoneNumber,
        newPassword: newPassword
      };
        this.authService.resetPassword(model).subscribe((res) => {
          this.isLoading = false;
          if (res.isSuccessful) {
            this.resetForm();
          }
          this.router.navigate(['/auth']);
          this.notificationService.showMessage(res.message, res.isSuccessful);
        });
    } else {
      Object.keys(this.resetPasswordForm.controls).forEach((key) => {
        const control = this.resetPasswordForm.get(key);
        if (control.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  verifyToken() {
    if (this.encryptedParamTokenValue) {
        this.authService.verifyToken(this.encryptedParamTokenValue).subscribe((res) => {
          if (res.isSuccessful == false) {
            this.router.navigate(['/auth']);
          }
        });
    }
  }
}
