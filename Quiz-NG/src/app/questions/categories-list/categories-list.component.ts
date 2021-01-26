import {Component, OnDestroy, OnInit} from '@angular/core';
import { QuestionsService } from '../../questions/questions.service';
import {UserService} from "../../user/user.service";
import {IUser} from "../../interfaces";
import {Title} from "@angular/platform-browser";
import {Store} from "@ngrx/store";
import {first, map, tap} from 'rxjs/operators'
import {setActiveHeader} from "../../+store/actions";
import {AppRootState} from "../../+store";
import {IUserPoints} from "../../user/+store/reducers";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories = this.questionService.categories$;
  currentUser = this.userService.currentUser$;
  usersWithPoints =  this.store.select((state:AppRootState) => state.auth.allUsers).pipe(
      tap(users => {
          if(users.length === 0) {
              this.userService.getAllUsers().pipe(first()).subscribe();
          }
      })
  );
  myRank: Observable<any>;
  myPoints: Observable<any>;

  constructor(private questionService: QuestionsService, private userService:UserService, private titleService: Title, private store:Store,private router:Router) {
  }
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
      this.currentUser.subscribe(user => {
          if(user) {
              this.setTitle('myQuiz-Categories');
              this.usersWithPoints.subscribe();
              this.myRank = this.usersWithPoints.pipe(map((users:IUserPoints[]) => users.findIndex((curUser:IUserPoints) => curUser.username === user.username) + 1));
              this.myPoints = this.usersWithPoints.pipe(
                  map((users:IUserPoints[]) => users.find((u:IUserPoints) => u.username === user.username)?.points)
              );
          }
      })
  }

  onClick(event) {
      const selectedCategoryRaw = event.target.innerText;
      const selectedCategory = selectedCategoryRaw.split(' ').join('_');
      this.router.navigate(['categories',selectedCategory]);
  }


}