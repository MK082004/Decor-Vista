import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[preventCopyPaste]'
})
export class PreventCopyPasteDirective {

  constructor(private ngControl: NgControl) {}

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    // Prevent spaces
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    // Prevent pasting
    event.preventDefault();
  }

  @HostListener('copy', ['$event'])
  onCopy(event: ClipboardEvent) {
    // Prevent copying
    event.preventDefault();
  }
}
