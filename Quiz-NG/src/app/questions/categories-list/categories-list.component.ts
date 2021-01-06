import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../questions/questions.service';
import {UserService} from "../../user/user.service";
import {IUser} from "../../interfaces";
import {NavigationComponent} from "../../core/navigation/navigation.component";
import {Title} from "@angular/platform-browser";
import {Store} from "@ngrx/store";
import {IQuestionState} from "../+store/reducers";
import {AppRootState} from "../../+store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories = this.questionService.categories$;
  currentUser = this.userService.currentUser$;
  allUsers:IUser[];
  topFiveUsers:IUser[];
  constructor(private questionService: QuestionsService, private userService:UserService, private navigationComponent: NavigationComponent, private titleService: Title, private store:Store) {
  }
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.questionService.loadAllQuestions().subscribe();
    this.setTitle('myQuiz-Categories');
    this.navigationComponent.active$.next('categories');
    if(this.currentUser){
      this.userService.getAllUsers().subscribe(users => {
        this.allUsers = users;
        this.topFiveUsers = this.allUsers.sort((a,b) => b.correct_answers.length - a.correct_answers.length)
            .slice(0,5);
      })
    }
  }

}