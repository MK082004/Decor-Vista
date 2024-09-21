import { DialogService } from './../../core/services/dialog/dialog.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/core/models/login.model';
import { AuthService } from 'src/app/core/services/auth/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private notificationService: DialogService) {
    this.signInForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.signInForm.valid) {
      const formValues = this.signInForm.getRawValue();
      let model: LoginModel = {
        userEmail: formValues.usernameOrEmail,
        userPassword: formValues.userPassword
      }
      this.authService.loginUser(model).subscribe(res => {
        if (res) {
          this.notificationService.showNotification(res.message, res.isSuccessfull);
        }
      });
    }
  }
}
