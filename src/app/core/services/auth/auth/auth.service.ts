import { ResetOtpModel } from './../../../models/resetOtp.model';
import { Role } from './../../../enums/role.enum';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponseModel } from 'src/app/core/models/apiResponse.model';
import { ApiService } from '../../api/api.service';
import { JwtService } from '../jwt/jwt.service';
import { StorageService } from '../secureStorage/storage.service';
import { LoginModel } from 'src/app/core/models/login.model';
import { UserMenuModel } from 'src/app/core/models/userMenu.model';
import { ClaimUserModel } from 'src/app/core/models/claimUser.model';
import { RegisterModel } from 'src/app/core/models/register.model';
import { RoleNavigation } from 'src/app/core/enums/roleNavigation.enum';
import { VerifyOtpModel } from 'src/app/core/models/verifyOtp.model';
import { ResetPasswordModel } from 'src/app/core/models/resetPassword.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageCurrentUser = 'accessUser';
  private storageCurrentUserPermissions = 'accessUserPermissions';
  private baseServerUrl = `Account`;
  private currentUserSubject$: BehaviorSubject<ClaimUserModel> = new BehaviorSubject<ClaimUserModel>(new ClaimUserModel());
  private currentUserPermissions$: BehaviorSubject<UserMenuModel[]> = new BehaviorSubject<UserMenuModel[]>([]);

  constructor(
    private router: Router,
    private storageService: StorageService,
    private jwtService: JwtService,
    private apiService: ApiService
  ) {

    this.currentUserSubject$ = new BehaviorSubject<ClaimUserModel>(
      this.getEncryptedItemToSession(this.storageCurrentUser)
    );

    this.currentUserPermissions$ = new BehaviorSubject<UserMenuModel[]>(
      this.getEncryptedItemToSession(this.storageCurrentUserPermissions)
    );
  }

  loginUser(loginUser: LoginModel): Observable<ApiResponseModel> {
    return this.apiService.postRequest<ApiResponseModel>(`${this.baseServerUrl}/login`, loginUser)
      .pipe(
        map((response: ApiResponseModel) => {
          if (response) {
            this.setJwtToken(response?.data?.token);
            return response;
          }
        })
      );
  }

  registerUser(registerUser: RegisterModel): Observable<ApiResponseModel> {
    return this.apiService
    .postRequest<ApiResponseModel>(`${this.baseServerUrl}/register`, registerUser)
    .pipe(
      map((response: ApiResponseModel) => {
        if (response) {
          return response;
        }
      })
    );
  }

  forgotPasswordAuth(model :ResetOtpModel): Observable<ApiResponseModel> {
    return this.apiService.postRequest<ApiResponseModel>(`${this.baseServerUrl}/send-password-reset-otp`, model)
    .pipe(
      map((response: ApiResponseModel) => {
        if (response) {
          return response;
        }
      })
    );
  }

  resetPassword(model :ResetPasswordModel): Observable<ApiResponseModel> {
    return this.apiService.postRequest<ApiResponseModel>(`${this.baseServerUrl}/send-password-reset-otp`, model)
    .pipe(
      map((response: ApiResponseModel) => {
        if (response) {
          return response;
        }
      })
    );
  }

  verifyOtp(model: VerifyOtpModel): Observable<ApiResponseModel> {
    return this.apiService.postRequest<ApiResponseModel>(`${this.baseServerUrl}/verify-password-reset-otp`, model)
    .pipe(
      map((response: ApiResponseModel) => {
        if (response) {
          return response;
        }
      })
    );
  }

  verifyToken(token: string): Observable<ApiResponseModel> {
    return this.apiService.getRequest<ApiResponseModel>(`${this.baseServerUrl}/verify-token?token=${token}`)
    .pipe(
      map((response: ApiResponseModel) => {
        if (response) {
          return response;
        }
      })
    );
  }

  verifyAccount(token: string): Observable<ApiResponseModel> {
    return this.apiService.getRequest<ApiResponseModel>(`${this.baseServerUrl}/verify-account?token=${token}`)
    .pipe(
      map((response: ApiResponseModel) => {
        if (response) {
          return response;
        }
      })
    );
  }

  private setJwtToken(jwtToken: string) {
    if (jwtToken) {
      const claimUser = this.decodeToken<ClaimUserModel>(jwtToken);
      claimUser.token = jwtToken;
      if (typeof claimUser.userPermissions === 'string') {
        claimUser.userPermissions = JSON.parse(claimUser.userPermissions);
      }
      const userPermissions = claimUser.userPermissions;
      this.currentUserSubject$.next(claimUser);
      this.currentUserPermissions$.next(userPermissions);
      this.setEncryptedItemToSession(this.storageCurrentUser, claimUser);
      this.setEncryptedItemToSession(this.storageCurrentUserPermissions, userPermissions);
      this.handleUserNavigation(claimUser);
    }
  }

  private decodeToken<T>(jwtToken: string): T {
    return this.jwtService.decodeToken<T>(jwtToken)
  }

  public jwtDecodeToken<T>(jwtToken: string): T {
    return this.decodeToken<T>(jwtToken);
  }

  public jwtTokenExpireationChecker(jwtToken: string): boolean {
    return this.jwtService.isTokenExpired(jwtToken);
  }

  public isValidJwt(jwtToken: string): boolean {
    return this.jwtService.isValidJwt(jwtToken);
  }

  public publicSetJwtTokenAccess(jwtToken: string) {
    this.setJwtToken(jwtToken);
  }

  public getCurrentUser(): Observable<ClaimUserModel> {
    return this.currentUserSubject$.asObservable();
  }

  public getCurrentUserPermissions(): Observable<UserMenuModel[]> {
    return this.currentUserPermissions$.asObservable();
  }

  private setEncryptedItemToSession(sessionKey: string, data: any) {
    this.storageService.secureStorage.setItem(sessionKey, data);
  }

  private getEncryptedItemToSession(sessionKey: string) {
    return this.storageService.secureStorage.getItem(sessionKey);
  }

  private handleUserNavigation(claimUser: ClaimUserModel) {
    if (claimUser) {
      switch (claimUser.userRoleName) {
        case Role.admin:
          this.router.navigate([RoleNavigation.Admin]);
          break;
        case Role.designer:
          this.router.navigate([RoleNavigation.Designer]);
          break;
        case Role.user:
          this.router.navigate([RoleNavigation.User]);
          break;
        default:
          this.router.navigate([RoleNavigation.Default]);
          break;
      }
    }
  }

  logout() {
    this.storageService.secureStorage.clear();
    this.currentUserSubject$.next(new ClaimUserModel());
    this.currentUserPermissions$.next([]);
    this.router.navigate(['/home']);
    return of({ success: false });
  }
}
