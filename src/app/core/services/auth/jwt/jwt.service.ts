import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode, JwtDecodeOptions } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(private router: Router) {}

  decodeToken<T>(token: string, options?: JwtDecodeOptions): T {
    try {
      return jwtDecode(token, options);
    } catch (error) {
      this.router.navigate(['/auth']);
      return;
    }
  }

  isValidJwt(token: string): boolean {
    const parts = token.split('.');
    return parts.length === 3;
  }

  isTokenExpired(token: string): boolean {
    const expiry = token['exp'];
    const currentTime = Math.floor(new Date().getTime() / 1000);
    return currentTime >= expiry;
  }
}
