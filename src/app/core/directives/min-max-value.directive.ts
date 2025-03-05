import { Directive, ElementRef, Input, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMinMaxValue]'
})
export class MinMaxValueDirective {

  @Input() min: number = 1;
  @Input() max: number = 50;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = parseInt(input.value);

    // Ensure the value is within the min and max range
    if (value < this.min) {
      value = this.min;
    } else if (value > this.max) {
      value = this.max;
    }

    // Update the input field with the corrected value
    input.value = value.toString();
  }

  @HostListener('blur', ['$event'])
  onBlur(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = Number(input.value);

    // On blur, enforce the range again
    if (value < this.min) {
      value = this.min;
    } else if (value > this.max) {
      value = this.max;
    }

    // Update the input field with the corrected value
    input.value = value.toString();
  }
}
