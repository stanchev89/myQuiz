import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IQuestion, IUser} from '../interfaces';
import {Observable, of} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import { UserService } from '../user/user.service';


@Injectable()
export class QuestionsService {
  constructor(private http: HttpClient, private userService: UserService) {
  }
  allQuestions: IQuestion[] | null;
  apiUrl = environment.apiUrl;

  loadAllQuestions(): Observable<IQuestion[]> {
    return this.http.get(`${this.apiUrl}/questions/`)
        .pipe(
            tap((questions: IQuestion[]): void => {
              this.allQuestions = questions;
            }), catchError(() => {
              this.allQuestions = null;
              return of(null);
            })
        );
  }

  loadCategories(): Observable<any> {
      return  this.http.get<IQuestion[]>(`${this.apiUrl}/questions/`).pipe(
          map((questions:IQuestion[])=> {
             const categories =  questions.reduce((acc:{},curr:IQuestion) => {
                 const rawCategoryName = curr.category;
                 const category = rawCategoryName.includes(':')
                     ? rawCategoryName.split(': ')[1]
                     : rawCategoryName;
                 acc[category] = category;
                 return acc
             },{})
              return Object.keys(categories).sort((a: string,b: string) => a.localeCompare(b));
          })
        )
  }

  loadQuestionsByCategory(category: string): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(`${this.apiUrl}/questions/${category.split('_').join(' ')}`);
  }

}