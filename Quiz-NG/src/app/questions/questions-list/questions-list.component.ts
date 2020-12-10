import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {IQuestion, IUser} from 'src/app/interfaces';
import {QuestionsService} from '../questions.service';
import {tap, map} from 'rxjs/operators';
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
    timeForAnswering = 15;
    finished = false;
    selectedCategory: string;
    currentQuestion: IQuestion;
    questions: IQuestion[];
    regularUserAvailableQuestions = true;
    user: IUser;

    constructor(private route: ActivatedRoute, private questionsService: QuestionsService, private userService: UserService) {
        this.route.data.subscribe((data) => {
            this.questions = this.shuffleQuestions(data.questions);
            return this.questions
        } );
        this.selectedCategory = this.route.snapshot.params.category;
    }

    shuffleQuestions(arr: IQuestion[]): IQuestion[] {
        return arr.sort(() => Math.random() - 0.5);
    }

    ngOnInit(): void {
        this.userService.currentUser$.subscribe({
            next:((user:IUser) => {
                if (user) {
                    this.user = user;
                }
            })
        })
        if (!this.user.is_vip) {
            this.questions = this.questions.filter((question: IQuestion) =>  !this.user.answered_questions.includes(question._id));
        }
        if(this.questions.length === 0) {
            this.regularUserAvailableQuestions = false;
            return this.finishCategoryQuestions()
        }
        this.currentQuestion = this.questions[0];
        const secondsCounter = interval(1000);
        this.subscription = secondsCounter.subscribe(sec => {
            this.timeForAnswering--;
            if (this.timeForAnswering === 0) {
                this.nextQuestion();
                return;
            }
        });

    }

    nextQuestion(): void {
        this.currentQuestion = this.questions[this.questionCounter];
        this.timeForAnswering = 15;
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
        this.userService.answering(userDataForUpdate).subscribe(
            ()=>{
                this.nextQuestion();
            }
        );
    }

    finishCategoryQuestions(): void {
        this.finished = true;
        this.questionCounter = 0;
        console.log('All questions was displayed!');
        this.subscription?.unsubscribe();
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}