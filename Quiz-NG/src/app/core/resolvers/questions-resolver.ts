import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import {Observable,of} from 'rxjs'
import {QuestionsService} from "../../questions/questions.service";
import {Store} from "@ngrx/store";


@Injectable()
export class QuestionsResolver implements Resolve<Observable<any>> {
    storeQuestions: Observable<any>;

    constructor(private questionsService: QuestionsService, private route:ActivatedRoute,private store: Store) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
        if(!this.questionsService.isLoaded){
            return this.questionsService.loadAllQuestions();
        }
    }
}