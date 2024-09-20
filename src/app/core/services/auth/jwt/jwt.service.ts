import { Injectable } from '@angular/core';
import { jwtDecode, JwtDecodeOptions } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  decodeToken<T>(token: string, options?: JwtDecodeOptions): T {
    try {
      return jwtDecode(token, options);
    } catch (error) {
      console.error('Token decoding failed:', error);
      throw error;
    }
  }
}
