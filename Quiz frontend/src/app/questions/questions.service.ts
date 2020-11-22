import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IQuestion} from '../interfaces';
import {Observable} from 'rxjs';


@Injectable()
export class QuestionsService {
  constructor(private http: HttpClient) { }
  
  loadAllQuestions(): Observable<IQuestion[]> {
    const apiUrl = environment.apiUrl;
    return this.http.get<IQuestion[]>(`${apiUrl}/questions/`);
  }

}
