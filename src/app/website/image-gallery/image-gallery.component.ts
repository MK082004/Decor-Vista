import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css'],
})
export class ImageGalleryComponent implements OnInit {

  @Input() imageSrc: string = '';
  image: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log(this.imageSrc);
    this.image = this.imageSrc;
    this.cdr.markForCheck();
  }

  closeModal() {
    this.image = '';
    this.imageSrc = '';
    this.cdr.markForCheck();
  }
}
