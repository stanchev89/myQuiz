import {Directive, ElementRef, EventEmitter, HostListener, Output, Input} from '@angular/core';
import {IQuestion} from "../interfaces";
import { timer} from 'rxjs'
import {Store} from "@ngrx/store";
import {AppRootState} from "../+store";
import {answerIsClicked} from "../questions/+store/actions";



@Directive({
  selector: '[appButtonColor]'
})
export class ButtonColorDirective{

  @Input() questionData: IQuestion;
  @Output() sendGivenAnswer = new EventEmitter<string>();

  constructor(private elementRef:ElementRef,private store:Store) { }

  @HostListener('click',['$event'])
  onClick(event) {
    this.store.dispatch(answerIsClicked({answerIsClicked:true}));
    // const givenAnswer = this.elementRef.nativeElement.text;
    const givenAnswer = event.target.value;
    const buttonColorMustBe = givenAnswer === this.questionData.correct_answer ? 'green' : 'red';
    const pause = timer(1000);
    this.elementRef.nativeElement.style.backgroundColor = buttonColorMustBe;
    this.elementRef.nativeElement.style.color = 'white';
    pause.subscribe(() => {
      this.sendGivenAnswer.emit(givenAnswer);
      this.elementRef.nativeElement.style.backgroundColor = '';
      this.elementRef.nativeElement.style.color = '';
    })
  }

}