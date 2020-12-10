import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../questions/questions.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories = [];
  constructor(private questionService: QuestionsService) { }

  ngOnInit(): void {
    this.questionService.loadCategories().subscribe((categories:string[]) => {
      this.categories = categories;
    });
  }

}