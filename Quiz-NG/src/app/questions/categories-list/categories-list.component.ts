import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../questions/questions.service';
import {UserService} from "../../user/user.service";
import {IUser} from "../../interfaces";

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories = [];
  currentUser = this.userService.currentUser$;
  allUsers:IUser[];
  topFiveUsers:IUser[];
  constructor(private questionService: QuestionsService, private userService:UserService) {

  }

  ngOnInit(): void {
    if(this.currentUser){
      this.questionService.loadCategories().subscribe((categories:string[]) => {
        this.categories = categories;
      });

      this.userService.getAllUsers().subscribe(users => {
        this.allUsers = users;
        this.topFiveUsers = this.allUsers.sort((a,b) => b.correct_answers.length - a.correct_answers.length)
            .slice(0,5);
      })
    }
  }

}