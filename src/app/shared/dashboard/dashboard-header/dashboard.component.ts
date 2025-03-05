import { Component, OnInit } from '@angular/core';
import { ClaimUserModel } from 'src/app/core/models/claimUser.model';
import { UserModel } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth/auth.service';
import { DialogData, DialogService } from 'src/app/core/services/dialog/dialog.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {

  loginUser: UserModel;
  profileButton = {width: '37px', height: '37px'};

  constructor(private notificationService: DialogService, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchCurrentUserDetails();
  }

  fetchCurrentUserDetails() {
    this.authService.getCurrentUser().subscribe((res) => {
      if (res) {
        this.loginUser = res as UserModel;
      }
    });
  }

  logout() {
    let model: DialogData = {
      title: 'Logout Account',
      message: 'Are you sure you want to logout? Once you logout you need to login again. Are you Ok?',
      maxWidth: '550px',
      confirmButtonTitle: 'Logout',
      cancleButtonTitle: 'Cancel',
      icon: 'logout'
    };
    
    this.notificationService.notifiedStatusRequestDialog(model)
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
