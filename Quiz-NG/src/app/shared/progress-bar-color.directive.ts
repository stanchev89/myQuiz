import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appProgressBarColor]'
})
export class ProgressBarColorDirective {

  constructor(el:ElementRef) {
    if (+el.nativeElement.value > 10) {
      el.nativeElement.type = "danger";
    }
  }

}