import { CryptoService } from './../../core/services/auth/crypto/crypto.service';
import { CommonHelper } from '../../core/helpers/common.helper';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  NgForm,
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ResetOtpModel } from 'src/app/core/models/resetOtp.model';
import { VerifyOtpModel } from 'src/app/core/models/verifyOtp.model';
import { AuthService } from 'src/app/core/services/auth/auth/auth.service';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VerifyOtpComponent implements OnInit {
  @ViewChild('ngVerifyOtpForm') ngVerifyOtpForm: NgForm;
  private readonly otpTimerKey = 'otpTimer';
  verifyOtpForm: FormGroup;
  isLoading: boolean = false;
  encryptedParamTokenValue: string = '';
  decryptedParamTokenValue: string = '';
  maskedValue: string = '';
  countdown: number = 60;
  intervalId: any;
  canResendOtp: boolean = false;
  unsubscribe$: Subject<void> = new Subject<void>();
  tokenCheckIntervalId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: DialogService,
    private authService: AuthService,
    private cryptoService: CryptoService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.encryptedParamTokenValue = params.get('tokenValue') || '';
      this.decryptedParamTokenValue = this.authService.jwtDecodeToken<string>(
        this.encryptedParamTokenValue
      );
    });
  }

  ngOnInit(): void {
    this.verifyOtpForm = this.createVerifyOtpForm();
    if (this.decryptedParamTokenValue) {
      this.maskedValue = this.maskToken(this.decryptedParamTokenValue);
    }
    this.startCountdown();
    this.startTokenCheck();
    if (this.encryptedParamTokenValue) {
      this.verifyToken();
    }
  }

  startCountdown() {
    // Retrieve the encrypted timer value from session storage
    const storedTime = this.getEncryptedSessionStorage(this.otpTimerKey);

    this.canResendOtp = false;

    // If a timer exists, use that countdown value
    if (storedTime && parseInt(storedTime, 10) > 0) {
      this.countdown = parseInt(storedTime, 10);
    } else {
      // If no stored timer or the time has expired, start a new timer
      this.countdown = 60;
    }

    // Ensure no interval is already running
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    // Start the countdown
    this.intervalId = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
        // Save the updated countdown in session storage
        this.saveEncryptedSessionStorage(
          this.otpTimerKey,
          this.countdown.toString()
        );
      }

      if (this.countdown <= 0) {
        this.canResendOtp = true;
        clearInterval(this.intervalId);
        // Remove the timer from session storage after it reaches 0
        sessionStorage.removeItem(
          this.getEncryptedSessionKey(this.otpTimerKey)
        );
      }
    }, 1000);
  }

  saveEncryptedSessionStorage(key: string, value: string) {
    const encryptedKey = this.cryptoService.encrypt(key);
    const encryptedValue = this.cryptoService.encrypt(value);
    sessionStorage.setItem(encryptedKey, encryptedValue);
  }

  getEncryptedSessionKey(key: string): string {
    const encryptedKey = this.cryptoService.encrypt(key);
    if (encryptedKey) {
      return this.cryptoService.decrypt(encryptedKey);
    }
  }

  getEncryptedSessionStorage(key: string): string {
    const encryptedKey = this.cryptoService.encrypt(key);
    const encryptedValue = sessionStorage.getItem(encryptedKey);
    if (encryptedValue) {
      return this.cryptoService.decrypt(encryptedValue);
    }
  }

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

  ngOnDestroy() {
    clearInterval(this.intervalId);
    clearInterval(this.tokenCheckIntervalId);
    sessionStorage.removeItem(this.getEncryptedSessionKey(this.otpTimerKey));
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  maskToken(token: string): string {
    if (token['email']) {
      const emailParts = token['email'].split('@');
      const emailName = emailParts[0];
      const maskedEmailName = emailName.slice(0, 2) + '*******';
      return maskedEmailName + '@' + emailParts[1];
    } else if (token['phoneNumber']) {
      return (
        token['phoneNumber'].slice(0, 3) +
        '*******' +
        token['phoneNumber'].slice(-2)
      );
    } else {
      return token;
    }
  }

  createVerifyOtpForm(): FormGroup {
    return this.fb.group({
      otp: this.fb.array([
        this.fb.control('', [Validators.required]),
        this.fb.control('', [Validators.required]),
        this.fb.control('', [Validators.required]),
        this.fb.control('', [Validators.required]),
        this.fb.control('', [Validators.required]),
        this.fb.control('', [Validators.required]),
      ]),
    });
  }

  get otpControls() {
    return (this.verifyOtpForm.get('otp') as FormArray).controls;
  }

  selectInput(index: number) {
    const inputElement = document.getElementById(
      `otp-input-${index}`
    ) as HTMLInputElement;
    if (inputElement) {
      setTimeout(() => {
        inputElement.select();
      }, 0);
    }
  }

  resetForm() {
    this.verifyOtpForm.reset();
    this.ngVerifyOtpForm.resetForm();
  }

  onSubmit() {
    if (this.decryptedParamTokenValue) {
      if (this.verifyOtpForm.valid) {
        const otp = this.verifyOtpForm.value.otp.join('');
        const tokenType =
          (this.decryptedParamTokenValue['email'] ? 'email' : null) ||
          (this.decryptedParamTokenValue['phoneNumber'] ? 'phoneNumber' : null);
        let model: VerifyOtpModel = {
          token: this.encryptedParamTokenValue,
          tokenType: tokenType,
          Otp: otp,
        };
        this.authService.verifyOtp(model).subscribe((res) => {
          this.isLoading = false;
          if (res.isSuccessful) {
            this.resetForm();
            this.router.navigate([
              `/auth/reset-password/${this.encryptedParamTokenValue}`,
            ]);
            this.notificationService.showMessage(res.message, res.isSuccessful);
          } else {
            this.notificationService.showMessage(res.message, res.isSuccessful);
          }
        });
      } else {
        Object.keys(this.verifyOtpForm.controls).forEach((key) => {
          const control = this.verifyOtpForm.get(key);
          if (control instanceof FormArray) {
            control.controls.forEach((ctrl) => ctrl.markAsTouched());
          } else {
            control.markAsTouched();
          }
        });
      }
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

  resendOtp() {
    this.isLoading = true;
    const userEmail = this.decryptedParamTokenValue['email'] || null;
    const userPhoneNumber =
      this.decryptedParamTokenValue['phoneNumber'] || null;
    let model: ResetOtpModel = {
      userEmail: userEmail,
      userPhoneNumber: userPhoneNumber,
    };
    this.authService.forgotPasswordAuth(model).subscribe((res) => {
      this.isLoading = false;
      this.resetForm();
      if (res.isSuccessful) {
        this.canResendOtp = false;
        sessionStorage.removeItem(
          this.getEncryptedSessionKey(this.otpTimerKey)
        );
        this.notificationService.showMessage(res.message, res.isSuccessful);
        this.startCountdown();
      } else {
        this.notificationService.showMessage(res.message, res.isSuccessful);
      }
    });
  }
}
