import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appOtpInput]'
})
export class OtpInputDirective {
  @Input() appOtpInput: any; // For form control or any other inputs

  constructor(private el: ElementRef) {}

  // Restrict input to numeric digits only
  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    const isNumeric = (event.key >= '0' && event.key <= '9') || event.key === 'Backspace' || event.key === 'Tab';
    if (!isNumeric) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event']) onInput(event: Event) {
    const input = this.el.nativeElement as HTMLInputElement;

    // Allow only one digit in the input
    if (input.value.length > 1) {
      input.value = input.value.slice(0, 1); // Keep only the first digit
    }
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    const input = this.el.nativeElement as HTMLInputElement;
    const pastedData = event.clipboardData?.getData('text') || '';

    // Only keep the first numeric character from the pasted content
    const firstDigit = pastedData.match(/\d/) ? pastedData.match(/\d/)[0] : '';
    input.value = firstDigit;
    event.preventDefault();

    // Trigger input event to handle focus
    this.triggerInputEvent();
  }

  @HostListener('keyup', ['$event']) onKeyup(event: KeyboardEvent) {
    const input = this.el.nativeElement as HTMLInputElement;
    const index = this.appOtpInput; // Pass the index of the control

    // Move to the next input if a digit is entered
    if (input.value.length === 1 && index < (this.el.nativeElement.parentNode.children.length - 1)) {
      const nextInput = this.el.nativeElement.nextElementSibling;
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    } else if (input.value.length === 0 && index > 0) {
      // Move to the previous input if the current input is cleared
      const prevInput = this.el.nativeElement.previousElementSibling;
      if (prevInput) {
        (prevInput as HTMLInputElement).focus();
      }
    }
  }

  private triggerInputEvent() {
    const inputEvent = new Event('input', { bubbles: true });
    this.el.nativeElement.dispatchEvent(inputEvent);
  }
}
