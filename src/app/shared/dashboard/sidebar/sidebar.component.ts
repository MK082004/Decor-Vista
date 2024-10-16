import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserModel } from 'src/app/core/models/user.model';
import { UserMenuModel } from 'src/app/core/models/userMenu.model';
import { AuthService } from 'src/app/core/services/auth/auth/auth.service';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  loginUser: UserModel;
  permissions: UserMenuModel[] = [];
  expandedStates: { [key: number]: boolean } = {};
  @Input() status: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private authService: AuthService,
    private notificationService: DialogService
  ) {}

  ngOnInit(): void {
    this.fetchCurrentUserDetails();
    this.fetchCurrentUserPermissions();
  }

  fetchCurrentUserDetails() {
    this.authService.getCurrentUser().subscribe((res) => {
      if (res) {
        this.loginUser = res as UserModel;
      }
    });
  }

  fetchCurrentUserPermissions() {
    this.authService.getCurrentUserPermissions().subscribe((res) => {
      if (res) {
        console.log('res', res);

        res.forEach((menu) => {
          if (menu.MenuIcon !== null && menu.IsActive === true) {
            const activeSubMenus = menu.SubMenus.filter((subMenu) => subMenu.IsActive && subMenu.SubMenuIcon !== null);
            this.permissions.push({...menu, SubMenus: activeSubMenus});
          }
        });
      }
    });
  }

  toggleSubMenu(index: number): void {
    if (this.expandedStates[index]) {
      this.expandedStates[index] = false;
    } else {
      Object.keys(this.expandedStates).forEach(key => {
        this.expandedStates[key] = false;
      });
      this.expandedStates[index] = true;
    }
  }

  clickEvent(): void {
    this.status = !this.status;
    this.scrollToTop();
    this.toggleSidebar.emit(this.status);
    if (!this.status) {
      this.permissions.forEach((_, index) => {
        this.expandedStates[index] = false;
      });
    }
  }

  scrollToTop(): void {
    const navLinksElement = document.querySelector('.nav_links') as HTMLElement;
    if (navLinksElement) {
      navLinksElement.scrollTop = 0;
    }
  }

  logout(): void {
    this.notificationService
      .notifiedStatusRequestDialog(
        'Logout Account',
        'Are you sure you want to logout? Once you logout you need to login again. Are you Ok?',
        '550px',
        'Logout',
        'Cancel',
        'logout'
      )
      .subscribe((res) => {
        if (res) {
          this.authService.logout();
        }
      });
  }
}
