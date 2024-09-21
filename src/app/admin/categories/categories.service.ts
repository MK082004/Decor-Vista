import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ApiResponseModel } from 'src/app/core/models/apiResponse.model';
import { ApiService } from 'src/app/core/services/api/api.service';
import { Category, CategoryApiModel } from 'src/app/core/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private baseServerUrl = `Category`;
  private categoriesSubject: BehaviorSubject<CategoryApiModel> = new BehaviorSubject<CategoryApiModel>(null);
  categories$: Observable<CategoryApiModel> = this.categoriesSubject.asObservable();

  constructor(private apiService: ApiService) { }

  getCategories(): void {
    this.apiService
      .getRequest<ApiResponseModel>(`${this.baseServerUrl}/GetCategories`)
      .pipe(
        map((response: ApiResponseModel) => response.data),
        catchError((error) => {
          console.error('Error fetching categories:', error.message || error);
          return throwError(() => error);
        })
      )
      .subscribe((categories: CategoryApiModel) => {
        this.categoriesSubject.next(categories);
      });
  }

  addEditCategory(category: Category): Observable<ApiResponseModel> {
    return this.apiService
      .postRequest<ApiResponseModel>(`${this.baseServerUrl}/AddEditCategory`, category)
      .pipe(
        map((response: ApiResponseModel) => {
         return response;
        }),
        catchError((error) => {
          console.error('Error adding category:', error.message || error);
          return throwError(() => error);
        })
      );
  }

  deleteCategory(categoryId: number): Observable<ApiResponseModel> {
    return this.apiService
    .deleteRequest<ApiResponseModel>(
      `${this.baseServerUrl}/${categoryId}`,
      categoryId
    )
    .pipe(
      map((response: ApiResponseModel) => {
        return response;
      }),
      catchError((error) => {
        console.error('Login failed:', error.message || error);
        return throwError(() => error);
      })
    );
  }
}
