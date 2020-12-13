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
    timeForAnswering = 0;
    reverseTimer = 200;
    finished = false;
    selectedCategory: string;
    currentQuestion: IQuestion;
    questions: IQuestion[];
    regularUserAvailableQuestions = true;
    user: IUser;
    isLogged$ = this.userService.isLogged$;
    isLogged:boolean;
    currentSessionCorrectAnswers = 0;
    currentSessionIncorrectAnswers = 0;

    constructor(private route: ActivatedRoute, private questionsService: QuestionsService, private userService: UserService) {
        this.isLogged$.subscribe((loggedIn)=> {
            this.isLogged = loggedIn;
        })
        this.route.data.subscribe((data) => {
            this.questions = this.shuffleQuestions(data.questions);
            return this.questions
        } );
        this.selectedCategory = this.route.snapshot.params.category;

    }

    shuffleQuestions(arr: IQuestion[]): IQuestion[] {
        return arr.sort(() => Math.random() - 0.5);
    }

    inSeconds(ms) {
        return Math.round(ms / 10);
    }

    setProgressbarColor(time) {
        if (time <= 8) {
            return "success";
        }

        if (time <= 15) {
            return "primary";
        }

        if (time >= 15) {
            return "danger";
        }
    }

    ngOnInit(): void {
        if(this.isLogged){
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
            const secondsCounter = interval(100);
            this.subscription = secondsCounter.subscribe(sec => {
                this.timeForAnswering++;
                this.reverseTimer--;
                if (this.timeForAnswering === 200) {
                    this.nextQuestion();
                    return;
                }
            });

        }

    }

    nextQuestion(): void {
        this.currentQuestion = this.questions[this.questionCounter];
        this.timeForAnswering = 0;
        this.reverseTimer = 200;
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
            this.currentSessionCorrectAnswers++;
        }else {
            this.currentSessionIncorrectAnswers++;
        }
        this.userService.updateProfileData(userDataForUpdate).subscribe(
            ()=>{
                this.nextQuestion();
            }
        );
    }

    finishCategoryQuestions(): void {
        this.finished = true;
        this.questionCounter = 0;
        this.subscription?.unsubscribe();
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}