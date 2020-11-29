import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IQuestion} from '../interfaces';
import {Observable,of} from 'rxjs';
import { catchError,tap } from 'rxjs/operators';


@Injectable()
export class QuestionsService {
  constructor(private http: HttpClient) { }
  allQuestions: IQuestion[] | null;
  
  loadAllQuestions(): Observable<IQuestion[]> {
    const apiUrl = environment.apiUrl;
    return this.http.get(`${apiUrl}/questions/`, { withCredentials: true })
    .pipe(
      tap((questions:IQuestion[]):void => {
        this.allQuestions = questions;
      }),catchError(()=> {
        this.allQuestions = null ;
        return of (null);
      })
    )
  }

}
