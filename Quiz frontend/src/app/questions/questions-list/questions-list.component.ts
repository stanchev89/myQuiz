import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IQuestion} from 'src/app/interfaces';
import {QuestionsService} from '../questions.service';
import {map} from 'rxjs/operators';
import {interval, Subscription} from 'rxjs';
import {UserService} from 'src/app/user/user.service';


@Component({
    selector: 'app-questions-list',
    templateUrl: './questions-list.component.html',
    styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    questionCounter = 1;
    timerForAnswering = 15;
    finished = false;
    selectedCategory: string;
    questions: IQuestion[];
    currentQuestion: IQuestion;

    constructor(private route: ActivatedRoute, private questionsService: QuestionsService, private userService: UserService) {
    }

    ngOnInit(): void {
        this.selectedCategory = this.route.snapshot.params.categorie;
        this.questionsService.loadQuestionsByCategory(this.selectedCategory).pipe(
            map((q: IQuestion[]) => {
                this.questions = q;
                this.currentQuestion = this.questions[0];
            })
        ).subscribe();
        const secondsCounter = interval(1000);
        this.subscription = secondsCounter.subscribe(sec => {
            this.timerForAnswering--;
            if (this.timerForAnswering === 0) {
                this.nextQuestion();
                return;
            }

        });
    }

    nextQuestion(): void {
        this.currentQuestion = this.questions[this.questionCounter];
        this.timerForAnswering = 15;
        if (this.questionCounter === this.questions.length) {
            this.finishCategoryQuestions();
            return;
        }
        this.questionCounter++;
    }

    nextButtonHandler(): void {
        this.nextQuestion();
    }

    givenAnswerHandler(answer): void {
        const userDataForUpdate = {
            answered_question: this.currentQuestion,
            correct_answer: null
        };
        if (this.currentQuestion.correct_answer === answer) {
            userDataForUpdate.correct_answer = this.currentQuestion;
        }
        this.userService.answering(userDataForUpdate).subscribe();
        this.nextQuestion();
    }

    finishCategoryQuestions(): void {
        this.finished = true;
        this.questionCounter = 0;
        console.log('All questions was displayed!');
        this.subscription.unsubscribe();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}