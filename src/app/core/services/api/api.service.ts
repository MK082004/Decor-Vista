import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  /**
   * Make a POST request to the specified API URL with the provided model data.
   * @param apiUrl - The API URL to send the POST request to.
   * @param model - The data model to be sent in the POST request.
   * @returns Observable of the API response.
   */
  postRequest<T>(apiUrl: string, model: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${apiUrl}`, model).pipe(
      catchError((error) => {
        console.error('HTTP POST request failed:', 'Internal server error please contact administrator' + error.message || error);
        return throwError('Internal server error please contact administrator');
      })
    );
  }

  /**
   * Make a GET request to the specified API URL.
   * @param apiUrl - The API URL to send the GET request to.
   * @param params - Optional query parameters to include in the request.
   * @returns Observable of the API response.
   */
  getRequest<T>(apiUrl: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    return this.http.get<T>(`${this.baseUrl}/${apiUrl}`, { params: httpParams }).pipe(
      catchError((error) => {
        console.error('HTTP GET request failed:', 'Internal server error please contact administrator' + error.message || error);
        return throwError('Internal server error please contact administrator');
      })
    );
  }

  /**
   * Make a PUT request to the specified API URL with the provided model data.
   * @param apiUrl - The API URL to send the PUT request to.
   * @param model - The data model to be sent in the PUT request.
   * @returns Observable of the API response.
   */
  putRequest<T>(apiUrl: string, model: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${apiUrl}`, model).pipe(
      catchError((error) => {
        console.error('HTTP PUT request failed:', 'Internal server error please contact administrator' + error.message || error);
        return throwError('Internal server error please contact administrator');
      })
    );
  }

  /**
   * Make a DELETE request to the specified API URL.
   * @param apiUrl - The API URL to send the DELETE request to.
   * @param params - Optional query parameters to include in the request.
   * @returns Observable of the API response.
   */
  deleteRequest<T>(apiUrl: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }

    return this.http.delete<T>(`${this.baseUrl}/${apiUrl}`, { params: httpParams }).pipe(
      catchError((error) => {
        console.error('HTTP DELETE request failed:', 'Internal server error please contact administrator' + error.message || error);
        return throwError('Internal server error please contact administrator');
      })
    );
  }
}
