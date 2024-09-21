import { Component, OnInit } from '@angular/core';
import { ClaimUserModel } from 'src/app/core/models/claimUser.model';
import { AuthService } from 'src/app/core/services/auth/auth/auth.service';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {

  loginUser: ClaimUserModel;
  profileButton = {
    width: '37px',
    height: '37px'
  };
  constructor(private notificationService: DialogService, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData() {
    let res = this.authService.currentUserValue;
    if (res) {
      this.loginUser = res;
    }
  }

  logout() {
    this.notificationService.notifiedStatusRequestDialog('Logout Account', 'Are you sure you want to logout? Once you logout you need to login again. Are you Ok?', '550px', 'Logout', 'Cancle', 'logout')
      .subscribe((res) => {
        if (res) {
          this.authService.logout();
        }
      });
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  }
}
