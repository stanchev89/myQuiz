import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IQuestion} from 'src/app/interfaces';
import {QuestionsService} from '../questions.service';
import {interval, Subscription} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {UserService} from 'src/app/user/user.service';
import {Store} from "@ngrx/store";
import {AppRootState} from "../../+store";
import {finishedCategory, regularUserAvailableQuestions} from "../+store/actions";

@Component({
    selector: 'app-questions-list',
    templateUrl: './questions-list.component.html',
    styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    questionCounter = 0;
    timeForAnswering = 0;
    reverseTimer = 200;
    finished = this.store.select((state:AppRootState) => state.questions.finishedCategory);
    selectedCategory = this.route.snapshot.paramMap.get('category').split('_').join(' ');
    currentQuestion: IQuestion;
    categoryQuestions: Subscription;
    regularUserAvailableQuestions = this.store.select((state:AppRootState) => state.questions.regularUserAvailableQuestions);
    user$ = this.userService.currentUser$;
    questions: IQuestion[];
    isVip = this.user$.pipe(map(user => user?.is_vip));
    currentSessionCorrectAnswers = 0;
    currentSessionIncorrectAnswers = 0;

    constructor(private route: ActivatedRoute, private questionsService: QuestionsService, private userService: UserService, private store:Store<AppRootState>) {}

    shuffleQuestions(arr: IQuestion[]): IQuestion[] {
            const copy = arr.slice();
            for (let i = copy.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                let temp = copy[i];
                copy[i] = copy[j];
                copy[j] = temp;
            }
            return copy;
    }

    MsInSeconds(ms) {
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
        this.categoryQuestions = this.store.select((state:AppRootState) => {
            const user = state.auth.currentUser;
            const allQuestions = state.questions.allQuestions;
            let selectedCategoryQuestions:IQuestion[];
            if(this.selectedCategory){
                let rawCategoryName;
                for (let i = 0; i < Object.keys(allQuestions).length ; i++) {
                    if(Object.keys(allQuestions)[i].includes(this.selectedCategory)){
                        rawCategoryName = Object.keys(allQuestions)[i];
                    }
                }
                 selectedCategoryQuestions = allQuestions[rawCategoryName];
            }
            if(user) {
                const output = user.is_vip
                    ? this.shuffleQuestions(selectedCategoryQuestions)
                    : this.shuffleQuestions(selectedCategoryQuestions.filter(question => !user.answered_questions.includes(question._id)));
                if(!output || output.length === 0) {
                    this.store.dispatch(regularUserAvailableQuestions({regularUserAvailableQuestions: false}))
                };
                return output;
            }
        }).pipe(first()).subscribe((questions: IQuestion[]) => {
            if(questions?.length > 0) {
                this.startPlaying(questions)
            }
        });

    }

    startPlaying(questions: IQuestion[]): void {
        this.questions = questions;
        this.currentQuestion = this.questions[this.questionCounter];
        this.questionCounter++;
        this.userService.updateProfileData({answered_question:this.currentQuestion}).pipe(first()).subscribe();
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


    nextQuestion(): void {
        if(this.questions.length === 0) {
            this.store.dispatch(regularUserAvailableQuestions({regularUserAvailableQuestions: false}))
            return;
        }
        this.currentQuestion = this.questions[this.questionCounter];
        this.userService.updateProfileData({answered_question:this.currentQuestion}).pipe(first()).subscribe();
        this.timeForAnswering = 0;
        this.reverseTimer = 200;
        if (this.questionCounter === this.questions.length) {
            this.finishCategoryQuestions();
            return;
        }
        this.questionCounter++;
    }


    givenAnswerHandler(answer): void {

        if (this.currentQuestion.correct_answer === answer) {
            this.userService.updateProfileData({correct_answer:this.currentQuestion}).pipe(first()).subscribe();
            this.currentSessionCorrectAnswers++;
        }else {
            this.currentSessionIncorrectAnswers++;
        }
        this.nextQuestion();

    }

    finishCategoryQuestions(): void {
        this.store.dispatch(finishedCategory({finishedCategory:true}));
        this.questionCounter = 0;
        this.subscription?.unsubscribe();
    }

    ngOnDestroy(): void {
        this.store.dispatch(regularUserAvailableQuestions({regularUserAvailableQuestions: true}));
        this.store.dispatch(finishedCategory({finishedCategory: false}));
        this.subscription?.unsubscribe();
    }
}