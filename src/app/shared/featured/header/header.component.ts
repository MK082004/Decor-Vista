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
export class HeaderComponent {
}
