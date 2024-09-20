import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('sliderImages') sliderImages!: ElementRef;
  @ViewChild('counter') counter!: ElementRef;
  @ViewChild('titles') titles!: ElementRef;
  @ViewChild('slidePreview') slidePreview!: ElementRef;
  @ViewChild('indicatorsButton') indicators!: ElementRef;

  currentImg = 1;
  totalSlides = 5;
  indicatorRotation = 0;

  ngAfterViewInit(): void {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
    );

    this.setupClickEvents();
  }

  updateCounterAndTitlePosition() {
    const counterY = -22 * (this.currentImg - 1);
    const titleY = -60 * (this.currentImg - 1);

    gsap.to(this.counter.nativeElement, {
      y: counterY,
      duration: 1,
      ease: "hop"
    });

    gsap.to(this.titles.nativeElement, {
      y: titleY,
      duration: 1,
      ease: "hop"
    });
  }

  updateActiveSlidePreview() {
    const prevSlides = this.slidePreview.nativeElement.querySelectorAll('.preview');
    prevSlides.forEach((prev: HTMLElement) => prev.classList.remove('active'));
    prevSlides[this.currentImg - 1].classList.add('active');
  }

  animateSlide(direction: string) {
    const currentSlide = this.sliderImages.nativeElement.querySelectorAll('.img').item(
      this.sliderImages.nativeElement.querySelectorAll('.img').length - 1
    );

    const slideImg = document.createElement('div');
    slideImg.classList.add('img');

    const slideImgElem = document.createElement('img');
    slideImgElem.src = `./assets/images/img${this.currentImg}.jpg`;
    gsap.set(slideImgElem, { x: direction === 'left' ? -500 : 500 });

    slideImg.appendChild(slideImgElem);
    this.sliderImages.nativeElement.appendChild(slideImg);

    gsap.to(currentSlide.querySelector('img'), {
      x: direction === 'left' ? 500 : -500,
      duration: 1.5,
      ease: 'hop'
    });

    gsap.fromTo(
      slideImg,
      {
        clipPath:
          direction === 'left'
            ? 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
            : 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
      },
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1.5,
        ease: 'hop'
      }
    );
    gsap.to(slideImgElem, {
      x: 0,
      duration: 1.5,
      ease: 'hop'
    });

    this.cleanupSlides();

    this.indicatorRotation += direction === 'left' ? -190 : 190;
    gsap.to(this.indicators.nativeElement.querySelectorAll('p'), {
      rotate: this.indicatorRotation,
      duration: 1,
      ease: 'hop'
    });
  }

  setupClickEvents() {
    document.addEventListener('click', (event) => {
      const sliderWidth = this.sliderImages.nativeElement.clientWidth;
      const clickPosition = event.clientX;

      if (this.slidePreview.nativeElement.contains(event.target)) {
        const clickedPrev = (event.target as HTMLElement).closest('.preview');

        if (clickedPrev) {
          const clickedIndex = Array.from(this.slidePreview.nativeElement.querySelectorAll('.preview')).indexOf(clickedPrev) + 1;

          if (clickedIndex !== this.currentImg) {
            if (clickedIndex < this.currentImg) {
              this.currentImg = clickedIndex;
              this.animateSlide('left');
            } else {
              this.currentImg = clickedIndex;
              this.animateSlide('right');
            }
            this.updateActiveSlidePreview();
            this.updateCounterAndTitlePosition();
          }
        }
        return;
      }

      if (clickPosition < sliderWidth / 2 && this.currentImg !== 1) {
        this.currentImg--;
        this.animateSlide('left');
      } else if (clickPosition > sliderWidth / 2 && this.currentImg !== this.totalSlides) {
        this.currentImg++;
        this.animateSlide('right');
      }

      this.updateActiveSlidePreview();
      this.updateCounterAndTitlePosition();
    });
  }

  cleanupSlides() {
    const imgElements = this.sliderImages.nativeElement.querySelectorAll('.img');
    if (imgElements.length > this.totalSlides) {
      imgElements[0].remove();
    }
  }
}
