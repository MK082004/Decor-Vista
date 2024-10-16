import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { UserRoleModel } from '../../models/userRole.model';
import { ApiResponseModel } from '../../models/apiResponse.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private apiUrl = 'Common';
  private rolesSubject = new BehaviorSubject<UserRoleModel[]>([]);
  roles$ = this.rolesSubject.asObservable();

  constructor(private apiService: ApiService) { }

  // Method to fetch roles from the API
  fetchRoles(): void {
    this.apiService.getRequest(`${this.apiUrl}/getUserRoles`).pipe(
      map((response: ApiResponseModel) => {
        return response.data || [];
      }),
      catchError((error) => {
        console.error('Error fetching roles:', error);
        return throwError(error);
      })
    ).subscribe((roles: UserRoleModel[]) => {
      this.rolesSubject.next(roles);
    });
  }
}
