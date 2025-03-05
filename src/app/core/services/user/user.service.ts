import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserName: string;
  constructor(private authService: AuthService) {
    this.fetchUserName();
  }

  fetchUserName() {
    this.authService.getCurrentUser().subscribe((res) => {
      if (res) {
        this.currentUserName = res.userName;
      }
    });
  }
}
