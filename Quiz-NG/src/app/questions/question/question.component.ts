import {
  Component,
  Input,
  Output,
  OnChanges,
  EventEmitter, OnInit
} from '@angular/core';
import { IQuestion } from '../../interfaces';
import {UserService} from '../../user/user.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnChanges,OnInit {
  isLogged = this.userService.isLogged$;
  constructor(private userService: UserService, private titleService: Title) { }

  @Input() questionData: IQuestion;
  @Output() sendGivenAnswer = new EventEmitter();
  answers: string[];

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit() {
    this.setTitle('myQuiz-Answering questions');
  }

  ngOnChanges(): void {
    this.answers = [this.questionData.correct_answer].concat(this.questionData.incorrect_answers);
    this.answers = this.shuffleAnswers(this.answers);
  }

  shuffleAnswers(arr: string[]): string[] {
    return arr.sort(() => Math.random() - 0.5);
  }

  onSubmit(givenAnswer): void {

      this.sendGivenAnswer.emit(givenAnswer);

  }
}