import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseModel } from 'src/app/core/models/apiResponse.model';
import { CategoryAddEditDeleteModel } from 'src/app/core/models/category.model';
import { ApiService } from 'src/app/core/services/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private baseServerUrl = `Category`;

  constructor(private apiService: ApiService) { }

  // getCategories(): Observable<CategoryApiModel> {
  //  return this.apiService.getRequest<CategoryApiModel>(`${this.baseServerUrl}/getCategories?skip=${0}&take=${10}`);
  // }

  addCategory(category: FormData): Observable<ApiResponseModel> {
    return this.apiService.postRequest<ApiResponseModel>(`${this.baseServerUrl}/addCategory`, category);
  }

  updateCategory(category: FormData): Observable<ApiResponseModel> {
    return this.apiService.putRequest<ApiResponseModel>(`${this.baseServerUrl}/updateCategory`, category);
  }

  updateCategoryStatus(category: CategoryAddEditDeleteModel): Observable<ApiResponseModel> {
    return this.apiService.putRequest<ApiResponseModel>(`${this.baseServerUrl}/setActiveStatus`, category);
  }

  deleteCategory(categoryId: number): Observable<ApiResponseModel> {
    return this.apiService.deleteRequest<ApiResponseModel>(`${this.baseServerUrl}/deleteCategory/${categoryId}`);
  }  
}
