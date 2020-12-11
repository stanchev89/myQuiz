import { Component, Input, Output, EventEmitter, OnChanges,  } from '@angular/core';
import { IQuestion } from '../../interfaces';
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements  OnChanges {
  isLogged = this.userService.isLogged$;
  constructor(private userService: UserService) { }
  @Input() questionData: IQuestion;
  @Output() sendGivenAnswer = new EventEmitter<string>();

  answers: string[];

  ngOnChanges(): void {
    this.answers = [this.questionData.correct_answer].concat(this.questionData.incorrect_answers);
    this.answers = this.shuffleAnswers(this.answers);
  }

  shuffleAnswers(arr: string[]): string[] {
    return arr.sort(() => Math.random() - 0.5);
  }

  onSubmit(answer): void {
    this.answers = [];
    this.sendGivenAnswer.emit(answer);
  }
}