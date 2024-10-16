import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth-guard/canActivate/auth.guard';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';

const routes: Routes = [
  { path: '',
    children : [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: 'signin', component: SignInComponent, canActivate: [AuthGuard] },
      { path: 'signup', component: SignUpComponent, canActivate: [AuthGuard] },
      { path: 'forgot-password', component: ForgotpassComponent, canActivate: [AuthGuard] },
      { path: 'verify-otp/:token/:tokenValue', component: VerifyOtpComponent, canActivate: [AuthGuard] },
      { path: 'reset-password/:token/:tokenValue', component: ResetPasswordComponent, canActivate: [AuthGuard] },
      { path: 'verify-account/:token/:tokenValue', component: VerifyAccountComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
