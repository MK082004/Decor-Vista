import { Role } from './../../../enums/role.enum';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiResponseModel } from 'src/app/core/models/apiResponse.model';
import { ApiService } from '../../api/api.service';
import { JwtService } from '../jwt/jwt.service';
import { StorageService } from '../secureStorage/storage.service';
import { LoginModel } from 'src/app/core/models/login.model';
import { UserMenuModel } from 'src/app/core/models/userMenu.model';
import { ClaimUserModel } from 'src/app/core/models/claimUser.model';
import { RegisterModel } from 'src/app/core/models/register.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public storageCurrentUser = 'accessUser';
  public storageCurrentUserPermissions = 'accessUserPermissions';
  private baseServerUrl = `Accounts`;
  private currentUserSubject$ = new BehaviorSubject<ClaimUserModel>(null);
  private currentUserPermissions$ = new BehaviorSubject<UserMenuModel[]>([]);

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

      // let encryptDataNote = localStorage.getItem(this.encryptKey('NotificationData'));

      // if (encryptDataNote) {
      //   const decryptedData = this.decryptData(encryptDataNote);
      //   this.NotifictionsData$.next(decryptedData);
      // }
  }

  loginUser(loginUser: LoginModel): Observable<ApiResponseModel> {
    return this.apiService
      .postRequest<ApiResponseModel>(`${this.baseServerUrl}/LoginUser`, loginUser)
      .pipe(
        map((response: ApiResponseModel) => {
          const jwtToken = response.data;
          if (jwtToken !== null) {
            try {
              const claimUser = this.jwtService.decodeToken<ClaimUserModel>(jwtToken.token);
              this.currentUserSubject$.next(claimUser);
              this.setEncryptedItemToSession(this.storageCurrentUser, claimUser);

              // Navigate to the appropriate route based on the role
              this.handleUserNavigation(claimUser);
            } catch (decodeError) {
              console.error('Token decoding failed:', decodeError.message || decodeError);
              this.logout();
            }
          }
          return response;
        }),
        catchError((error) => {
          console.error('Login failed:', error.message || error);
          return throwError(() => error);
        })
      );
  }

  registerUser(registerUser: RegisterModel): Observable<ApiResponseModel> {
    return this.apiService
    .postRequest<ApiResponseModel>(`${this.baseServerUrl}/RegisterUser`, registerUser)
    .pipe(
      map((response: ApiResponseModel) => {
        const jwtToken = response.data;
        if (jwtToken !== null) {
          try {
            const claimUser = this.jwtService.decodeToken<ClaimUserModel>(jwtToken.token);
            this.currentUserSubject$.next(claimUser);
            this.setEncryptedItemToSession(this.storageCurrentUser, claimUser);

            // Navigate to the appropriate route based on the role
            this.handleUserNavigation(claimUser);
          } catch (decodeError) {
            console.error('Token decoding failed:', decodeError.message || decodeError);
            this.logout();
          }
        }
        return response;
      }),
      catchError((error) => {
        console.error('Login failed:', error.message || error);
        return throwError(() => error);
      })
    );
  }


  public get currentUserValue(): ClaimUserModel | null {
    return this.currentUserSubject$.value;
  }

  public get currentUserRole(): string | null {
    return this.currentUserSubject$.value
      ? this.currentUserSubject$.value.userRole
      : null;
  }

  public getCurrentUser(): Observable<ClaimUserModel | null> {
    return this.currentUserSubject$.asObservable();
  }

  public getCurrentUserPermissions(): Observable<UserMenuModel[] | []> {
    return this.currentUserPermissions$.asObservable();
  }

  setEncryptedItemToSession(sessionKey: string, data: any) {
    this.storageService.secureStorage.setItem(sessionKey, data);
  }

  getEncryptedItemToSession(sessionKey: string) {
    return this.storageService.secureStorage.getItem(sessionKey);
  }

  handleUserNavigation(claimUser: ClaimUserModel) {
    if (claimUser) {
      switch (claimUser.userRole) {
        case Role.admin:
          this.router.navigate(['/admin']);  // Navigate to admin dashboard
          break;
        case Role.designer:
          this.router.navigate(['/designer']);  // Navigate to designer dashboard
          break;
        case Role.user:
          this.router.navigate(['/home']);  // Navigate to the home page
          break;
        default:
          this.router.navigate(['/signin']);  // Redirect to sign-in
          break;
      }
    }
  }

  logout() {
    this.storageService.secureStorage.clear();
    this.currentUserSubject$.next(null);
    this.currentUserPermissions$.next([]);
    this.router.navigate(['/home']);
    return of({ success: false });
  }

  // GetLoginUserNotifications(userId: number) {
  //   this.http
  //     .get<ApiResponseModel>(
  //       this.baseServerUrl +
  //         `Accounts/GetLoginUserNotifications?userId=${userId}`
  //     )
  //     .subscribe((res) => {
  //       const encryptedData = this.encryptData(res.data);
  //       localStorage.setItem(
  //         this.encryptKey('NotificationData'),
  //         encryptedData
  //       );
  //       const decryptedData = this.decryptData(encryptedData);
  //       this.NotifictionsData$.next(decryptedData);
  //     });
  //   }

  // UpdateLoginUserData(user: UserModel) {
  //   let formData: FormData = new FormData();
  //   formData.append('UserId', user.userId.toString());
  //   formData.append('userFirstName', user.userFirstName.toString());
  //   formData.append('userLastName', user.userLastName.toString());
  //   formData.append('userFatherName', user.userFatherName.toString());
  //   formData.append('userEmail', user.userEmail.toString());
  //   formData.append('userPhoneNumberCode', user.userPhoneNumberCode.toString());
  //   formData.append('userPhoneNumber', user.userPhoneNumber.toString());
  //   formData.append('userDob', user.userDob.toISOString());
  //   formData.append('userAddress', user.userAddress.toString());
  //   formData.append('userCountry', user.userCountry.toString());
  //   formData.append('userCity', user.userCity.toString());
  //   formData.append(
  //     'userPermanentAddress',
  //     user.userPermanentAddress.toString()
  //   );
  //   formData.append(
  //     'userPermanentCountry',
  //     user.userPermanentCountry.toString()
  //   );
  //   formData.append('userPermanentCity', user.userPermanentCity.toString());
  //   if (user.userImage != null) {
  //     formData.append(
  //       'userImage',
  //       user.userImage,
  //       user.userImage.name.toString()
  //     );
  //   }

  //   return this.http
  //     .post<ApiResponseModel>(
  //       this.baseServerUrl + 'Accounts/UpdateLoginUserData',
  //       formData
  //     )
  //     .pipe(
  //       catchError((error) => {
  //         console.error('Error occurred:', error);
  //         return throwError(error);
  //       })
  //     );
  // }
}
