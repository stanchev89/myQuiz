import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../questions/questions.service';
import {UserService} from "../../user/user.service";
import {IUser} from "../../interfaces";
import {Title} from "@angular/platform-browser";
import {Store} from "@ngrx/store";
import {first, map, tap} from 'rxjs/operators'
import {setActiveHeader} from "../../+store/actions";
import {ActivatedRoute} from "@angular/router";
import {AppRootState} from "../../+store";
import {IUserPoints} from "../../user/+store/reducers";
import {Observable} from "rxjs";

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories = this.questionService.categories$;
  currentUser = this.userService.currentUser$;
  usersWithPoints =  this.store.select((state:AppRootState) => state.auth.allUsers);
  myRank: Observable<any>;
  myPoints: Observable<any>;

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
    this.currentUser.subscribe((user:IUser) => {
      if(user) {
          this.myRank = this.usersWithPoints.pipe(map((users:IUserPoints[]) => users.findIndex((curUser:IUserPoints) => curUser.username === user.username) + 1));
          this.myPoints = this.usersWithPoints.pipe(
              map((users:IUserPoints[]) => users.find((u:IUserPoints) => u.username === user.username)?.points)
          );
      }
    })

  }

}