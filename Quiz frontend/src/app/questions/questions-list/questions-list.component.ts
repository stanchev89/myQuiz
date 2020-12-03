import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { IQuestion } from 'src/app/interfaces';
import { QuestionsService } from '../questions.service';
import { map } from 'rxjs/operators';
import {  Subscription, interval } from 'rxjs';
import { UserService } from 'src/app/user/user.service';




@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit, OnDestroy {
  subscription:Subscription;
  questionCounter:number = 1;
  counter:number = 15;
  
  constructor(private route: ActivatedRoute,private questionsService: QuestionsService,private userService:UserService) { 
  }
  finished:boolean = false;
  selectedCategorie: string;
  questions:IQuestion[];
  currentQuestion:IQuestion;
  ngOnInit(): void {
    this.selectedCategorie = this.route.snapshot.params.categorie;
    this.questionsService.loadQuestionsByCategory(this.selectedCategorie).pipe(
      map((q:IQuestion[]) => {
        this.questions = q;
        this.currentQuestion = this.questions[0];
      })
    ).subscribe()
    const secondsCounter = interval(1000);
    this.subscription = secondsCounter.subscribe(sec => {
      this.counter --;
      if(this.counter === 0){
        this.nextQuestion();
        return;
      }
      
    })
  }
  nextQuestion() {
    this.currentQuestion = this.questions[this.questionCounter];
    this.counter = 15;
    if(this.questionCounter === this.questions.length-1) {
      this.finishCategoryQuestions();
      return;
    }
    this.questionCounter++;
    
  }
  nextButtonHandler() {
    this.nextQuestion();
  }

  givenAnswerHandler(answer) {  
    console.log(answer);
      
    this.nextQuestion();
    
  }

  finishCategoryQuestions() {
    this.finished = true;
    this.questionCounter = 0;
    console.log('All questions was displayed!');
    this.subscription.unsubscribe();
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

}
