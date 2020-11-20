import { Component, OnInit } from '@angular/core';
import {IQuestion} from '../interfaces'
import { QuestionsService } from '../questions.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  setOfCategories = new Set<string>();
  categories;
  allQuestions:IQuestion[];
  constructor(private questionService:QuestionsService) { }

  ngOnInit(): void {
    this.questionService.loadAllQuestions()
    .pipe(map(questions=> {
      this.allQuestions = questions;
      questions.map(question => {
        const categoryName = question.category.includes(': ') ? question.category.split(': ')[1] : question.category;
        this.setOfCategories.add(categoryName);
      })
    })
    )
    .subscribe(() => {
      this.categories = [...this.setOfCategories];      
      this.categories.sort((a: string,b: string) => a.localeCompare(b));
    })
  }

}
