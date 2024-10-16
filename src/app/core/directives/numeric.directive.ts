import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: '[numeric]'
})
export class NumericDirective {
  @Input() maxlength: number;  // Maximum length of the number after +92

  private prefix = '+92';  // Pre-fill with +92

  constructor(private el: ElementRef) {
    // Set the initial value to "+92" when the directive is initialized
    this.el.nativeElement.value = this.prefix;
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const inputValue = this.el.nativeElement.value;

    // Prevent from deleting or modifying the "+92"
    if (this.el.nativeElement.selectionStart < this.prefix.length &&
        (event.keyCode === 8 || event.keyCode === 46)) {
      event.preventDefault();  // Prevent backspace or delete on the prefix part
      return;
    }

    // Allow: backspace, delete, tab, escape, enter, Ctrl+A/Ctrl+C/Ctrl+V/Ctrl+X, home, end, arrows
    if ([46, 8, 9, 27, 13].indexOf(event.keyCode) !== -1 ||
        (event.keyCode === 65 && (event.ctrlKey || event.metaKey)) ||
        (event.keyCode === 67 && (event.ctrlKey || event.metaKey)) ||
        (event.keyCode === 86 && (event.ctrlKey || event.metaKey)) ||
        (event.keyCode === 88 && (event.ctrlKey || event.metaKey)) ||
        (event.keyCode >= 35 && event.keyCode <= 39)) {
      return; // Let it happen
    }

    // Ensure the maximum length (total should be 13 characters, including +92-)
    if (inputValue.length >= this.maxlength && event.keyCode !== 8 && event.keyCode !== 46) {
      event.preventDefault(); // Stop input if max length is reached
      return;
    }

    // Ensure that the first number after +92 is '3'
    if (inputValue.length === this.prefix.length) {
      if (event.key !== '3') {
        event.preventDefault();  // Prevent any input other than '3' at this position
      } else {
        // When the user types '3', automatically append the hyphen '-'
        this.el.nativeElement.value = inputValue + '-3';
        event.preventDefault(); // Prevent the default action of '3' being typed again
      }
      return;
    }

    // Allow only numbers after the +923-
    if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) &&
        (event.keyCode < 96 || event.keyCode > 105)) {
      event.preventDefault();  // Prevent non-numeric input
    }
  }

  @HostListener('input', ['$event']) onInput(event: Event) {
    const inputValue = this.el.nativeElement.value;

    // Ensure the input value always starts with "+92"
    if (!inputValue.startsWith(this.prefix)) {
      this.el.nativeElement.value = this.prefix;
    }

    // Ensure that if user types +92, after typing '3', hyphen is auto-added
    if (inputValue.length === this.prefix.length + 1 && inputValue[this.prefix.length] === '3') {
      this.el.nativeElement.value = this.prefix + '3-';
    }
  }
}
