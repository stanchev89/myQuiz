import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs'
import {IQuestion} from "../../interfaces";
import {QuestionsService} from "../../questions/questions.service";


@Injectable()
export class QuestionsResolver implements Resolve<Observable<IQuestion[]>> {
    constructor(private questionsService: QuestionsService, private route:ActivatedRoute) {
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IQuestion[]>{
        const category = route.paramMap.get('category')
        return this.questionsService.loadAllQuestions();
    }
}