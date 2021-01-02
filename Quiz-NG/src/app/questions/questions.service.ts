import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IQuestion} from '../interfaces';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserService} from '../user/user.service';


@Injectable()
export class QuestionsService {
    constructor(private http: HttpClient, private userService: UserService) {
    }

    loadCategories(): Observable<any> {
        return this.http.get<IQuestion[]>('/questions/').pipe(
            map((questions: IQuestion[]) => {
                const categories = questions.reduce((acc: {}, curr: IQuestion) => {
                    const rawCategoryName = curr.category;
                    const category = rawCategoryName.includes(':')
                        ? rawCategoryName.split(': ')[1]
                        : rawCategoryName;
                    acc[category] = category;
                    return acc
                }, {})
                return Object.keys(categories).sort((a: string, b: string) => a.localeCompare(b));
            })
        )
    }

    loadQuestionsByCategory(category: string): Observable<IQuestion[]> {
        return this.http.get<IQuestion[]>(`/questions/${category.split('_').join(' ')}`);
    }

    addNewQuestion(newQuestion): Observable<any> {
        return this.http.post<IQuestion>('/questions/add-new-question', newQuestion);
    }

}