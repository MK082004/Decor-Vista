import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  selectedImage: string = '';

  constructor() { }

  ngOnInit(): void {}

  openModal(imageSrc: string) {
    console.log('Image selected:', imageSrc); // Replace alert with console log
    this.selectedImage = imageSrc; // Set the selected image
  }
}
