import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../questions/questions.service';
import {UserService} from "../../user/user.service";
import {IUser} from "../../interfaces";
import {Title} from "@angular/platform-browser";
import {Store} from "@ngrx/store";
import {first,tap} from 'rxjs/operators'
import {setActiveHeader} from "../../+store/actions";
import {ActivatedRoute} from "@angular/router";
import {AppRootState} from "../../+store";

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories = this.questionService.categories$;
  currentUser = this.userService.currentUser$;
  usersWithPoints =  this.store.select((state:AppRootState) => state.auth.allUsers);

  constructor(private questionService: QuestionsService, private userService:UserService, private titleService: Title, private store:Store,public route: ActivatedRoute) {
  }
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.setTitle('myQuiz-Categories');
    this.store.dispatch(setActiveHeader({activeHeader: 'categories'}));
    this.usersWithPoints.pipe(
        tap(users => {
          if(users.length === 0) {
            this.userService.getAllUsers().pipe(first()).subscribe();
          }
        })
    ).subscribe();
    // if(this.currentUser){
    //   this.userService.getAllUsers().subscribe(users => {
    //     this.allUsers = users;
    //     this.topFiveUsers = this.allUsers.sort((a,b) => b.correct_answers.length - a.correct_answers.length)
    //         .slice(0,5);
    //   })
    // }
  }

}