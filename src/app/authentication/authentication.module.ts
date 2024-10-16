import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { CommonHelper } from '../core/helpers/common.helper';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    VerifyAccountComponent,
    ForgotpassComponent,
    VerifyOtpComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRoutingModule
  ],
  providers: [
    CommonHelper
  ]
})
export class AuthenticationModule { }
