import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonHelper } from 'src/app/core/helpers/common.helper';
import { AuthService } from 'src/app/core/services/auth/auth/auth.service';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VerifyAccountComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  currentUserName: string = '';
  responseMessage: string = '';
  responseFlag: boolean = false;
  isLoading: boolean = true;
  encryptedParamTokenValue: string = '';
  decryptedParamTokenValue: string = '';
  tokenCheckIntervalId: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notificationService: DialogService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.encryptedParamTokenValue = params.get('tokenValue') || '';
      this.decryptedParamTokenValue = this.authService.jwtDecodeToken<string>(
        this.encryptedParamTokenValue
      );
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.encryptedParamTokenValue) {
      this.verifyToken();
    }
    this.verification();
    this.startTokenCheck();
  }

  ngOnDestroy(): void {}

  startTokenCheck() {
    if (this.decryptedParamTokenValue) {
      this.tokenCheckIntervalId = setInterval(() => {
        if (
          this.authService.jwtTokenExpireationChecker(
            this.decryptedParamTokenValue
          )
        ) {
          clearInterval(this.tokenCheckIntervalId);
          this.router.navigate(['/auth']);
        }
      }, 5000);
    }
  }

  verification(): void {
    if (this.encryptedParamTokenValue) {
      this.authService
        .verifyAccount(this.encryptedParamTokenValue)
        .subscribe((res) => {
          if (res) {
            this.handleVerificationResponse(res);
          }
        });
    }
  }

  verifyToken() {
    if (this.encryptedParamTokenValue) {
      this.authService
        .verifyToken(this.encryptedParamTokenValue)
        .subscribe((res) => {
          if (res.isSuccessful == false) {
            this.router.navigate(['/auth']);
          }
        });
    }
  }

  handleVerificationResponse(res: any): void {
    this.isLoading = false;
    this.responseFlag = res.isSuccessful;
    let [message, name] = res.message.split(',');

    this.currentUserName = name?.trim() || res.data?.userName || res.data;
    this.responseMessage = message?.trim() || res.message;

    if (res.isSuccessful) {
      this.authService.publicSetJwtTokenAccess(res.data.token);
    } else {
      this.router.navigate(['/auth']);
    }

    this.notificationService.showMessage(
      this.responseMessage,
      res.isSuccessful
    );
  }
}
