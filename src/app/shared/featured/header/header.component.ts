import { Component, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { gsap } from 'gsap';
import SplitType from 'split-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  private headerElement: HTMLElement;

  constructor(private elRef: ElementRef) { }

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
