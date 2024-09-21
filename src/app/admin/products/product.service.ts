import { ApiService } from './../../core/services/api/api.service';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Product, ProductsApiModel } from 'src/app/core/models/product.model';
import { ApiResponseModel } from 'src/app/core/models/apiResponse.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseServerUrl = `Product`;
  // BehaviorSubject to hold the product list
  private productsSubject: BehaviorSubject<ProductsApiModel> =
    new BehaviorSubject<ProductsApiModel>(null);

  // Observable stream to expose the product list to subscribers
  products$: Observable<ProductsApiModel> = this.productsSubject.asObservable();

  constructor(private apiService: ApiService) {}

  // Get all products from API and update the BehaviorSubject
  getProducts(): void {
    this.apiService
      .getRequest<ApiResponseModel>(`${this.baseServerUrl}/GetProducts`)
      .subscribe((products) => {
        console.log(products);

        let response = products.data;
        this.productsSubject.next(response);
      });
  }

  // Add a new product and update the BehaviorSubject
  addEditProduct(product: FormData): Observable<ApiResponseModel> {
    return this.apiService
      .postRequest<ApiResponseModel>(
        `${this.baseServerUrl}/AddUpdateProduct`,
        product
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

  // Delete a product by ID and update the BehaviorSubject
  deleteProduct(id: number): Observable<ApiResponseModel> {
    return this.apiService
      .deleteRequest<ApiResponseModel>(
        `${this.baseServerUrl}/DeleteProduct`,
        id
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
