import { Component, OnInit } from '@angular/core';
import { IQuestion } from '../../interfaces';
import { QuestionsService } from '../../questions/questions.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  questionsByCategory = {};
  categories = [];
  allQuestions: IQuestion[];
  active = 'top';
  constructor(private questionService: QuestionsService) { }

  ngOnInit(): void {
    this.questionService.loadAllQuestions()
    .pipe(map(questions => {
      this.allQuestions = questions;
      questions.map(question => {
        const{category: fullCategoryName} = question;
        let category: string;
        fullCategoryName.includes(': ') ? category = fullCategoryName.split(': ')[1] : category = fullCategoryName;
        this.questionsByCategory[category]
            ? this.questionsByCategory[category].push(question)
            : this.questionsByCategory[category] = [question];
      });

    })
    )
    .subscribe(() => {
      this.categories = Object.keys(this.questionsByCategory);
      this.categories.sort((a: string, b: string) => a.localeCompare(b));
    });
  }

}
