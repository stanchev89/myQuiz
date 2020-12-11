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
  isLogged = this.userService.isLogged$;
  constructor(private questionService: QuestionsService, private userService:UserService) {

  }

  ngOnInit(): void {
    if(this.isLogged){
      this.questionService.loadCategories().subscribe((categories:string[]) => {
        this.categories = categories;
      });
    }
  }

}