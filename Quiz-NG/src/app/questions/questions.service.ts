import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IQuestion} from '../interfaces';
import {Observable, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';


@Injectable()
export class QuestionsService {
  constructor(private http: HttpClient, private userService: UserService) {
  }
  allQuestions: IQuestion[] | null;
  apiUrl = environment.apiUrl;

  loadAllQuestions(): Observable<IQuestion[]> {
    return this.http.get(`${this.apiUrl}/questions/`, {withCredentials: true})
        .pipe(
            tap((questions: IQuestion[]): void => {
              this.allQuestions = questions;
            }), catchError(() => {
              this.allQuestions = null;
              return of(null);
            })
        );
  }

  loadQuestionsByCategory(category: string): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(`${this.apiUrl}/questions/${category.split('_').join(' ')}`, {withCredentials: true});
  }

}