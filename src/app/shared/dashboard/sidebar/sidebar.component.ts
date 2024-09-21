import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserModel } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth/auth.service';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  loginUser: UserModel;
  @Input() status: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

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


  clickEvent(): void {
    this.status = !this.status;
    this.toggleSidebar.emit(this.status);
  }

  logout() {
    this.notificationService.notifiedStatusRequestDialog('Logout Account', 'Are you sure you want to logout? Once you logout you need to login again. Are you Ok?', '550px', 'Logout', 'Cancle', 'logout')
      .subscribe((res) => {
        if (res) {
          this.authService.logout();
        }
      });
  }
}
