import { AuthService } from 'src/app/core/services/auth/auth/auth.service';
import { Component, AfterViewInit, ElementRef, HostListener, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import { UserModel } from 'src/app/core/models/user.model';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit, OnInit {
  private headerElement: HTMLElement;
  loginUser: UserModel | null = null;  // Set initial value to null
  profileButton = {
    width: '37px',
    height: '37px'
  };
  constructor(private elRef: ElementRef, private authService: AuthService, private notificationService: DialogService) { }

  ngAfterViewInit(): void {
    this.headerElement = this.elRef.nativeElement.querySelector('header');

    const elements = this.elRef.nativeElement.querySelectorAll('[animate]');

    elements.forEach(element => {
      const typeSplit = new SplitType(element, {
        types: 'lines,words,chars',
        tagName: 'span'
      });

      if (element.matches('.hero-section [animate]')) {
        gsap.from(element.querySelectorAll('.word'), {
          y: '100%',
          rotationZ: 5,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.16,
        });
      } else if (element.matches('ul[animate]')) {
        gsap.from(element.querySelectorAll('.word'), {
          y: '-120%',
          opacity: 0,
          rotationZ: -10,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.15,
        });
      }
    });
  }

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData() {
    let res = this.authService.currentUserValue;
    if (res as UserModel) {
      this.loginUser = res;
    }
  }

  logout() {
    this.notificationService.notifiedStatusRequestDialog('Logout Account', 'Are you sure you want to logout? Once you logout you need to login again. Are you Ok?', '550px', 'Logout', 'Cancle', 'logout')
      .subscribe((res) => {
        if (res) {
          this.authService.logout();
          this.loginUser = null;  // Set user to null after logout
        }
      });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollPosition = window.scrollY || window.pageYOffset;
    const threshold = document.documentElement.scrollHeight * 0.1; // 10% of the total height

    if (scrollPosition > threshold) {
      this.headerElement.classList.add('header-fixed', 'show');
    } else {
      this.headerElement.classList.remove('header-fixed', 'show');
    }
  }

}
