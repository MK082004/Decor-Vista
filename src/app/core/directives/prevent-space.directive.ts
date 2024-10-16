import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[preventSpace]'
})
export class PreventSpaceDirective {

  @HostListener('keydown', ['$event']) preventSpace(event: KeyboardEvent): void {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

}
