import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IQuestion} from '../interfaces';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {UserService} from '../user/user.service';
import {Store} from "@ngrx/store";
import {loadAllQuestions, setCategories} from "./+store/actions";
import {AppRootState} from "../+store";


@Injectable()
export class QuestionsService {
    categories$ = this.store.select((state:AppRootState) => state.questions.categories);
    allQuestions$ = this.store.select((state:AppRootState) => state.questions.allQuestions);
    constructor(private http: HttpClient, private userService: UserService, private store: Store) {
    }

    loadAllQuestions(): Observable<any> {
        return this.http.get<IQuestion[]>('/questions/').pipe(
            tap((questions: IQuestion[]) => {
                const questionsByCategory = questions.reduce((acc: {}, curr: IQuestion) => {
                    const category = curr.category.includes(':')
                        ? curr.category.split(': ')[1]
                        : curr.category;
                    if(!acc.hasOwnProperty(category)) {
                        acc[category] = [curr];
                        return acc;
                    }
                    acc[category].push(curr);
                    return acc
                }, {})
                const sortedCategories = Object.keys(questionsByCategory).sort((a: string, b: string) => a.localeCompare(b));
                this.store.dispatch(loadAllQuestions({allQuestions: questionsByCategory}));
                this.store.dispatch(setCategories({categories: sortedCategories.map(cat => cat.split('_').join(' '))}));
            })
        )
    }


    addNewQuestion(newQuestion): Observable<any> {
        return this.http.post<IQuestion>('/questions/add-new-question', newQuestion);
    }

}