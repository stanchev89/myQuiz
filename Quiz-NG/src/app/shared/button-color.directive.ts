import {Directive, ElementRef, EventEmitter, HostListener, Output, Input} from '@angular/core';
import {IQuestion} from "../interfaces";
import {interval, timer} from 'rxjs'
import {takeUntil} from "rxjs/operators";



@Directive({
  selector: '[appButtonColor]'
})
export class ButtonColorDirective{

  @Input() questionData: IQuestion;
  @Output() sendGivenAnswer = new EventEmitter<string>();


  constructor(private elementRef:ElementRef) { }

  @HostListener('click')
  onClick() {
    const givenAnswer = this.elementRef.nativeElement.text;
    const buttonColorMustBe = givenAnswer === this.questionData.correct_answer ? 'green' : 'red';
    const pause = timer(1000);
    this.elementRef.nativeElement.style.backgroundColor = buttonColorMustBe;
    pause.subscribe(() => {
      this.sendGivenAnswer.emit(givenAnswer);
      this.elementRef.nativeElement.style.backgroundColor = '';
    })
  }

}